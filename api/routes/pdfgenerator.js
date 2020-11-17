const router = require("express").Router();

const {
  generatePdf,
  generateLedgerPdf,
  generateLedgerPdfDateWise,
  generateAllLedgerPdfDatewise,
} = require("../controllers/pdfgenerator");

router.get("/generatepdf/:id", generatePdf);
router.get("/ledgerpdf/:id", generateLedgerPdf);
router.post("/ledgerpdfdatewise/:id", generateLedgerPdfDateWise);
router.post("/ledgerpdfdatewise", generateAllLedgerPdfDatewise);

module.exports = router;
