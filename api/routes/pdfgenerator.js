const router = require("express").Router();

const {
  generatePdf,
  generateLedgerPdf,
  generateLedgerPdfDateWise,
  generateAllLedgerPdfDatewise,
  generateTdsPdfDateWise,
  generatePurchasePdf,
} = require("../controllers/pdfgenerator");

router.get("/generatepdf/:id", generatePdf);
router.get("/generatepurchasepdf/:id", generatePurchasePdf);
router.get("/ledgerpdf/:id", generateLedgerPdf);
router.post("/ledgerpdfdatewise/:id", generateLedgerPdfDateWise);
router.post("/tdspdfdatewise/:id", generateTdsPdfDateWise);
router.post("/ledgerpdfdatewise", generateAllLedgerPdfDatewise);

module.exports = router;
