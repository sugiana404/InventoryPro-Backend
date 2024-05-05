// Global Import
const { ValidationError } = require("sequelize");

// Local Import
const authService = require("../services/authService");
const { sendSuccessResponse } = require("../utils/responseUtils");

async function signUp(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await authService.signUp(firstName, lastName, email, password);
    sendSuccessResponse(res, 201, user, "Data created succesfully");
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const token = await authService.signIn(email, password);
    sendSuccessResponse(res, 200, token, "SignIn succesfully");
  } catch (error) {
    next(error);
  }
}

module.exports = { signUp, signIn };
