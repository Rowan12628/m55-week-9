const { Router } = require("express");
const testRouter = Router();

const {
  isData,
  isLowerCase,
  isValidEmail,
} = require("../middleware/validation");
const { postTest } = require("./controllers");

testRouter.post("/postTest", isData, isLowerCase, isValidEmail, postTest);

module.exports = testRouter;
