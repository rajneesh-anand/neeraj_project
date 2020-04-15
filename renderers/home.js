const electron = require("electron");
const { ipcRenderer, remote } = electron;
const path = require("path");
const BrowserWindow = remote.BrowserWindow;
const axios = require("axios");

let addWindow;
let data = [];
let cusdata = [];
let leddata = [];
const texts = remote.getGlobal("sharedObject").someProperty;

// document.getElementById("abc").value = texts;

function createaddWindow() {
	const modalPath = path.join("file://", __dirname, "user.html");

	addWindow = new BrowserWindow({
		resizable: false,
		height: 600,
		width: 800,
		frame: false,
		title: "Add User",
		parent: electron.remote.getCurrentWindow(),
		modal: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	addWindow.webContents.openDevTools();

	addWindow.loadURL(modalPath);
	addWindow.show();

	addWindow.on("close", () => {
		addWindow = null;
	});
}

function getInvoiceListAPICall(callback) {
	axios
		.get(`http://localhost:3000/api/getinvoices`)
		.then((response) => {
			const invData = response.data.data;
			data = [...invData];
			return callback(response.data.message);
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
}

function getCustomerListAPICall(callback) {
	axios
		.get(`http://localhost:3000/api/customers`)
		.then((response) => {
			const custData = response.data.data;
			cusdata = [...custData];
			return callback(response.data.message);
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
}

function getLedgerListAPICall(callback) {
	axios
		.get(`http://localhost:3000/api/ledgerlist`)
		.then((response) => {
			const ledgerData = response.data.data;
			leddata = [...ledgerData];
			return callback(response.data.message);
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
}

$(document).ready(function () {
	getInvoiceListAPICall((response) => {
		console.log(response);
		if (response === "success") {
			generateInvoiceDataTable();
		}
	});
});

const button = document.getElementById("newUser");
button.addEventListener("click", (event) => {
	createaddWindow();
});

const custButton = document.getElementById("newCustomer");
custButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:customerwindow", "customer");
});

const invButton = document.getElementById("newInvoice");
invButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:invoiceWindow", "invoice");
});

const payButton = document.getElementById("payment");
payButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:paymentWindow", "payment_account");
});

const accButton = document.getElementById("account");
accButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:accountWindow", "account");
});

const recButton = document.getElementById("receipt");
recButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:receiptWindow", "receive_account");
});

const ledgerButton = document.getElementById("ledger");
ledgerButton.addEventListener("click", (event) => {
	$("#invTable_wrapper").remove();
	$("#cusTable_wrapper").remove();

	getLedgerListAPICall((response) => {
		console.log(response);
		if (response === "success") {
			generateLedgerDataTable();
		}
	});
});

const cusListButton = document.getElementById("cusList");
cusListButton.addEventListener("click", (event) => {
	$("#invTable_wrapper").remove();

	getCustomerListAPICall((response) => {
		console.log(response);
		if (response === "success") {
			generateCustomerDataTable();
		}
	});
});

const invListButton = document.getElementById("invList");
invListButton.addEventListener("click", (event) => {
	generateInvoiceDataTable();
});

