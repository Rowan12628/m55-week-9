const User = require("./model");

const addUser = async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: "success", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = { addUser: addUser };
