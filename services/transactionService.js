const Product = require("../models/productModel");
const { TransactionItem } = require("../models/transactionItemModel");
const Transaction = require("../models/transactionModel");
const { NotFoundError, AddDataError } = require("../utils/errorUtils");

async function createTransaction(date, items) {
  try {
    await checkProduct(items);

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
        const product = await Product.findByPk(productId);
        product.stock -= quantity;
        product.sold += quantity;
        await product.save();
        return transactionItem;
      })
    );

    return { transaction, items: createdItems };
  } catch (error) {
    throw error;
  }
}

async function checkProduct(items) {
  try {
    for (const item of items) {
      const { productId, quantity } = item;
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new NotFoundError(`Product with ID ${productId} not found`);
      }
      if (quantity === 0) {
        throw new AddDataError(
          `Product with ID ${productId} have 0 in quantity order`
        );
      }
      if (product.stock < quantity) {
        throw new AddDataError(
          `Insufficient stock for product with ID ${productId}`
        );
      }
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { createTransaction };
