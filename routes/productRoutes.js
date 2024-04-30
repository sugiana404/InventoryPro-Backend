const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/jwtMiddleware");

const productController = require("../controllers/productController");
router.post(
  "/create_product",
  authenticateToken.authenticateToken,
  productController.createProduct
);
router.get(
  "/get_product",
  authenticateToken.authenticateToken,
  productController.getAllProduct
);
router.get(
  "/get_low_stock",
  authenticateToken.authenticateToken,
  productController.getLowStockProduct
);
router.get(
  "/get_best_seller",
  authenticateToken.authenticateToken,
  productController.getBestSellerProduct
);

module.exports = router;
