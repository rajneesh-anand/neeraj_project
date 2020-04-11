const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const pool = require("../config/database");

// const data = {
// 	title: "A new Brazilian School",
// 	date: "05/12/2018",
// 	name: "Rodolfo Luis Marcos",
// 	age: 28,
// 	birthdate: "12/07/1990",
// 	course: "Computer Science",
// 	obs:
// 		"Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
// };
var data = null;
function getdata(id, callback) {
	pool.query(
		"SELECT * from invoices where Invoice_Id =?",
		[id],
		(err, results) => {
			if (err) {
				return err;
			}
			return callback(results[0]);
		}
	);
}

exports.generatePdf = (req, res) => {
	const Invoice_Id = req.query.Invoice_id;

	getdata(Invoice_Id, async (results) => {
		data = results;
		var templateHtml = fs.readFileSync(
			path.join(__dirname, "/template.html"),
			"utf8"
		);
		var template = handlebars.compile(templateHtml);
		var html = template(data);

		var milis = new Date();
		milis = milis.getTime();

		var pdfPath = path.join("pdfalpha", `${data.Invoice_Number}-${milis}.pdf`);

		var options = {
			width: "1230px",
			headerTemplate: "<p></p>",
			footerTemplate: "<p></p>",
			displayHeaderFooter: false,
			margin: {
				top: "10px",
				bottom: "30px",
			},
			printBackground: true,
			path: pdfPath,
			format: "A4",
		};

		const browser = await puppeteer.launch({
			headless: true,
		});

		var page = await browser.newPage();

		await page.goto(`data:text/html;charset=UTF-8,${html}`, {
			waitUntil: "networkidle0",
		});

		await page.pdf(options);
		await browser.close();

		res.json({ message: "INVOICE Downloaded !" });
	});
};

// setTimeout(async () => {
// 	console.log(data);

// 	var templateHtml = fs.readFileSync(
// 		path.join(__dirname, "/template.html"),
// 		"utf8"
// 	);
// 	var template = handlebars.compile(templateHtml);
// 	var html = template(data);

// 	var milis = new Date();
// 	milis = milis.getTime();

// 	var pdfPath = path.join("pdfalpha", `${data.Invoice_Number}-${milis}.pdf`);

// 	var options = {
// 		width: "1230px",
// 		headerTemplate: "<p></p>",
// 		footerTemplate: "<p></p>",
// 		displayHeaderFooter: false,
// 		margin: {
// 			top: "10px",
// 			bottom: "30px",
// 		},
// 		printBackground: true,
// 		path: pdfPath,
// 		format: "A4",
// 	};

// 	const browser = await puppeteer.launch({
// 		headless: true,
// 	});

// 	var page = await browser.newPage();

// 	await page.goto(`data:text/html;charset=UTF-8,${html}`, {
// 		waitUntil: "networkidle0",
// 	});

// 	await page.pdf(options);
// 	await browser.close();

// 	res.json({ message: "INVOICE Downloaded !" });
// }, 6000);
