const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const pool = require("../config/database");

handlebars.registerHelper("ifEqual", function (a, b, options) {
	if (a === b) {
		return options.fn(this);
	}
	return options.inverse(this);
});

function getdata(id, callback) {
	pool.query(
		`SELECT c.first_name,c.address_line_one,c.city,c.gstin,c.pincode,s.State_Name from customers c, states s where c.id = ? and c.state =s.id; SELECT EntryDate as EntryDate, EntryType, Comments,Invoice_Number, Debit_Amount as Debit, NULL as Credit FROM payments where Debit_Account =?
        UNION ALL 
        SELECT EntryDate as EntryDate,EntryType,Comments,Invoice_Number,  NULL as Debit,Credit_Amount as Credit FROM recieve where Credit_Account =?
        ORDER BY EntryDate`,
		[id, id, id],
		(error, results) => {
			if (error) {
				return { message: `Error : ${error}` };
			} else {
				return callback(results);
			}
		}
	);
}

exports.generateLedgerPdf = (req, res) => {
	const accountId = req.params.id;

	getdata(accountId, async (data) => {
		console.log(data);

		var templateHtml = fs.readFileSync(
			path.join(__dirname, "../public/ledgertemplate.handlebars"),
			"utf8"
		);
		var template = handlebars.compile(templateHtml);
		var html = template(data);

		var pdfPath = path.join("pdfalpha", `Ledger${accountId}.pdf`);

		var options = {
			printBackground: true,
			path: pdfPath,
			format: "A4",
		};

		const browser = await puppeteer.launch({
			headless: true,
		});

		var page = await browser.newPage();
		await page.setContent(html);

		await page.pdf(options);
		await browser.close();

		res.json({ message: "LEDGER GENERATED " });
	});
};
