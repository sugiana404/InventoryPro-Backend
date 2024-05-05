const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Transaction = sequelize.define("Transaction", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  status: {
    type: DataTypes.ENUM("ON_PROCESS", "DELIVERED"),
    allowNull: false,
    defaultValue: "ON_PROCESS",
  },
});

module.exports = Transaction;
