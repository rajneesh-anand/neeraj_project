const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain, screen, shell } = electron;
const express = require(__dirname + "/api/app");
const url = require("url");
const axios = require("axios");
const path = require("path");
const EOL = require("os").EOL;
const fs = require("fs");
const { exec } = require("child_process");

let CWD = process.cwd();

let mainWindow = null;

global.sharedObject = {
	someProperty: "",
};

var menu = Menu.buildFromTemplate([
	{
		label: "Menu",
		submenu: [
			{
				label: "Home",
				click() {
					mainWindow.loadURL(
						url.format({
							pathname: path.join(__dirname, "renderers/index.html"),
							protocol: "file:",
							slashes: true,
						})
					);
				},
			},

			{
				label: "Adjust Notification Value",
				click() {
					mainWindow.loadURL("https://electron.atom.io");
				},
			},
			{
				label: "CoinMarketCap",
				click() {
					shell.openExternal("http://coinmarketcap.com");
				},
				accelerator: "CmdOrCtrl+Shift+C",
			},
			{ type: "separator" },
			{
				label: "Exit",
				click() {
					process.kill(process.pid, "SIGTERM");
					app.quit();
				},
			},
		],
	},
	{
		label: "Info",
	},
]);

Menu.setApplicationMenu(menu);

async function getWeatherData() {
	await axios
		.get(
			`http://api.openweathermap.org/data/2.5/weather?q=delhi,IN&APPID=1e2e7f5d7c3e08e9dc1b2504463f9d59`
		)
		.then((response) => {
			console.log(response.data.main);

			global.sharedObject.someProperty = `${response.data.main.temp}`;
		});
}

