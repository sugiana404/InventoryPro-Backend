//  Local Import
const productService = require("../services/productService");
const { sendSuccessResponse } = require("../utils/responseUtils");
const { UnauthroizedError } = require("../utils/errorUtils");

async function createProduct(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to create product.");
    }
    const product = await productService.createProduct(req);
    sendSuccessResponse(res, 201, product, "Product added successfully");
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to update product.");
    }
    const productId = req.params.id;
    const updateFields = req.body;
    const productUpdate = await productService.updateProduct(
      productId,
      updateFields,
      req
    );
    sendSuccessResponse(
      res,
      200,
      productUpdate,
      "Product updated successfully"
    );
  } catch (error) {
    next(error);
  }
}

async function getAllProduct(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to get data.");
    }
    const product = await productService.getProduct();
    sendSuccessResponse(res, 200, product, "Get data successfully");
  } catch (error) {
    next(error);
  }
}

async function getLowStockProduct(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to get data.");
    }
    const lowStockProduct = await productService.getLowStockProduct();
    sendSuccessResponse(res, 200, lowStockProduct, "Get data successfully");
  } catch (error) {
    next(error);
  }
}

async function getBestSellerProduct(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthroizedError("Failed to get data.");
    }
    const bestSellerProduct = await productService.getBestSellerProduct();
    sendSuccessResponse(res, 200, bestSellerProduct, "Get data successfully");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  getLowStockProduct,
  getBestSellerProduct,
};
