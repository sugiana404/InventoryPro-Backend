const Product = require("../models/productModel");
const transactionService = require("../services/transactionService");
async function createTransaction(req, res) {
  try {
    const result = await transactionService.createTransaction(req.body);
    if (result.success) {
      res.status(200).json({ succes: true, message: result });
    } else {
      res.status(500).json({ success: false, message: result });
    }
  } catch (error) {
    console.error("Error adding transactions:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
}

module.exports = { createTransaction };
