const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    console.log("pass before hash: ", req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log("hashed pass: ", hashedPassword);

    req.body.password = hashedPassword;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  hashPass: hashPass,
};
