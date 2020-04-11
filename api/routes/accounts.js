const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
	createAccount,
	fetchAccounts,
	createPayment,
	createReceipt,
} = require("../controllers/accounts");

router.post("/account", createAccount);
router.get("/accounts", fetchAccounts);
router.post("/payment", createPayment);
router.post("/receipt", createReceipt);

module.exports = router;
