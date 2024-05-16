const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.post("/add_customer", customerController.addCustomer);
router.put("/update_customer/:id", customerController.updateCustomer);
module.exports = router;
