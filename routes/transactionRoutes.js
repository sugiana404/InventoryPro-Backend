const express = require("express");

const transactionController = require("../controllers/transactionController");
const { authenticateToken } = require("../middleware/jwtMiddleware");

const router = express.Router();

router.post("/create_transaction", transactionController.createTransaction);
router.get("/get_transaction_data", transactionController.getTransactionData);
module.exports = router;
