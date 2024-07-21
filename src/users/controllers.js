const User = require("./model");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: "success", username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {
    const token = await jwt.sign({ id: req.user.id }, process.env.SECRET);

    const user = {
      id: req.user.id,
      username: req.user.username,
      token: token,
    };

    res.status(201).json({ message: "success", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    console.log("getting users");
    const allUsers = await User.findAll();
    res.status(200).json({ message: "success", allUsers: allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { signUp: signUp, login: login, getAllUsers: getAllUsers };
