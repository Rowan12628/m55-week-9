const { Router } = require("express");
const userRouter = Router();

const { addUser, getAllUsers } = require("./controllers");

userRouter.get("/test", async (req, res) => {
  res.status(200).json({ message: "test okey dokey!" });
});

userRouter.post("/addUser", addUser);

userRouter.get("/getAllUsers", getAllUsers);

module.exports = userRouter;
