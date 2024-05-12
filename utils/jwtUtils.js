const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

async function findUserId(req) {
  const token = req.headers["authorization"];
  const decodedToken = jwt.verify(token, jwtConfig.secretKey);
  const userId = decodedToken.id;
  return userId;
}

module.exports = { findUserId };
