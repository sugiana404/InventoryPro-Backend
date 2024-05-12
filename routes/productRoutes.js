const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
router.post("/create_product", productController.createProduct);
router.put("/update_product/:id", productController.updateProduct);
router.get("/get_product", productController.getAllProduct);
router.get("/get_low_stock", productController.getLowStockProduct);
router.get("/get_best_seller", productController.getBestSellerProduct);

module.exports = router;
