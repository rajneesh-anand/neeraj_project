const router = require("express").Router();

const { generatePdf } = require("../controllers/pdfgenerator");
router.get("/generatepdf", generatePdf);

module.exports = router;
