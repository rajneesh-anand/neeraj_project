const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
  createSupplier,
  getSupplierById,
  updateSupplier,
  getSupplierslist,
} = require("../controllers/suppliers");
router.get("/suppliers", getSupplierslist);
router.post("/supplier", createSupplier);
router.get("/supplier/:id", getSupplierById);
router.put("/supplier", updateSupplier);

module.exports = router;