function printInvoicePdf(id) {
	axios
		.get(`http://localhost:3000/api/generatepdf`, {
			params: {
				Invoice_id: id,
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
		.then((response) => {
			alert(response.data.message);
		})
		.catch((error) => {
			alert(error.response.data.message);
		});
}

function printLedger(accountId) {
	console.log(accountId);
	axios
		.get(`http://localhost:3000/api/ledgerpdf/${accountId}`)
		.then((response) => {
			alert(response.data.message);
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
}

// Invoice DataTable

function generateInvoiceDataTable() {
	let rowIndex;
	let invoiceId;
	let htmlTemplate = `<table id="invTable" class=" display table table-striped table-bordered dt-responsive nowrap" style="width:100%">
	<thead>
		<tr>
		<th>ID</th>
			<th>INVOICE NO.</th>
			<th>INVOICE DATE</th>
			<th>AGENT NAME</th>
			<th>BILL AMOUNT</th>	   
		</tr>
	</thead> 
	</table>
`;
	document.getElementById("createTable").innerHTML = htmlTemplate;

	$("#invTable").dataTable({
		paging: true,
		sort: true,
		searching: true,
		responsive: true,
		language: {
			searchPlaceholder: "Search records",
			sSearch: "",
		},
		pageLength: 100,
		data: data,
		columnDefs: [
			{
				render: function (data, type, row) {
					return new Date(data).toLocaleDateString();
				},
				targets: 2,
			},
		],
		columns: [
			{ data: "Invoice_Id" },
			{ data: "Invoice_Number" },
			{ data: "Invoice_Date" },
			{ data: "Agent_Name" },
			{ data: "Total_Payable_Amt" },
		],
		dom: "Bfrtip",
		select: true,

		buttons: [
			{
				text: "Edit Selected Invoice",
				action: function (e, dt, node, config) {
					ipcRenderer.send("invoice:edit", {
						invoiceId: invoiceId,
					});
				},

				enabled: false,
			},
			{
				text: "Print Selected Invoice",
				action: function (e, dt, node, config) {
					printInvoicePdf(invoiceId);
				},

				enabled: false,
			},
		],
	});

	//------------- Table row selection condition ------

	$("#invTable tbody").on("click", "tr", function () {
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$("#invTable").dataTable().$("tr.selected").removeClass("selected");
			$(this).addClass("selected");
		}
	});

	$("#invTable tbody").on("click", "tr", function () {
		rowIndex = $("#invTable").DataTable().row(this).index();

		invoiceId = $("#invTable").DataTable().cell(".selected", 0).data();
		var selectedRows = $("tr.selected").length;
		$("#invTable")
			.DataTable()
			.button(0)
			.enable(selectedRows === 1);
		$("#invTable")
			.DataTable()
			.button(1)
			.enable(selectedRows === 1);
	});
}

// Ledger Datatable

function generateLedgerDataTable() {
	let rowIndex;
	let invoiceId;
	let htmlTemplate = `<table id="ledTable" class=" display table table-striped table-bordered dt-responsive nowrap" style="width:100%">
	<thead>
		<tr>
		<th>ID</th>
			<th>AGENT NAME</th>
			<th>CITY</th>
			<th>CREDIT AMT..</th>
			<th>DEBIT AMT ..</th>
		 
		</tr>
	</thead> 
	</table>
`;
	document.getElementById("createTable").innerHTML = htmlTemplate;

	$("#ledTable").dataTable({
		paging: true,
		sort: true,
		searching: true,
		responsive: true,
		language: {
			searchPlaceholder: "Search records",
			sSearch: "",
		},
		pageLength: 100,
		data: leddata,
		columns: [
			{ data: "Credit_Account" },
			{ data: "custName" },
			{ data: "city" },
			{ data: "Credit" },
			{ data: "Debit" },
		],
		dom: "Bfrtip",
		select: true,

		buttons: [
			{
				text: "Print Selected Ledger",
				action: function (e, dt, node, config) {
					printLedger(invoiceId);
				},

				enabled: false,
			},
		],
	});

	//------------- Table row selection condition ------

	$("#ledTable tbody").on("click", "tr", function () {
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$("#ledTable").dataTable().$("tr.selected").removeClass("selected");
			$(this).addClass("selected");
		}
	});

	$("#ledTable tbody").on("click", "tr", function () {
		rowIndex = $("#ledTable").DataTable().row(this).index();

		invoiceId = $("#ledTable").DataTable().cell(".selected", 0).data();
		var selectedRows = $("tr.selected").length;
		$("#ledTable")
			.DataTable()
			.button(0)
			.enable(selectedRows === 1);
	});
}

//Customer DataTable

function generateCustomerDataTable() {
	let rowIndex;
	const htmlTemplate = `<table id="cusTable" class=" display table table-striped table-bordered dt-responsive nowrap" style="width:100%">
			<thead>
				<tr>
					<th>ID</th>
					<th>AGENT NAME</th>
					<th>CITY</th>
					<th>STATE</th>
					<th>GSTIN</th>	   
				</tr>
			</thead> 
		</table>
	`;

	document.getElementById("createTable").innerHTML = htmlTemplate;

	$("#cusTable").dataTable({
		paging: true,
		sort: true,
		searching: true,
		language: {
			searchPlaceholder: "Search records",
			sSearch: "",
		},
		pageLength: 100,
		data: cusdata,

		columns: [
			{ data: "id" },
			{ data: "first_name" },
			{ data: "city" },
			{ data: "State_Name" },
			{ data: "gstin" },
		],
		dom: "Bfrtip",
		select: true,

		buttons: [
			{
				text: "Edit Selected Customer",
				action: function (e, dt, node, config) {
					ipcRenderer.send("customer:edit", {
						customerData: cusdata[rowIndex],
					});
				},

				enabled: false,
			},
		],
	});

	//------------- Table row selection condition ------

	$("#cusTable tbody").on("click", "tr", function () {
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
		} else {
			$("#cusTable").dataTable().$("tr.selected").removeClass("selected");
			$(this).addClass("selected");
		}
	});

	$("#cusTable tbody").on("click", "tr", function () {
		rowIndex = $("#cusTable").DataTable().row(this).index();
		console.log(rowIndex);
		var selectedRows = $("tr.selected").length;
		$("#cusTable")
			.DataTable()
			.button(0)
			.enable(selectedRows === 1);
	});
}

//---------------------------------
// ipcRenderer.on("customerData", (event, args) => {
// 	console.log(args);
// 	cusdata = [...args];
// 	generateCustomerDataTable();
// });
//addWindow.webContents.openDevTools();

//const server = require("../../backend/app");
// const authService = remote.require("./services/auth-service");
// const authProcess = remote.require("./main/auth-process");

// axios.get(`http://localhost:3000/api/users`).then(response => {
// 	console.log(response.data.data);
// });

// const userData = async () => {
// 	return await axios
// 		.get(`http://localhost:3000/api/users`)
// 		.then(Response => {
// 			console.log(Response.data.data);
// 			return Response.data.data;
// 		})
// 		.catch(error => {
// 			if (error) throw new Error(error);
// 		});
// };

// userData().then(data => {
// 	const list = document.querySelector(".my-list");

// 	data.map((element, index) => {
// 		let li = document.createElement("li");
// 		list.appendChild(li);
// 		li.innerHTML += element;
// 	});
// });
// console.log(users);

// ipcRenderer.on("fetchUsers", (event, data) => {
// 	document.getElementById("search").addEventListener("click", event => {
// 		$("#table").empty();

// 		var codeBlock = `<table id="example" class="display responsive-table datatable-example">
//         <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Position</th>
//                 <th>Office</th>
//                 <th>Extn.</th>
//                 <th>Start date</th>
//                 <th>Salary</th>
//             </tr>
//         </thead>

// 	</table>`;

// 		document.getElementById("table").innerHTML = codeBlock;

// 		data.map((element, index) => {
// 			tbody = document.createElement("tbody");
// 			document.getElementById("example").appendChild(tbody);
// 			tr = document.createElement("tr");
// 			tbody.appendChild(tr);
// 			var td = document.createElement("td");
// 			var td1 = document.createElement("td");
// 			var td2 = document.createElement("td");

// 			td.appendChild(document.createTextNode(element.first_name));
// 			td1.appendChild(document.createTextNode(element.last_name));
// 			td2.appendChild(document.createTextNode(element.email));
// 			tr.appendChild(td);
// 			tr.appendChild(td1);
// 			tr.appendChild(td2);
// 		});

// 		$("#example").DataTable({
// 			language: {
// 				searchPlaceholder: "Search records",
// 				sSearch: "",
// 				sLengthMenu: "Show _MENU_",
// 				sLength: "dataTables_length",
// 				oPaginate: {
// 					sFirst: '<i class="material-icons">chevron_left</i>',
// 					sPrevious: '<i class="material-icons">chevron_left</i>',
// 					sNext: '<i class="material-icons">chevron_right</i>',
// 					sLast: '<i class="material-icons">chevron_right</i>'
// 				}
// 			}
// 		});
// 		$(".dataTables_length select").addClass("browser-default");
// 	});
// });

// document.getElementById("newWin").addEventListener("click", () => {
// 	ipcRenderer.send("create:window", "newWindow");
// });

// data.map((element, index) => {
// 	tbody = document.createElement("tbody");
// 	document.getElementById("example").appendChild(tbody);
// 	tr = document.createElement("tr");
// 	tbody.appendChild(tr);
// 	var td = document.createElement("td");
// 	var td1 = document.createElement("td");
// 	var td2 = document.createElement("td");
// 	var td3 = document.createElement("td");
// 	var td4 = document.createElement("td");
// 	var td5 = document.createElement("td");

// 	td.appendChild(document.createTextNode(element.first_name));
// 	td1.appendChild(document.createTextNode(element.last_name));
// 	td2.appendChild(document.createTextNode(element.email));
// 	td3.appendChild(document.createTextNode(element.first_name));
// 	td4.appendChild(document.createTextNode(element.last_name));
// 	td5.appendChild(document.createTextNode(element.email));
// 	tr.appendChild(td);
// 	tr.appendChild(td1);
// 	tr.appendChild(td2);
// 	tr.appendChild(td3);
// 	tr.appendChild(td4);
// 	tr.appendChild(td5);
// });

// $("#example").DataTable({
// 	language: {
// 		searchPlaceholder: "Search records",
// 		sSearch: "",
// 		sLengthMenu: "Show _MENU_",
// 		sLength: "dataTables_length",
// 		oPaginate: {
// 			sFirst: '<i class="material-icons">chevron_left</i>',
// 			sPrevious: '<i class="material-icons">chevron_left</i>',
// 			sNext: '<i class="material-icons">chevron_right</i>',
// 			sLast: '<i class="material-icons">chevron_right</i>'
// 		}
// 	}
// });
// $(".dataTables_length select").addClass("browser-default");

// ipcRenderer.on("flight:data", (event, data) => {
// 	data.map((element, index) => {
// 		console.log(element.offerItems);
// 	});
// 	let output = document.getElementById("flight");
// 	let template = `<div class="col s12 m6">
// 	<div class="card blue-grey darken-1">
// 		<div class="card-content white-text">
// 			<span class="card-title">Today's Weather</span>
// 			<div id="current-time"></div>
// 			<h1 id="live-temp"></h1>
// 			<h1 id="temp-min"></h1>
// 			<h1 id="temp-max"></h1>
// 		</div>
// 		<div class="card-action">
// 			<a href="#">This is a link</a>
// 			<a href="#">This is a link</a>
// 		</div>
// 	</div>
// </div>`;
// 	output.innerHTML = template;
// });

// ipcRenderer.on("sendCustomerData", (event, data) => {
// 	console.log("Hello");
// });
