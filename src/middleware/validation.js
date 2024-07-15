const isData = async (req, res, next) => {
  console.log("isData middleware hit and username: ", req.body.username);
  try {
    if (!req.body.username) {
      res.status(422).json({ message: "data is incomplete" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

//checks if string is lowercase and makes lower
const isLowerCase = async (req, res, next) => {
  console.log("isLowerCase middleware hit");
  try {
    // if (req.body.username !== req.body.username.toLowerCase()) {
    //   req.body.username = req.body.username.toLowerCase();
    // }

    req.body.username = req.body.username.toLowerCase();

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

//checks if email is valid using regex
const isValidEmail = async (req, res, next) => {
  try {
    const checkEmail = /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/;

    if (checkEmail.test(req.body.email)) {
      res.status(422).json({ message: "success", body: req.body });
    }

    // const checkEmail = new RegExp(
    //   /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/
    // );
    // console.log("regex checkEmail: ", checkEmail);

    // if (!checkEmail.test(req.body.email)) {
    //   res.status(422).json({ message: "email not valid", body: req.body });
    //   return;
    // }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  isData: isData,
  isLowerCase: isLowerCase,
  isValidEmail,
};
