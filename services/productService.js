// Global Import
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

// Local Import
const Product = require("../models/productModel");
const sequelize = require("../db/sequelize");
const jwtConfig = require("../config/jwtConfig");
const { UnauthorizedError, NotFoundError } = require("../utils/errorUtils");
const { tokenDecode } = require("../utils/jwtUtils");
const AuditLog = require("../models/auditModel");

async function createProduct(req) {
  const { name, stock, price, supplier, sold, supplierId } = req.body;
  const tokenDecoded = await tokenDecode(req);
  console.log(`token decoded: ${tokenDecoded}`);
  const userId = tokenDecoded.id;
  console.log(`userId: ${userId}`);
  try {
    const product = await Product.create({
      name,
      stock,
      price,
      supplier,
      sold,
      supplierId,
    });
    const auditLog = await AuditLog.create({
      actionType: "CREATE",
      entityType: "PRODUCT",
      userId: userId,
      details: `CREATE: [{product name: ${name}, productId: ${product.id}}`,
    });
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(productId, updateFields) {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} is not found`);
    }
    const productUpdate = await product.update(updateFields);
    return productUpdate;
  } catch (error) {
    throw error;
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
  updateProduct,
  getProduct,
  getLowStockProduct,
  getBestSellerProduct,
};
