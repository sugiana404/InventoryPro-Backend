// This code will be not used because the project will store the token in cookies instead of store it in local.

// Global Import
const jwt = require("jsonwebtoken");

// Local Import
const jwtConfig = require("../config/jwtConfig");
const { UnauthorizedError } = require("../utils/errorUtils");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    throw new UnauthorizedError("Can't find token in request header.");
  }

  jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
    if (err) {
      throw new UnauthorizedError("Token is expired or invalid.");
    }
    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken };
