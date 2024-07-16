const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

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
    //bcrypt.compare takes 2 parametres, the pass from the body, and the hashed pass from the db

    //get user from db via username
    //check if user exists
    //compare password (will return true or false)
    //check if return value is true or false
    //if false, response "passwords do not match"

    const user = await User.findOne({
      where: { username: req.body.username },
    });

    const compare = await bcrypt.compare(req.body.password, user.password);

    //just making sure it works
    if (!compare) {
      console.log("no");
    } else {
      console.log("yes");
    }

    //attach user to the request
    //next
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
};
