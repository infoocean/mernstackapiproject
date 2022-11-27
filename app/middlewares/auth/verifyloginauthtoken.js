const jwt = require("jsonwebtoken");

const usermodel = require("../../models/usersmodel");
const acces_data_secret_key = process.env.LOGIN_JWT_SECRET_KEY;

const verifyLoginAuthToken = async (req, res, next) => {
  const loginauthtoken = req.headers["x-access-token"];
  //console.log(loginauthtoken);
  if (verifyLoginAuthToken === undefined) {
    return res
      .status(403)
      .send({ message: "A token is required for authontication" });
  }
  try {
    const verifytoken = jwt.verify(loginauthtoken, acces_data_secret_key);
    //console.log(verifytoken);
    const user = await usermodel.findOne({
      _id: loginauthtoken._id,
      "tokens.token": loginauthtoken,
    });
    console.log(user);
    if (!user) {
      throw new Error("user not found");
    } else {
      next();
    }
  } catch (err) {
    return res.status(401).send({ message: "Invalid login Token" });
  }
  return next();
};

module.exports = { verifyLoginAuthToken };
