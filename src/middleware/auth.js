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

const comparePass = (req, res, next) => {
  try {
    //bcrypt.compare takes 2 parametres, the pass from the body, and the hashed pass from the db
    //get user from db via username
    //check if user exists
    //compare password (will return true or false)
    //check if return value is true or false
    //if false, response "passwords do not match"
    //attach user to the request
    //next
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
};
