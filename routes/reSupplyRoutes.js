const express = require("express");
const router = express.Router();

const reSupplyController = require("../controllers/reSupplyController");

router.post("/new_resupply_request", reSupplyController.newReSupplyRequest);
router.put(
  "/update_resupply_request/:id",
  reSupplyController.updateReSupplyRequest
);

module.exports = router;
