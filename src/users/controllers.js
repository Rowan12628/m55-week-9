const User = require("./model");
const { get } = require("./routes");

const addUser = async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: "success", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json({ message: "success", allUsers: allUsers });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addUser: addUser, getAllUsers: getAllUsers };
