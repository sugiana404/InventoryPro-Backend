// Global Import
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

// Local Import
const Product = require("../models/productModel");
const sequelize = require("../db/sequelize");
const jwtConfig = require("../config/jwtConfig");
const { UnauthorizedError, NotFoundError } = require("../utils/errorUtils");
const { tokenDecode, findUserId } = require("../utils/jwtUtils");
const AuditLog = require("../models/auditModel");
const { createAudit } = require("../utils/auditUtils");

async function createProduct(req) {
  const { name, stock, price, supplier, sold, supplierId } = req.body;
  const userId = await findUserId(req);
  console.log(userId);
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

async function countLowStockProduct() {
  try {
    return sequelize.query(
      "SELECT CAST(SUM(CASE WHEN stock < :stock THEN 1 ELSE 0 END) AS UNSIGNED) AS lowStockProduct, COUNT(*) AS totalProduct from products;",
      {
        type: QueryTypes.SELECT,
        replacements: { stock: 20 },
      }
    );
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
  countLowStockProduct,
  getBestSellerProduct,
};
