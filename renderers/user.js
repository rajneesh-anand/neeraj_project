const electron = require("electron");
const remote = electron.remote;
const { ipcRenderer } = electron;
const btnClose = document.getElementById("btnClose");

btnClose.addEventListener("click", event => {
	const window = remote.getCurrentWindow();
	window.close();
});

let form = document.querySelector("form");

form.addEventListener("submit", function(event) {
	event.preventDefault();
	var data = new FormData(form);
	data.append("first_name", "first_name");
	data.append("last_name", "last_name");
	data.append("gender", "male");
	data.append("mobile", "8989999");
	data.append("password", "1234@qwerty");
	data.append("email", "qwerty@test.com");

	ipcRenderer.send("add:user", {
		first_name: "first_name",
		last_name: "last_name",
		gender: "male",
		mobile: "8989999",
		password: "1234@qwerty",
		email: "qwerty@test.com"
	});
});

ipcRenderer.on("user:added", (event, args) => {
	alert(args);
});

const pdf = new jsPDF();

// select the button
let button = document.querySelector("#print");
// select the input
let name = document.querySelector("#first_name");
let last = document.querySelector("#last_name");
let email = document.querySelector("#email");

// add 'click' event listener for the button
button.addEventListener("click", printPDF);

// actual PDF options
function printPDF() {
	pdf.setProperties({
		title: "This is my title"
	});
	// @param 1 - Coordinate (in units declared at inception of PDF document) against left edge of the page
	// @param 2 - Coordinate (in units declared at inception of PDF document) against upper edge of the page
	// @param 3 - String or array of strings to be added to the page. Each line is shifted one line down per font, spacing settings declared before this call.

	pdf.text(10, 10, `your First name is  ${name.value}`);
	pdf.text(20, 20, `your Last name is  ${last.value}`);
	// pdf.text(10, 10, `your emil  is  ${email.value}`);
	pdf.setDrawColor(255, 0, 0);
	pdf.line(35, 30, 100, 30);
	// save the PDF document (downloadable)
	pdf.output("save", "filename.pdf");
}
