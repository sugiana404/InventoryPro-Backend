const express = require("express");

const transactionController = require("../controllers/transactionController");

const router = express.Router();

router.post("/create_transaction", transactionController.createTransaction);
router.get("/get_transaction_data", transactionController.getTransactionData);
router.put(
  "/update_transaction_status/:id",
  transactionController.updateTransaction
);
module.exports = router;
