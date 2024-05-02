const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const Product = require("./productModel");

const Transaction = sequelize.define("Transaction", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Transaction;
