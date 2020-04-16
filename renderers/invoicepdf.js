const fs = require("fs");
const puppeteer = require("puppeteer");

let invResults = null;
const printInvoiceAPICall = (id) => {
	return axios
		.get(`http://localhost:3000/api/generatepdf/${id}`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
		.then((response) => {
			invResults = response.data.data[0];
			return response.data.message;
		})
		.catch((error) => {
			alert(error.response.data.message);
		});
};

function printInvoicePdf(invoice_id) {
	printInvoiceAPICall(invoice_id).then(async (message) => {
		if (message === "success") {
			let gst_rate = invResults.CGST + invResults.IGST + invResults.SGST;
			let currencyCode = invResults.Currency;
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
				invResults.Base_Amt +
				invResults.NCF_Amt +
				invResults.TAX_Amt +
				invResults.HS_Amt +
				invResults.Grat_Amt +
				invResults.Misc +
				invResults.TDS_Amt -
				invResults.Comm_Amt;

			let CGST_AMT = ((net_amount * invResults.CGST) / 100).toFixed(2);
			let SGST_AMT = ((net_amount * invResults.SGST) / 100).toFixed(2);

			const data = {
				Invoice_Number: invResults.Invoice_Number,
				Invoice_Date: invResults.Invoice_Date,
				Departure_Date: invResults.Departure_Date,
				TotalINR: invResults.Total_Payable_Amt_INR,
				Pass_Name: invResults.Pass_Name,
				PAX: invResults.PAX,
				first_name: invResults.first_name,
				city: invResults.city,
				state: invResults.State_Name,
				gstin: invResults.gstin,
				Cabin: invResults.Cabin,
				Cat_Bkg: invResults.Cat_Bkg,
				Cruise: invResults.Cruise,
				Cruise_Ship: invResults.Cruise_Ship,
				address_line_one: invResults.address_line_one,
				Base_Amt: invResults.Base_Amt.toFixed(2),
				NCF_Amt:
					invResults.NCF_Amt === 0 ? false : invResults.NCF_Amt.toFixed(2),
				TAX_Amt:
					invResults.TAX_Amt == 0 ? false : invResults.TAX_Amt.toFixed(2),
				HS_Amt: invResults.HS_Amt === 0 ? false : invResults.HS_Amt.toFixed(2),
				Grat_Amt:
					invResults.Grat_Amt === 0 ? false : invResults.Grat_Amt.toFixed(2),
				Misc: invResults.Misc === 0 ? false : invResults.Misc.toFixed(2),
				Token_Amt:
					invResults.Token_Amt === 0 ? false : invResults.Token_Amt.toFixed(2),
				GST_Amt:
					invResults.GST_Amt === 0 ? false : invResults.GST_Amt.toFixed(2),
				Comm_Amt:
					invResults.Comm_Amt === 0 ? false : invResults.Comm_Amt.toFixed(2),
				GSTRate: gst_rate === 0 ? false : gst_rate,
				CGST: invResults.CGST === 0 ? false : invResults.CGST,
				SGST: invResults.SGST === 0 ? false : invResults.SGST,
				CGSTAmt: CGST_AMT,
				SGSTAmt: SGST_AMT,
				TDS_Amt:
					invResults.TDS_Amt === 0 ? false : invResults.TDS_Amt.toFixed(2),
				ROE: invResults.ROE,
				Total: invResults.Total_Payable_Amt.toFixed(2),
				SubTotal: net_amount.toFixed(2),
				pincode: invResults.pincode,
				currency: currencyCode,
			};

			let templateHtml = fs.readFileSync(
				path.join(app.getAppPath(), "../build/invoicetemplate.handlebars"),
				"utf8"
			);

			// let templateHtml = fs.readFileSync(
			// 	path.join(__dirname, "../build/invoicetemplate.handlebars"),
			// 	"utf8"
			// );

			let template = handlebars.compile(templateHtml);
			let html = template(data);

			const pdfPath = `C://pdfreports//${data.Invoice_Number}.pdf`;

			let options = {
				printBackground: true,
				path: pdfPath,
				format: "A4",
			};

			const browser = await puppeteer.launch({
				headless: true,
				executablePath: path.join(
					app.getAppPath(),
					"../app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-722234/chrome-win/chrome.exe"
				),
				args: ["--no-sandbox", "--disable-setuid-sandbox"],
			});

			let page = await browser.newPage();
			await page.setContent(html);

			await page.pdf(options);
			await browser.close();

			alert("INVOICE GENERATED");
		}
	});
}
