// Global Import
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

// Local Import
const Product = require("../models/productModel");
const sequelize = require("../db/sequelize");
const { NotFoundError } = require("../utils/errorUtils");
const { findUserId } = require("../utils/jwtUtils");
const AuditLog = require("../models/auditModel");
const { createAudit } = require("../utils/auditUtils");

async function createProduct(req) {
  const { name, stock, price, category, supplier, sold, supplierId } = req.body;
  const jwtToken = req.cookies.accessToken;
  console.log(`token: ${jwtToken}`);
  const userId = await findUserId(jwtToken);
  console.log(userId);
  try {
    const product = await Product.create({
      name,
      stock,
      price,
      category,
      supplier,
      sold,
      supplierId,
    });
    await AuditLog.create({
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

async function updateProduct(productId, updateFields, req) {
  try {
    const userId = await findUserId(req);
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} is not found`);
    }
    const productUpdate = await product.update(updateFields);
    const keys = Object.keys(updateFields);
    const changesArray = keys.map((key) => {
      const value = updateFields[key];
      return `${key}: ${value}`;
    });
    const changes = changesArray.join(", ");
    console.log(`changes: ${changes}`);
    await createAudit(
      "UPDATE",
      "PRODUCT",
      userId,
      `UPDATE: [{product Id: ${productId}}, update: [${changes}]]`
    );
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
    const lowStockProducts = await sequelize.query(
      "SELECT * FROM products WHERE stock < :stock",
      {
        type: QueryTypes.SELECT,
        replacements: { stock: 20 },
      }
    );
    const count = lowStockProducts.length;
    return { lowStockProducts, count };
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
