const { UnauthorizedError } = require("express-jwt");
const reSupplyService = require("../services/reSupplyService");
const { sendSuccessResponse } = require("../utils/responseUtils");

async function newReSupplyRequest(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthorizedError("Failed to add new request.");
    }
    const { product, stock, productId, supplierId } = req.body;
    const token = req.cookies.accessToken;
    const reSupplyRequest = await reSupplyService.newReSupplyRequest(
      product,
      stock,
      productId,
      supplierId,
      token
    );
    sendSuccessResponse(res, 201, reSupplyRequest, "Request sent.");
  } catch (error) {
    next(error);
  }
}

async function updateReSupplyRequest(req, res, next) {
  try {
    if (!req.user) {
      throw new UnauthorizedError("Failed to update data.");
    }
    const updateFields = req.body;
    const resupplyId = req.params.id;
    const token = req.cookies.accessToken;
    const reSupplyRequestUpdate = await reSupplyService.updateReSupplyRequest(
      resupplyId,
      updateFields,
      token
    );
    sendSuccessResponse(res, 200, reSupplyRequestUpdate, "Data updated.");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  newReSupplyRequest,
  updateReSupplyRequest,
};
