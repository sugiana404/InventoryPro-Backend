// Global Import
const jwt = require("jsonwebtoken");

// Local Import
const jwtConfig = require("../config/jwtConfig");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken };
