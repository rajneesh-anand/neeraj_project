const router = require("express").Router();

const {
	generatePdf,
	generateLedgerPdf,
	generateLedgerPdfDateWise,
} = require("../controllers/pdfgenerator");

router.get("/generatepdf/:id", generatePdf);
router.get("/ledgerpdf/:id", generateLedgerPdf);
router.post("/ledgerpdfdatewise/:id", generateLedgerPdfDateWise);

module.exports = router;
