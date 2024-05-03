const transactionService = require("../services/transactionService");

async function createTransaction(req, res) {
  const { date, items } = req.body;
  console.log(req.body);
  try {
    const result = await transactionService.createTransaction(date, items);
    res.status(201).json({ message: "Transaction added", data: result });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createTransaction };
