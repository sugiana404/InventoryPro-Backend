// Global Import
const express = require("express");
const router = express.Router();

// Local Import
const authController = require("../controllers/authController");

router.post("/sign_up", authController.signUp);
router.post("/sign_in", authController.signIn);
router.post("/sign_out", authController.signOut);

module.exports = router;
