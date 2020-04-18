let ledResults = null;

const printLedgerAPICall = (id) => {
	return axios
		.get(`http://localhost:3000/api/ledgerpdf/${id}`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
		.then((response) => {
			ledResults = response.data.data;
			return response.data.message;
		})
		.catch((error) => {
			alert(error.response.data.message);
		});
};

function printLedger(accountId) {
	printLedgerAPICall(accountId).then(async (message) => {
		if (message === "success") {
			let templateHtml = fs.readFileSync(
				path.join(app.getAppPath(), "../build/ledgertemplate.html"),
				"utf8"
			);

			// let templateHtml = fs.readFileSync(
			// 	path.join(__dirname, "../build/ledgertemplate.html"),
			// 	"utf8"
			// );

			let template = handlebars.compile(templateHtml);
			let html = template(ledResults);

			const pdfPath = `C://pdfreports//Ledger.pdf`;

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

			alert("LEDGER GENERATED");
		}
	});
}
