const express = require("express");

const reportController = require("../controllers/reportController");

const router = express.Router();

router.get("/get_report", reportController.generateFinancialReport);

module.exports = router;
