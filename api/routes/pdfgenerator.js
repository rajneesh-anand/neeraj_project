const router = require("express").Router();

const {
	generatePdf,
	generateLedgerPdf,
} = require("../controllers/pdfgenerator");

router.get("/generatepdf/:id", generatePdf);
router.get("/ledgerpdf/:id", generateLedgerPdf);

module.exports = router;
