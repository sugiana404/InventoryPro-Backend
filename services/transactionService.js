const { QueryTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Product = require("../models/productModel");
const { TransactionItem } = require("../models/transactionItemModel");
const Transaction = require("../models/transactionModel");
const {
  NotFoundError,
  AddDataError,
  EnumViolationError,
} = require("../utils/errorUtils");
const { createAudit } = require("../utils/auditUtils");
const { findUserId } = require("../utils/jwtUtils");

async function createTransaction(date, items, token) {
  const userId = await findUserId(token);
  try {
    // check product status
    await checkProduct(items);

    const transaction = await Transaction.create({ date });

    // get all item on the transaction
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

    // Log to audit
    await createAudit("CREATE", "TRANSACTION", userId, { id: transaction.id });

    return { transaction, items: createdItems };
  } catch (error) {
    throw error;
  }
}

async function getTransactionData(status) {
  let transactionData;
  try {
    // Check if there is status in query
    if (status) {
      transactionData = await sequelize.query(
        "SELECT ti.id AS item_id, ti.quantity, ti.price, ti.TransactionId, ti.ProductId, t.id AS transaction_id, t.date, t.status FROM transactionitems as ti INNER JOIN transactions AS t ON ti.TransactionId = t.id WHERE t.status = :status; ",
        {
          type: QueryTypes.SELECT,
          replacements: { status: status },
        }
      );
    } else {
      transactionData = await sequelize.query(
        "SELECT ti.id AS item_id, ti.quantity, ti.price, ti.TransactionId, ti.ProductId, t.id AS transaction_id, t.date, t.status FROM transactionitems as ti INNER JOIN transactions AS t ON ti.TransactionId = t.id",
        {
          type: QueryTypes.SELECT,
        }
      );
    }

    const dataLength = transactionData.length;

    return { status, dataLength, transactionData };
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateTransactionStatus(transactionId, status, token) {
  const userId = await findUserId(token);
  // status ENUM validation
  if (!["PENDING", "ON_PROCESS", "DELIVERED", "FINISHED"].includes(status)) {
    throw new EnumViolationError(`Status is not in ENUM type data.`);
  }

  try {
    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      throw new NotFoundError(
        `Transaction with ID ${transactionId} is not found`
      );
    }
    const transactionUpdate = await transaction.update({
      status: status,
      UserId: userId,
    });

    // Log to audit
    await createAudit("UPDATE", "TRANSACTION", userId, {
      id: transactionId,
      status: status,
    });

    return transactionUpdate;
  } catch (error) {
    console.log(error.message);
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

module.exports = {
  createTransaction,
  getTransactionData,
  updateTransactionStatus,
};
