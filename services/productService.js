// Global Import
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

// Local Import
const Product = require("../models/productModel");
const sequelize = require("../db/sequelize");
const jwtConfig = require("../config/jwtConfig");

async function createProduct(
  name,
  stock,
  price,
  sold,
  supplier,
  supplierId,
  token
) {
  const decodedToken = jwt.verify(token, jwtConfig.secretKey);
  const userRole = decodedToken.role;
  try {
    if (userRole === "ADMIN") {
      return Product.create({
        name,
        stock,
        price,
        supplier,
        sold,
        supplierId,
      });
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getProduct() {
  try {
    return Product.findAll();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getLowStockProduct() {
  try {
    return sequelize.query("SELECT * FROM products WHERE stock < :stock", {
      type: QueryTypes.SELECT,
      replacements: { stock: 20 },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getBestSellerProduct() {
  try {
    return sequelize.query(
      "SELECT * FROM products ORDER BY sold DESC LIMIT 4",
      {
        type: QueryTypes.SELECT,
      }
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createProduct,
  getProduct,
  getLowStockProduct,
  getBestSellerProduct,
};
