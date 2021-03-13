const printPurchaseAPICall = (id) => {
  return axios
    .get(`http://localhost:3000/api/generatepurchasepdf/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

function printPurchasePdf(invoice_id) {
  printPurchaseAPICall(invoice_id).then(async (result) => {
    if (result.message === "success") {
      let invResults = result.data[0];
      let TotalGstRate =
        invResults.Sgst_Rate + invResults.Cgst_Rate + invResults.Igst_Rate;

      const data = {
        Invoice_Number: invResults.Invoice_Number,
        Invoice_Date: invResults.Invoice_Date,
        Commission: invResults.Commission.toFixed(2),
        Particluars:
          invResults.Particulars === "" ? false : invResults.Particulars,
        SGST: invResults.Sgst_Rate === 0 ? false : invResults.Sgst_Rate,
        CGST: invResults.Cgst_Rate === 0 ? false : invResults.Cgst_Rate,
        IGST: invResults.Igst_Rate === 0 ? false : invResults.Igst_Rate,
        TotalGst: TotalGstRate === 0 ? false : TotalGstRate,

        SGSTAmt:
          invResults.Sgst_Amount === 0
            ? false
            : invResults.Sgst_Amount.toFixed(2),
        CGSTAmt:
          invResults.Cgst_Amount === 0
            ? false
            : invResults.Cgst_Amount.toFixed(2),
        IGSTAmt:
          invResults.Igst_Amount === 0
            ? false
            : invResults.Igst_Amount.toFixed(2),
        TotalGSTAmt: invResults.Total_Gst.toFixed(2),
        TotalAmount: invResults.Total_Amount.toFixed(2),
        first_name: invResults.first_name,
        city: invResults.city,
        address_line_one: invResults.address_line_one,
        state: invResults.State_Name,
        pan: invResults.pan,
        gstin: invResults.gstin,
        pincode: invResults.pincode,
      };
      console.log(data);

      let templateHtml = fs.readFileSync(
        path.join(app.getAppPath(), "../build/purchasetemplate.html"),
        "utf8"
      );

      // let templateHtml = fs.readFileSync(
      //   path.join(__dirname, "../build/purchasetemplate.html"),
      //   "utf8"
      // );

      let template = handlebars.compile(templateHtml);
      let html = template(data);
      const pdfPath = `C://PDF_REPORTS//${data.Invoice_Number}.pdf`;

      let options = {
        printBackground: true,
        path: pdfPath,
        format: "A4",
      };

      const browser = await puppeteer.launch({
        headless: true,
        executablePath: path.join(
          app.getAppPath(),
          "../app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-818858/chrome-win/chrome.exe"
        ),
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      let page = await browser.newPage();
      await page.setContent(html);

      await page.pdf(options);
      await browser.close();

      alert("PURCHASE BILL GENERATED SUCCESSFULLY");
    }
  });
}
