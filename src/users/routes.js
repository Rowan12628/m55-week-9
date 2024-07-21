const { Router } = require("express");
const userRouter = Router();

const { signUp, login, getAllUsers } = require("./controllers");

const { hashPass, comparePass, verifyToken } = require("../middleware/auth");
const {
  isData,
  isLowerCase,
  isValidEmail,
} = require("../middleware/validation");

userRouter.get("/test", async (req, res) => {
  res.status(200).json({ message: "test okey dokey!" });
});

userRouter.post("/signUp", isData, isLowerCase, isValidEmail, hashPass, signUp);

userRouter.post("/login", comparePass, login);

userRouter.get("/getAllUsers", verifyToken, getAllUsers);

module.exports = userRouter;
