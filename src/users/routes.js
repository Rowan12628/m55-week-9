const { Router } = require("express");
const userRouter = Router();

const { addUser } = require("./controllers");

userRouter.get("/test", async (req, res) => {
  res.status(200).json({ message: "test okey dokey!" });
});

userRouter.post("/addUser", addUser);

module.exports = userRouter;
