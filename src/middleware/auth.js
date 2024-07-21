const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const jwt = require("jsonwebtoken");

const User = require("../users/model");

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

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }

    const compare = await bcrypt.compare(req.body.password, user.password);

    if (!compare) {
      res.status(404).json({ message: "incorrect password" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization");
    console.log(authToken);

    const verified = jwt.verify(authToken, process.env.SECRET);
    console.log(verified);

    const user = await User.findOne({ where: { id: verified.id } });

    if (!user) {
      res.status(401).json({ message: "user not authorised" });
    }

    req.authCheck = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorised user", error: error });
  }
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
  verifyToken: verifyToken,
};
