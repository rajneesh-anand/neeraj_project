const router = require("express").Router();

const { checkToken } = require("../auth/jwt_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUser,
  updateUsers,
  deleteUser,
} = require("../controllers/users");
const { userSignupValidator, userSigninValidator } = require("../validator");
// const { updateUser } = require("../services/users");
router.get("/users", getUsers);
router.post("/signup", userSignupValidator, createUser);
router.get("/user:id", checkToken, getUserByUserId);
router.post("/signin", userSigninValidator, login);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);
router.put("/user", updateUser);

module.exports = router;
