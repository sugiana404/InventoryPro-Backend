const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const { signup } = require("../controllers/authController");

const jwtConfig = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

module.exports = router;
