const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");
const { UserNotSignInError } = require("../utils/errorUtils");

function cookieCheckMiddleware(req, res, next) {
  const token = req.cookies["accessToken"];

  if (token) {
    try {
      const decodedToken = jwt.verify(token, jwtConfig.secretKey);
      req.user = decodedToken;
    } catch (error) {
      console.error("Invalid token: ", error.message);
      throw error;
    }
  }
  next();
}

module.exports = cookieCheckMiddleware;
