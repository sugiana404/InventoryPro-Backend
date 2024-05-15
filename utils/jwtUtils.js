const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");
const { UnauthorizedError } = require("express-jwt");

async function findUserId(token) {
  if (!token) {
    throw new UnauthorizedError("Token invalid or expired.");
  }
  try {
    const decodedToken = jwt.verify(token, jwtConfig.secretKey);
    const userId = decodedToken.id;
    return userId;
  } catch (error) {
    throw error;
  }
}

module.exports = { findUserId };
