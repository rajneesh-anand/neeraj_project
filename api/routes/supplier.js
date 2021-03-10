const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
  createSupplier,
  getSupplierById,
  updateSupplier,
  getSupplierslist,
  fetchSuppliers,
} = require("../controllers/suppliers");
router.get("/suppliers", getSupplierslist);
router.post("/supplier", createSupplier);
router.get("/supplier/:id", getSupplierById);
router.put("/supplier", updateSupplier);
router.get("/fetchsuppliers", fetchSuppliers);

module.exports = router;
