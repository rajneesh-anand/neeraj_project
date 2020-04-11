const router = require("express").Router();
const { checkToken } = require("../auth/jwt_validation");
const {
	createCustomer,
	login,
	getCustomerById,
	getCustomers,
	updateCustomer,
	deleteUser,
	getStates,
} = require("../controllers/customers");
router.get("/customers", getCustomers);
router.post("/customer", createCustomer);
router.get("/customer/:id", getCustomerById);
router.post("/login", login);
router.put("/customer", updateCustomer);
router.delete("/", checkToken, deleteUser);
router.get("/states", getStates);

module.exports = router;
// SELECT (credit - debit) as balance
//      FROM (
//     (SELECT SUM(Credit_Amount) as credit,Credit_Account FROM recieve where Credit_Account = 3 GROUP BY Credit_Account) as credit
//        LEFT JOIN
//     (SELECT SUM(Debit_Amount) as debit,Debit_Account FROM payments where Debit_Account=3 GROUP BY Debit_Account) as debit
//      ON debit.Debit_Account = credit.Credit_Account)
