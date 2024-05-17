const ReSupply = require("../models/reSupplyModel");
const { createAudit } = require("../utils/auditUtils");
const { NotFoundError } = require("../utils/errorUtils");
const { findUserId } = require("../utils/jwtUtils");

async function newReSupplyRequest(
  product,
  stock,
  productId,
  supplierId,
  token
) {
  const userId = await findUserId(token);
  try {
    const reSupply = await ReSupply.create({
      product,
      stock,
      ProductId: productId,
      SupplierId: supplierId,
    });
    await createAudit(
      "CREATE",
      "RESUPPLY",
      userId,
      `${JSON.stringify(reSupply)}`
    );
    return reSupply;
  } catch (error) {
    console.log(`error: ${error}`);
    throw error;
  }
}

async function updateReSupplyRequest(reSupplyId, updateFields, token) {
  const userId = await findUserId(token);
  try {
    const reSupplyRequest = await ReSupply.findByPk(reSupplyId);
    if (!reSupplyRequest) {
      throw new NotFoundError(
        `ResupplyRequest with ID ${reSupplyId} is not found.`
      );
    }
    const reSupplyRequestUpdate = await reSupplyRequest.update(updateFields);
    const keys = Object.keys(updateFields);
    const changesArray = keys.map((key) => {
      const value = updateFields[key];
      return `${key}: ${value}`;
    });
    const changes = changesArray.join(", ");
    await createAudit(
      "UPDATE",
      "RESUPPLY",
      userId,
      `${JSON.stringify(changes)}`
    );
    return reSupplyRequestUpdate;
  } catch (error) {
    throw error;
  }
}

module.exports = { newReSupplyRequest, updateReSupplyRequest };
