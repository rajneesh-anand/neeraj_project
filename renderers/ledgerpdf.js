let ledResults = null;

// Generate Agent Ledger Date Range

const printLedgerAPICallDateWise = (id) => {
  return axios
    .post(
      `http://localhost:3000/api/ledgerpdfdatewise/${id}`,
      {
        from: fromDate,
        to: toDate,
      },

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    )
    .then((response) => {
      results = response.data.data;

      return response.data.message;
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
  //   .then((response) => {
  // 	console.log(response.data);
  // 	results.splice(0, results.length);

  // 	results = [...response.data.data];

  // 	console.log(results);

  // 	return response.data.message;
  //   })
  //   .catch((error) => {
  // 	console.log(error.response.data.message);
  //   });
};

function printAgentLedgerPdf(id) {
  printLedgerAPICallDateWise(id).then(async (message) => {
    if (message === "success") {
      // let templateHtml = fs.readFileSync(
      // 	path.join(app.getAppPath(), "../build/ledgertemplate.html"),
      // 	"utf8"
      // );

      let templateHtml = fs.readFileSync(
        path.join(__dirname, "../build/ledgertemplate.html"),
        "utf8",
      );

      let template = handlebars.compile(templateHtml);
      let html = template(results);
      const pdfPath = `C://pdfreports//Ledger.pdf`;
      let options = {
        printBackground: true,
        path: pdfPath,
        format: "A4",
      };
      const browser = await puppeteer.launch({
        headless: true,
        // executablePath: path.join(
        // 	app.getAppPath(),
        // 	"../app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-722234/chrome-win/chrome.exe"
        // ),
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

// Generate General ledger date range

const printGeneralLedgerAPICall = (id) => {
  return axios
    .post(
      `http://localhost:3000/api/generalledger/${id}`,
      {
        from: fromDate,
        to: toDate,
      },

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    )
    .then((response) => {
      results = response.data.data;

      return response.data.message;
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

function printGeneralLedgerPdf(id) {
  printGeneralLedgerAPICall(id).then(async (message) => {
    if (message === "success") {
      //   let templateHtml = fs.readFileSync(
      //     path.join(app.getAppPath(), "../build/generalledgertemplate.html"),
      //     "utf8",
      //   );

      let templateHtml = fs.readFileSync(
        path.join(__dirname, "../build/generalledgertemplate.html"),
        "utf8",
      );

      let template = handlebars.compile(templateHtml);
      let html = template(results);
      const pdfPath = `C://pdfreports//Ledger.pdf`;
      let options = {
        printBackground: true,
        path: pdfPath,
        format: "A4",
      };
      const browser = await puppeteer.launch({
        headless: true,
        // executablePath: path.join(
        //   app.getAppPath(),
        //   "../app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-722234/chrome-win/chrome.exe",
        // ),
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

// Print General Ledger

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
      console.log(ledResults);
      return response.data.message;
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

function printLedger(accountId) {
  printLedgerAPICall(accountId).then(async (message) => {
    if (message === "success") {
      //   let templateHtml = fs.readFileSync(
      //     path.join(app.getAppPath(), "../build/ledgertemplate.html"),
      //     "utf8",
      //   );

      let templateHtml = fs.readFileSync(
        path.join(__dirname, "../build/ledgertemplate.html"),
        "utf8",
      );

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
        // executablePath: path.join(
        //   app.getAppPath(),
        //   "../app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-722234/chrome-win/chrome.exe",
        // ),
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
