const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Transaction = sequelize.define("Transaction", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = Transaction;
