const { DataTypes } = require("sequelize");

const sequelize = require("../db/sequelize");
const Product = require("./productModel");
const Supplier = require("./supplierModel");

const ReSupply = sequelize.define("ReSupply", {
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("ON_PROCESS", "DELIVERED", "ARRIVED", "CANCELED"),
    defaultValue: "ON_PROCESS",
  },
  requestDate: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  lastUpdate: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

ReSupply.beforeUpdate((reSupply, options) => {
  reSupply.lastUpdate = new Date();
});

ReSupply.belongsTo(Product);
ReSupply.belongsTo(Supplier);

module.exports = ReSupply;
