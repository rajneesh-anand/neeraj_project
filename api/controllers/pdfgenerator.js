const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const pool = require("../config/database");

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

function getdata(id, callback) {
	pool.query(
		"SELECT i.Invoice_Number,i.Invoice_Date,i.Departure_Date,i.Currency,i.Cruise_Ship,i.Cruise,i.Booking,i.Cabin,i.Cat_Bkg,i.Pass_Name,i.Base_Amt,i.TDS_Amt,i.ROE,i.PAX,i.Comm_Amt,i.NCF_Amt,i.TAX_Amt,i.HS_Amt,i.Grat_Amt,i.Misc,i.GST_Amt,i.CGST,i.SGST,i.IGST,i.Token_Amt,i.Total_Payable_Amt,i.Total_Payable_Amt_INR,i.GST,c.first_name,c.address_line_one,c.city,c.gstin,c.pincode,s.State_Name from invoices i, customers c, states s where Invoice_Id =? and i.Agent_Name =c.id and c.state =s.id",
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
		let gst_rate = results.CGST + results.IGST + results.SGST;
		let currencyCode = results.Currency;

		switch (currencyCode) {
			case 1:
				currencyCode = "AED";
				break;
			case 2:
				currencyCode = "&#x20AC;";
				break;

			case 3:
				currencyCode = "&#xa3;";
				break;

			case 4:
				currencyCode = "&#x20B9;";
				break;

			case 5:
				currencyCode = "&#x24;";
				break;
		}

		let net_amount =
			results.Base_Amt +
			results.NCF_Amt +
			results.TAX_Amt +
			results.HS_Amt +
			results.Grat_Amt +
			results.Misc +
			results.TDS_Amt -
			results.Comm_Amt;
		let CGST_AMT = ((net_amount * results.CGST) / 100).toFixed(2);
		let SGST_AMT = ((net_amount * results.SGST) / 100).toFixed(2);
		const data = {
			Invoice_Number: results.Invoice_Number,
			Invoice_Date: results.Invoice_Date,
			Departure_Date: results.Departure_Date,
			TotalINR: results.Total_Payable_Amt_INR,
			Pass_Name: results.Pass_Name,
			PAX: results.PAX,
			first_name: results.first_name,
			city: results.city,
			state: results.State_Name,
			gstin: results.gstin,
			Cabin: results.Cabin,
			Cat_Bkg: results.Cat_Bkg,
			Cruise: results.Cruise,
			Cruise_Ship: results.Cruise_Ship,
			address_line_one: results.address_line_one,
			Base_Amt: results.Base_Amt.toFixed(2),
			NCF_Amt: results.NCF_Amt === 0 ? false : results.NCF_Amt.toFixed(2),
			TAX_Amt: results.TAX_Amt == 0 ? false : results.TAX_Amt.toFixed(2),
			HS_Amt: results.HS_Amt === 0 ? false : results.HS_Amt.toFixed(2),
			Grat_Amt: results.Grat_Amt === 0 ? false : results.Grat_Amt.toFixed(2),
			Misc: results.Misc === 0 ? false : results.Misc.toFixed(2),
			Token_Amt: results.Token_Amt === 0 ? false : results.Token_Amt.toFixed(2),
			GST_Amt: results.GST_Amt === 0 ? false : results.GST_Amt.toFixed(2),
			Comm_Amt: results.Comm_Amt === 0 ? false : results.Comm_Amt.toFixed(2),
			GSTRate: gst_rate === 0 ? false : gst_rate,
			CGST: results.CGST === 0 ? false : results.CGST,
			SGST: results.SGST === 0 ? false : results.SGST,
			CGSTAmt: CGST_AMT,
			SGSTAmt: SGST_AMT,
			TDS_Amt: results.TDS_Amt === 0 ? false : results.TDS_Amt.toFixed(2),
			ROE: results.ROE,
			Total: results.Total_Payable_Amt.toFixed(2),
			SubTotal: net_amount.toFixed(2),
			pincode: results.pincode,
			currency: currencyCode,
		};

		var templateHtml = fs.readFileSync(
			path.join(__dirname, "../public/invoicetemplate.handlebars"),
			"utf8"
		);
		var template = handlebars.compile(templateHtml);
		var html = template(data);

		var pdfPath = path.join(
			__dirname,
			`../../pdfreports/${data.Invoice_Number}.pdf`
		);

		var options = {
			// width: "1230px",
			// headerTemplate: "<p></p>",
			// footerTemplate: "<p></p>",
			// displayHeaderFooter: false,
			// margin: {
			// 	top: "10px",
			// 	bottom: "30px",
			// },
			printBackground: true,
			path: pdfPath,
			format: "A4",
		};

		const browser = await puppeteer.launch({
			headless: true,
		});

		var page = await browser.newPage();
		await page.setContent(html);

		// await page.goto(`data:text/html;charset=UTF-8,${html}`, {
		// 	waitUntil: "networkidle0",
		// });

		await page.pdf(options);
		await browser.close();

		res.json({ message: "INVOICE GENERATED " });
	});
};
