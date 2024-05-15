const { DataTypes } = require("sequelize");

const sequelize = require("../db/sequelize");

const Customer = sequelize.define("customer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = Customer;
