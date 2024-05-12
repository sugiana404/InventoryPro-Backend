const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Transaction = sequelize.define("Transaction", {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  status: {
    type: DataTypes.ENUM("PENDING", "ON_PROCESS", "DELIVERED", "FINISHED"),
    allowNull: false,
    defaultValue: "PENDING",
  },
});

module.exports = Transaction;
