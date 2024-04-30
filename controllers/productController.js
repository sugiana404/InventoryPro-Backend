const productService = require("../services/productService");

async function createProduct(req, res) {
  console.log(req.body);
  const { name, stock, price, sold, supplier } = req.body;
  try {
    await productService.createProduct(name, stock, price, sold, supplier);
    res.status(201).json({ message: "Product added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllProduct(req, res) {
  try {
    const product = await productService.getProduct();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getLowStockProduct(req, res) {
  try {
    const lowStockProduct = await productService.getLowStockProduct();
    res.status(200).json(lowStockProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getBestSellerProduct(req, res) {
  try {
    const bestSellerProduct = await productService.getBestSellerProduct();
    res.status(200).json(bestSellerProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createProduct,
  getAllProduct,
  getLowStockProduct,
  getBestSellerProduct,
};
