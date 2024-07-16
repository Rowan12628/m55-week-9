const { Router } = require("express");
const userRouter = Router();

const { signUp, login, getAllUsers } = require("./controllers");

userRouter.get("/test", async (req, res) => {
  res.status(200).json({ message: "test okey dokey!" });
});

userRouter.post("/signUp", signUp);

userRouter.post("/login", login);

userRouter.get("/getAllUsers", getAllUsers);

module.exports = userRouter;
