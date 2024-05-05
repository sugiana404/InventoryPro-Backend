const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

async function tokenDecode(req) {
  const token = req.headers["authorization"];
  const decodedToken = jwt.verify(token, jwtConfig.secretKey);
  return decodedToken;
}

module.exports = { tokenDecode };
