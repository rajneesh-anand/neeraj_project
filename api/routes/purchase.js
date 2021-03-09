const router = require("express").Router();

const {
  insertPurchase,
  fetchPurchaseList,
  fetchPurchaseById,
  updatePurchase,
} = require("../controllers/purchase");

router.post("/purchase", insertPurchase);
router.get("/purchaselist", fetchPurchaseList);
router.get("/purchase/:id", fetchPurchaseById);
router.put("/purchase", updatePurchase);

module.exports = router;
