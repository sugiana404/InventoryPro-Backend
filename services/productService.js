// Global Import
const { QueryTypes, Op } = require("sequelize");
const jwt = require("jsonwebtoken");

// Local Import
const Product = require("../models/productModel");
const sequelize = require("../db/sequelize");
const { NotFoundError } = require("../utils/errorUtils");
const { findUserId } = require("../utils/jwtUtils");
const { createAudit } = require("../utils/auditUtils");

async function createProduct(
  name,
  stock,
  price,
  category,
  sold,
  supplierId,
  token
) {
  const userId = await findUserId(token);
  try {
    const product = await Product.create({
      name,
      stock,
      price,
      category,
      sold,
      supplierId,
    });
    const added = {
      stock,
      price,
      category,
      supplierId,
    };
    await createAudit("CREATE", "PRODUCT", product.id, userId, {
      id: product.id,
      added: [added],
    });
    return product;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw error;
  }
}

async function updateProduct(productId, updateFields, token) {
  try {
    const userId = await findUserId(token);
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} is not found`);
    }
    const productUpdate = await product.update(updateFields);

    const changes = {};
    for (const [key, value] of Object.entries(updateFields)) {
      changes[key] = value;
    }

    await createAudit("UPDATE", "PRODUCT", product.id, userId, {
      id: product.id,
      changes: [changes],
    });
    return productUpdate;
  } catch (error) {
    console.log(`Error: ${error.message}`);
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

async function findProduct(searchKey) {
  let product;
  if (/^\d+$/.test(searchKey)) {
    product = await Product.findByPk(searchKey);
  } else {
    product = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchKey}%` } },
          { category: { [Op.like]: `%${searchKey}%` } },
        ],
      },
    });
  }
  return product;
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
  findProduct,
};
