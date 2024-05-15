const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

async function findUserId(token) {
  if (!token) {
    throw new Error("Cookies don't have token");
  }
  try {
    console.log(`token : ${token}`);
    const decodedToken = jwt.verify(token, jwtConfig.secretKey);
    console.log(`decodedToken: ${decodedToken}`);
    const userId = decodedToken.id;
    console.log(`userId: ${userId}`);
    return userId;
  } catch (error) {
    throw error;
  }
}

module.exports = { findUserId };
