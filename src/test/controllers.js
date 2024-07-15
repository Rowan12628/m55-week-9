const postTest = async (req, res) => {
  try {
    await res.status(201).json({ message: "success", body: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  postTest: postTest,
};
