// Global Import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Local Import
const User = require("../models/userModel");
const jwtConfig = require("../config/jwtConfig");
const {
  NotFoundError,
  IncorrectPasswordError,
  AddDataError,
} = require("../utils/errorUtils");

async function signUp(firstName, lastName, email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new AddDataError("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const name = `${firstName} ${lastName}`;
    return {
      name: name,
      email,
      role: "USER",
    };
  } catch (error) {
    throw error;
  }
}

async function signIn(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new IncorrectPasswordError("Incorrect password");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    const expired = new Date();
    expired.setHours(expired.getHours() + 1);

    return {
      token: token,
      expired: expired,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { signUp, signIn };
