const router = require("express").Router();

const { checkToken } = require("../auth/jwt_validation");
const {
	createUser,
	login,
	getUserByUserId,
	getUsers,
	updateUsers,
	deleteUser
} = require("../controllers/users");
const { userSignupValidator, userSigninValidator } = require("../validator");
router.get("/users", getUsers);
router.post("/signup", userSignupValidator, createUser);
router.get("/user:id", checkToken, getUserByUserId);
router.post("/signin", userSigninValidator, login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);

module.exports = router;