function createWindow() {
	const display = screen.getPrimaryDisplay();
	const maxiSize = display.workAreaSize;

	mainWindow = new BrowserWindow({
		resizable: false,
		height: maxiSize.height,
		width: maxiSize.width,
		alwaysOnTop: false,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, "renderers/index.html"),
			protocol: "file:",
			slashes: true,
		})
	);
	//	Open DevTools - Remove for PRODUCTION!
	mainWindow.webContents.openDevTools();
	// Listen for window being closed
	mainWindow.on("closed", () => {
		mainWindow = null;
	});
	getWeatherData();
}
// Fetching Users records --
const userData = async () => {
	return await axios
		.get(`http://localhost:3000/api/users`)
		.then((Response) => {
			// console.log(Response.data.data);
			return Response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

userData().then((data) => {
	mainWindow.webContents.on("did-finish-load", (event) => {
		mainWindow.webContents.send("fetchUsers", data);
	});
});

// Fetching Customers records --

const customerData = async () => {
	return await axios
		.get(`http://localhost:3000/api/customers`)
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

customerData().then((data) => {
	mainWindow.webContents.on("did-finish-load", (event) => {
		mainWindow.webContents.send("fetchCustomers", data);
	});
});

//Fetch Accounts Data

const accountData = async () => {
	return await axios
		.get(`http://localhost:3000/api/accounts`)
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

// Fetch States

const statesData = async () => {
	return await axios
		.get(`http://localhost:3000/api/states`)
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

// Fetch Invoice Number

const getInvoiceNumber = async () => {
	return await axios
		.get(`http://localhost:3000/api/getinvoice`)
		.then((Response) => {
			return Response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

// ipcMain.on("add:customer", async function (event, args) {
// 	console.log(args);
// 	await axios
// 		.post(
// 			`http://localhost:3000/api/customer`,
// 			args,

// 			{
// 				headers: {
// 					Accept: "application/json",
// 					"Content-Type": "application/json",
// 				},
// 			}
// 		)
// 		.then((Response) => {
// 			event.reply("customer:added", Response.data.message);
// 		})
// 		.catch((error) => {
// 			event.reply("customer:added", error.response.data.message);
// 		});
// });

ipcMain.on("update:customer", async function (event, args) {
	console.log(args);
	await axios
		.put(
			`http://localhost:3000/api/customer`,
			args,

			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		)
		.then((Response) => {
			event.reply("customer:updated", Response.data.message);
		})
		.catch((error) => {
			event.reply("customer:updated", error.response.data.message);
		});
});

// Customer Edit

const fetchCustomerDataByID = async (id) => {
	return await axios
		.get(`http://localhost:3000/api/customer/${id}`)
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

ipcMain.on("customer:edit", function (event, args) {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const modalPath = path.join(
		`file://${__dirname}/renderers/customer_edit.html`
	);

	let cuseditWindow = new BrowserWindow({
		resizable: false,
		height: 650,
		width: width - 350,
		frame: false,
		title: "Edit Customer",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	cuseditWindow.webContents.openDevTools();

	cuseditWindow.loadURL(modalPath);

	cuseditWindow.webContents.on("did-finish-load", (event) => {
		statesData().then((data) => {
			cuseditWindow.webContents.send("fetchStates", data);
		});

		fetchCustomerDataByID(args.cusID).then((cusData) => {
			cuseditWindow.webContents.send("sendCustomerDataForEdit", cusData);
		});
	});

	cuseditWindow.on("closed", () => {
		cuseditWindow = null;
	});
});

// ipcMain.on("close:window", (event, args) => {
// 	args.close();

// 	args.on("closed", () => {
// 		customerWindow = null;
// 	});
// });

ipcMain.on("create:customerwindow", (event, fileName) => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let win = new BrowserWindow({
		resizable: false,
		height: 650,
		width: width - 350,
		frame: false,
		title: "Add Customer",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.webContents.openDevTools();

	win.loadURL(modalPath);

	win.webContents.on("did-finish-load", (event) => {
		statesData().then((data) => {
			win.webContents.send("fetchStates", data);
		});
	});

	win.on("closed", () => {
		win = null;
	});
});

ipcMain.on("create:invoiceWindow", (event, fileName) => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	console.log(height);
	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let win = new BrowserWindow({
		resizable: false,
		height: 728,
		width: width - 66,
		frame: false,
		title: "Add Invoice",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// win.webContents.openDevTools();

	win.loadURL(modalPath);

	win.webContents.on("did-finish-load", (event) => {
		customerData().then((data) => {
			win.webContents.send("fetchCustomers", data);
		});
		getInvoiceNumber().then((inv) => {
			win.webContents.send("sendInvoiceNumber", inv);
		});
	});

	win.on("closed", () => {
		win = null;
	});
});

//------- Invoice Section ---------
//----------nvoice Edit------------

const fetchInvoiceDataByID = async (id) => {
	return await axios
		.get(`http://localhost:3000/api/invoice/${id}`)
		.then((response) => {
			return response.data.data;
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
};

ipcMain.on("invoice:edit", (event, args) => {
	console.log(args);
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
	const modalPath = path.join(
		`file://${__dirname}/renderers/invoice_edit.html`
	);

	let inveditWin = new BrowserWindow({
		resizable: false,
		height: 728,
		width: width - 66,
		frame: false,
		title: "Edit Invoice",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	inveditWin.webContents.openDevTools();

	inveditWin.loadURL(modalPath);

	inveditWin.webContents.on("did-finish-load", (event) => {
		customerData().then((data) => {
			inveditWin.webContents.send("fetchCustomers", data);
		});

		fetchInvoiceDataByID(args.invoiceId).then((invData) => {
			console.log(invData);
			inveditWin.webContents.send("sendInvoiceDataForEdit", invData);
		});
	});
});

//-----------------------

ipcMain.on("add:invoice", async function (event, args) {
	await axios
		.post(
			`http://localhost:3000/api/invoice`,
			args,

			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		)
		.then((Response) => {
			event.reply("invoice:added", Response.data.message);
		})
		.catch((error) => {
			event.reply("invoice:added", error.response.data.message);
		});
});

// Payment Window

ipcMain.on("create:paymentWindow", (event, fileName) => {
	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let pWin = new BrowserWindow({
		resizable: false,
		height: 500,
		width: 900,
		frame: false,
		title: "Payment",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	pWin.webContents.openDevTools();

	pWin.loadURL(modalPath);

	pWin.webContents.on("did-finish-load", (event) => {
		customerData().then((data) => {
			pWin.webContents.send("fetchCustomers", data);
		});

		accountData().then((args) => {
			console.log(args);
			pWin.webContents.send("fetchAccounts", args);
		});
	});
});

// Journal Window

ipcMain.on("create:journalWindow", (event, fileName) => {
	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let jWin = new BrowserWindow({
		resizable: false,
		height: 500,
		width: 900,
		frame: false,
		title: "Journal",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	jWin.webContents.openDevTools();

	jWin.loadURL(modalPath);

	jWin.webContents.on("did-finish-load", (event) => {
		accountData().then((args) => {
			console.log(args);
			jWin.webContents.send("fetchAccounts", args);
		});
	});

	jWin.on("closed", () => {
		jWin = null;
	});
});

// Receipt Window

ipcMain.on("create:receiptWindow", (event, fileName) => {
	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let rWin = new BrowserWindow({
		resizable: false,
		height: 500,
		width: 900,
		frame: false,
		title: "Payment",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	rWin.webContents.openDevTools();

	rWin.loadURL(modalPath);

	rWin.webContents.on("did-finish-load", (event) => {
		customerData().then((data) => {
			rWin.webContents.send("fetchCustomers", data);
		});

		accountData().then((args) => {
			console.log(args);
			rWin.webContents.send("fetchAccounts", args);
		});
	});
});

//-----------------------

//---Account ---

ipcMain.on("create:accountWindow", (event, fileName) => {
	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let aWin = new BrowserWindow({
		resizable: false,
		height: 450,
		width: 700,
		frame: false,
		title: "Account",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	aWin.webContents.openDevTools();

	aWin.loadURL(modalPath);

	aWin.on("closed", () => {
		aWin = null;
	});
});

// User window

ipcMain.on("create:user", (event, fileName) => {
	const modalPath = path.join(
		`file://${__dirname}/renderers/` + fileName + `.html`
	);

	let aWin = new BrowserWindow({
		resizable: false,
		height: 500,
		width: 700,
		frame: false,
		title: "User",
		parent: mainWindow,
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	aWin.webContents.openDevTools();

	aWin.loadURL(modalPath);

	aWin.on("closed", () => {
		aWin = null;
	});
});

ipcMain.on("fetchCustomers", (event, args) => {
	customerData().then((data) => {
		event.reply("customerData", data);
	});
});

ipcMain.on("data:backup", (event, args) => {
	// var wstream = fs.createWriteStream(path.join(__dirname, "dumpfilename.sql"));
	// var child = spawn("mysqldump", ["-u", "root", "-praj2neo", "shipping"]);
	// child.stdout.pipe(wstream).on("finish", function () {
	// 	console.log("Completed");
	// });
	// .on("error", function (err) {
	// 	console.log(err);
	// });
	// let date = new Date();
	// const child = exec(
	// 	`mysqldump -u root -p[raj2neo] [shipping] > ${date.getDate()}-datadump.sql`
	// );
	// child.stdout.pipe();
	// console.log(child);
	// event.reply("backup:done", "DATA BACKUP DONE ");
});

// Electron `app` is ready
app.on("ready", createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", (event) => {
	process.kill(process.pid, "SIGTERM");
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
	if (mainWindow === null) createWindow();
});

process.on("uncaughtException", (err) => {
	appLog("error", `Uncaught error: ${err.stack}`);
	throw err;
});

// executable there is no console to see logs
function appLog(level, message) {
	const origMsg = message;

	message += EOL;

	if (level === "info") {
		console.log(origMsg);
		fs.appendFileSync(path.join(CWD, "app-info-shipping.log"), message);
	} else if (level === "error") {
		console.error(origMsg);
		fs.appendFileSync(path.join(CWD, "app-error-shipping.log"), message);
	}
}
