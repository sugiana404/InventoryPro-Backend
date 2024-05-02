const Transaction = require("../models/transactionModel");

async function createTransaction(transactionsData) {
  try {
    for (const product of transactionsData.products) {
      const totalPrice = product.productPrice * product.quantity;
      await Transaction.create({
        productId: product.productId,
        productPrice: product.productPrice,
        quantity: product.quantity,
        totalPrice: totalPrice,
      });
      return { success: true, message: "transaction added" };
    }
  } catch (error) {
    console.error("Error adding transactions:", error);
    return { success: false, message: "Error" };
  }
}

module.exports = { createTransaction };
