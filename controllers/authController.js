// Global Import
const { ValidationError } = require("sequelize");

// Local Import
const authService = require("../services/authService");

async function signup(req, res) {
  const { firstName, lastName, email, password } = req.body;
  try {
    await authService.createUser(firstName, lastName, email, password);
    res.status(201).json({ message: "User create succefully" });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  try {
    const { token } = await authService.login(email, password);
    res.status(200).json({ message: "Login success", token });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

module.exports = { signup, login };
