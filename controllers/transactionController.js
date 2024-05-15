const transactionService = require("../services/transactionService");
const { UnauthroizedError } = require("../utils/errorUtils");
const { sendSuccessResponse } = require("../utils/responseUtils");

async function createTransaction(req, res, next) {
  const { date, items } = req.body;
  const token = req.cookies.accessToken;

  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to create transaction");
    }

    const result = await transactionService.createTransaction(
      date,
      items,
      token
    );

    sendSuccessResponse(res, 201, result, "Data created successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getTransactionData(req, res, next) {
  const { status } = req.query;

  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to get transaction data.");
    }
    const data = await transactionService.getTransactionData(status, token);
    sendSuccessResponse(res, 200, data, "Get data succesfully.");
  } catch (error) {
    next(error);
  }
}

async function updateTransaction(req, res, next) {
  const { transactionId, status } = req.body;
  const token = req.cookies.accessToken;
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to update transaction data.");
    }
    const data = await transactionService.updateTransactionStatus(
      transactionId,
      status,
      token
    );
    sendSuccessResponse(res, 200, data, "Update data successfully.");
  } catch (error) {
    next(error);
  }
}

module.exports = { createTransaction, getTransactionData, updateTransaction };
