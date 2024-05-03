const Product = require("../models/productModel");
const { TransactionItem } = require("../models/transactionItemModel");
const Transaction = require("../models/transactionModel");

async function createTransaction(date, items) {
  const transaction = await Transaction.create({ date });

  const createdItems = await Promise.all(
    items.map(async (item) => {
      const { productId, quantity, price } = item;
      const transactionItem = await TransactionItem.create({
        TransactionId: transaction.id,
        ProductId: productId,
        quantity,
        price,
      });
      await updateProductStock(productId, quantity);
      await updateProductSold(productId, quantity);
      return transactionItem;
    })
  );
  return { transaction, items: createdItems };
}

async function updateProductStock(productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  product.stock -= quantity;
  await product.save();
}

async function updateProductSold(productId, quantity) {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  product.sold += quantity;
  await product.save();
}

module.exports = { createTransaction };
