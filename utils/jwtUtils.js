const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

async function findUserId(token) {
  if (!token) {
    throw new Error("Cookies don't have token");
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
