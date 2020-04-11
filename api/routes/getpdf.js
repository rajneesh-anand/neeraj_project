const router = require("express").Router();

const { generatePdf } = require("../controllers/getpdf");
router.get("/generatepdf", generatePdf);

module.exports = router;
