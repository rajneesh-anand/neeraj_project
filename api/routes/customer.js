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
