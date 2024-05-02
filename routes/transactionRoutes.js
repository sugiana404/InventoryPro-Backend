const express = require("express");

const transactionController = require("../controllers/transactionController");
const { authenticateToken } = require("../middleware/jwtMiddleware");

const router = express.Router();

router.post("/create_transaction", transactionController.createTransaction);

module.exports = router;
