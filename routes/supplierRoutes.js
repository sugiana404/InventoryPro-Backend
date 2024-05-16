const express = require("express");
const router = express.Router();

const supplierController = require("../controllers/supplierController");

router.post("/add_supplier", supplierController.addSupplier);
router.get("/get_supplier", supplierController.getSupplier);
router.get("/get_supplier/:id", supplierController.getSupplierById);
router.put("/update_supplier/:id", supplierController.updateSupplierData);

module.exports = router;
