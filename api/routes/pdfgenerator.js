const router = require("express").Router();

const { generatePdf } = require("../controllers/pdfgenerator");

router.get("/generatepdf/:id", generatePdf);

module.exports = router;
