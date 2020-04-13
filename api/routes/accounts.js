const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
	createAccount,
	fetchAccounts,
	createPayment,
	createReceipt,
	createLedger,
} = require("../controllers/accounts");

const { generateLedgerPdf } = require("../controllers/ledgerpdf");

router.post("/account", createAccount);
router.get("/accounts", fetchAccounts);
router.post("/payment", createPayment);
router.post("/receipt", createReceipt);
router.get("/ledger/:id", createLedger);
router.get("/ledgerpdf/:id", generateLedgerPdf);

module.exports = router;
