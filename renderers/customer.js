const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;

let states = [];

function ValidateNumbers(e) {
	document.oncontextmenu = function () {
		return false;
	};
	var key = document.all ? e.keyCode : e.which;
	if (key == 8) return true;
	patron = /\d/;
	te = String.fromCharCode(key);
	return patron.test(te);
}

function isNumberKey(evt, obj) {
	var charCode = evt.which ? evt.which : event.keyCode;
	var value = obj.value;
	var dotcontains = value.indexOf(".") != -1;
	if (dotcontains) if (charCode == 46) return false;
	if (charCode == 46) return true;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
	return true;
}

$(document).ready(function () {
	$("select").formSelect();

	const btnClose = document.getElementById("btnClose");
	btnClose.addEventListener("click", (event) => {
		const window = remote.getCurrentWindow();
		window.close();
	});
});

const isvalid = () => {
	let firstName = document.getElementById("first_name").value;
	let lastName = document.getElementById("last_name").value;
	let gstin = document.getElementById("gstin").value;
	let city = document.getElementById("city").value;
	let pincode = document.getElementById("pincode").value;

	if (
		firstName === "" ||
		lastName === "" ||
		gstin === "" ||
		city === "" ||
		pincode === ""
	) {
		return false;
	} else {
		return true;
	}
};

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
	event.preventDefault();
	if (isvalid()) {
		var data = new FormData(form);
		ipcRenderer.send("add:customer", {
			first_name: data.get("first_name"),
			last_name: data.get("last_name"),
			address_line_one: data.get("address_line_one"),
			address_line_two: data.get("address_line_two"),
			city: data.get("city"),
			pincode: data.get("pincode"),
			state: data.get("state"),
			phone: data.get("phone"),
			mobile: data.get("mobile"),
			gstin: data.get("gstin"),
			email: data.get("email"),
		});
	}
});

ipcRenderer.on("customer:added", (event, args) => {
	alert(args);
	$(":input").prop("disabled", true);
});

ipcRenderer.on("fetchStates", (event, data) => {
	states = [...data];

	var Options = "";
	data.map(function (element, i) {
		Options =
			Options + `<option value='${element.id}'>${element.State_Name}</option>`;
	});

	$(".stateName").append(Options);
	$(".stateName").formSelect();
});
