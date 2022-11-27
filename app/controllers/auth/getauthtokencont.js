const jwt = require("jsonwebtoken");

const authtokencontroller = async (req, res) => {
  const useremail = "sj2585097@gmail.com";
  const password = "Shubham#12";
  try {
    const authtoken = jwt.sign(
      { email: useremail, password: password },
      process.env.JWT_SECRET_KEY
    );
    //console.log(authtoken);
    if (authtoken) {
      res.status(200).json({
        success: "auth token genereted successfully",
        message:
          "Authorization successful! this token use for all rest api request",
        authorizationtoken: authtoken,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = { authtokencontroller };
