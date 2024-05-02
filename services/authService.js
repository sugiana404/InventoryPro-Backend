// Global Import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Local Import
const User = require("../models/userModel");
const jwtConfig = require("../config/jwtConfig");

async function createUser(firstName, lastName, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ firstName, lastName, email, password: hashedPassword });
}

async function login(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credential");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credential");
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtConfig.secretKey,
      {
        expiresIn: jwtConfig.expiresIn,
      }
    );
    return { token };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createUser, login };
