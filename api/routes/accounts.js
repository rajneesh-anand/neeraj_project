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
  getReceiveList,
  getReceiveByID,
  updateReceive,
  getCategories,
  getgeneralledgerlist,
  getAccounts,
  getGeneralLedgerByID,
  updateJournal,
  getJournalByID,
} = require("../controllers/accounts");

router.post("/account", createAccount);
router.get("/accounts", fetchAccounts);
router.post("/payment", createPayment);
router.put("/payment", updatePayment);
router.put("/receive", updateReceive);
router.put("/journal", updateJournal);
router.get("/payment/:id", getPaymentByID);
router.get("/receive/:id", getReceiveByID);
router.get("/journal/:id", getJournalByID);
router.post("/receipt", createReceipt);
router.get("/ledger/:id", createLedger);
router.get("/categories", getCategories);

router.get("/ledgerlist", getledgerlist);
router.post("/journal", createJournal);
router.get("/paymentlist", getPaymentList);
router.get("/receivelist", getReceiveList);
router.get("/generalledgerlist", getgeneralledgerlist);
router.get("/fetchaccounts", getAccounts);
router.post("/generalledger/:id", getGeneralLedgerByID);

module.exports = router;
