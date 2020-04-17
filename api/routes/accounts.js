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
} = require("../controllers/accounts");

router.post("/account", createAccount);
router.get("/accounts", fetchAccounts);
router.post("/payment", createPayment);
router.post("/receipt", createReceipt);
router.get("/ledger/:id", createLedger);

router.get("/ledgerlist", getledgerlist);
router.post("/journal", createJournal);

module.exports = router;
