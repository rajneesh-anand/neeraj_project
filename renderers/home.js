const electron = require("electron");
const { ipcRenderer, remote } = electron;
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const axios = require("axios");
const app = remote.app;
const handlebars = require("handlebars");

let data = [];
let cusdata = [];
let leddata = [];
let paydata = [];

handlebars.registerHelper("ifEqual", function (a, b, options) {
	if (a === b) {
		return options.fn(this);
	}
	return options.inverse(this);
});

handlebars.registerHelper("formatDate", function (dateString) {
	let event = new Date(`${dateString}`);
	let month = event.getMonth();
	let date = event.getDate();
	let year = event.getFullYear();

	switch (month) {
		case 0:
			month = "Jan";
			break;
		case 1:
			month = "Feb";
			break;
		case 2:
			month = "Mar";
			break;
		case 3:
			month = "Apr";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "Jun";
			break;
		case 6:
			month = "Jul";
			break;

		case 7:
			month = "Aug";
			break;
		case 8:
			month = "Sep";
			break;
		case 9:
			month = "Oct";
			break;
		case 10:
			month = "Nov";
			break;
		case 11:
			month = "Dec";
			break;
	}
	return `${date} ${month} ${year}`;
});

const texts = remote.getGlobal("sharedObject").someProperty;

// document.getElementById("abc").value = texts;

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
			console.log(ledgerData);

			// ledgerData.map((Element, index) => {
			// 	let credit = Element.Credit ? Element.Credit : 0;
			// 	let debit = Element.Debit ? Element.Debit : 0;
			// 	console.log(`Credit - ${credit}  and Debit - ${debit}`);
			// });

			leddata = [...ledgerData];
			return callback(response.data.message);
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
}

function getPaymentListAPICall(callback) {
	axios
		.get(`http://localhost:3000/api/paymentlist`)
		.then((response) => {
			const paymmentData = response.data.data;
			console.log(paymmentData);

			paydata = [...ledgerData];
			return callback(response.data.message);
		})
		.catch((error) => {
			if (error) throw new Error(error);
		});
}

$(document).ready(function () {
	getInvoiceListAPICall((response) => {
		// console.log(response);
		if (response === "success") {
			generateInvoiceDataTable();
		}
	});
});

const button = document.getElementById("newUser");
button.addEventListener("click", (event) => {
	ipcRenderer.send("create:user", "user");
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

const jouButton = document.getElementById("journal");
jouButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:journalWindow", "journal");
});

const accButton = document.getElementById("account");
accButton.addEventListener("click", (event) => {
	ipcRenderer.send("create:accountWindow", "account");
});

const backupButton = document.getElementById("dbbackup");
backupButton.addEventListener("click", (event) => {
	ipcRenderer.send("data:backup", "mysql_db");
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
		if (response === "success") {
			generateLedgerDataTable();
		}
	});
});

const listPaymentButton = document.getElementById("listPayments");
listPaymentButton.addEventListener("click", (event) => {
	$("#invTable_wrapper").remove();
	$("#cusTable_wrapper").remove();
	$("#ledTable_wrapper").remove();

	getPaymentListAPICall((response) => {
		if (response === "success") {
			generatePaymentDataTable();
		}
	});
});

const cusListButton = document.getElementById("cusList");
cusListButton.addEventListener("click", (event) => {
	$("#invTable_wrapper").remove();

	getCustomerListAPICall((response) => {
		if (response === "success") {
			generateCustomerDataTable();
		}
	});
});

const invListButton = document.getElementById("invList");
invListButton.addEventListener("click", (event) => {
	generateInvoiceDataTable();
});

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
					// generateInvoicePDF();
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
			{ data: "Acc" },
			{ data: "first_name" },
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

	//Table row selection condition ------

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
	let cusID;
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
						cusID: cusID,
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

		cusID = $("#cusTable").DataTable().cell(".selected", 0).data();

		var selectedRows = $("tr.selected").length;
		$("#cusTable")
			.DataTable()
			.button(0)
			.enable(selectedRows === 1);
	});
}

ipcRenderer.on("backup:done", (event, args) => {
	alert(args);
});
