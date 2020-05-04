const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
  createInvoice,
  getInvoiceNumber,
  getInvoices,
  updateInvoice,
  getInvoiceByID,
} = require("../controllers/invoices");
// router.get("/invoices", getInvoices);
router.post("/invoice", createInvoice);
router.put("/invoice", updateInvoice);
router.get("/getinvoice", getInvoiceNumber);
// router.get("/getinvoices", getInvoices);
router.get("/invoice/:id", getInvoiceByID);
router.get("/invoicelist", getInvoices);

// router.get("/invoice/:id", getInvoiceById);
// router.put("/invoice", updateInvoice);

module.exports = router;
