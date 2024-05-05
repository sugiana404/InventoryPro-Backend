// Global Import
const { DataTypes } = require("sequelize");
// Local Import
const sequelize = require("../db/sequelize");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  sold: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lastUpdate: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

Product.beforeUpdate((product, options) => {
  product.lastUpdate = new Date();
});

module.exports = Product;
