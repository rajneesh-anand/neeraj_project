const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

async function printPDF(data) {
	var templateHtml = fs.readFileSync(
		path.join(__dirname, "/template.html"),
		"utf8"
	);
	var template = handlebars.compile(templateHtml);
	var html = template(data);

	// var milis = new Date();
	// milis = milis.getTime();

	// var pdfPath = path.join("pdf", `${data.name}-${milis}.pdf`);

	var options = {
		width: "1230px",
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "10px",
			bottom: "30px",
		},
		// printBackground: true,
		// path: pdfPath,
		// format: "A4",
	};

	const browser = await puppeteer.launch({
		headless: true,
	});

	var page = await browser.newPage();

	await page.goto(`data:text/html;charset=UTF-8,${html}`, {
		waitUntil: "networkidle0",
	});

	const pdf = await page.pdf(options);
	await browser.close();
	return pdf;
}

exports.generatePdf = (req, res) => {
	const pdfdata = req.body;
	printPDF(pdfdata).then((pdf) => {
		res.set({
			"Content-Type": "application/pdf",
			"Content-Length": pdf.length,
		});
		res.send(pdf);
	});
};
