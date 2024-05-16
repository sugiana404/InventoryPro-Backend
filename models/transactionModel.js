const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const User = require("./userModel");
const Customer = require("./customerModel");

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
    validate: {
      isIn: [["PENDING", "ON_PROCESS", "DELIVERED", "FINISHED"]],
    },
  },
});

Transaction.belongsTo(User);
Transaction.belongsTo(Customer);

module.exports = Transaction;
