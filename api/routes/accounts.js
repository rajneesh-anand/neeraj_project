const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
	createAccount,
	fetchAccounts,
	createPayment,
	createReceipt,
	createLedger,
	getledgerlist,
	createJournal,
	getPaymentList,
	getPaymentByID,
	updatePayment,
} = require("../controllers/accounts");

router.post("/account", createAccount);
router.get("/accounts", fetchAccounts);
router.post("/payment", createPayment);
router.put("/payment", updatePayment);
router.get("/payment/:id", getPaymentByID);
router.post("/receipt", createReceipt);
router.get("/ledger/:id", createLedger);

router.get("/ledgerlist", getledgerlist);
router.post("/journal", createJournal);
router.get("/paymentlist", getPaymentList);

module.exports = router;
