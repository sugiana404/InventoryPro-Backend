const transactionService = require("../services/transactionService");
const { sendSuccessResponse } = require("../utils/responseUtils");

async function createTransaction(req, res, next) {
  const { date, items } = req.body;
  console.log(req.body);
  try {
    const result = await transactionService.createTransaction(date, items);
    sendSuccessResponse(res, 201, result, "Data created successfully");
  } catch (error) {
    next(error);
  }
}

module.exports = { createTransaction };
