const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Transaction = require("../models/transactionModel");
const Product = require("../models/productModel");

const TransactionItem = sequelize.define("TransactionItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

TransactionItem.belongsTo(Transaction);
TransactionItem.belongsTo(Product);

module.exports = { TransactionItem };
