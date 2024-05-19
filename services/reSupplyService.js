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
    const added = {
      product,
      stock,
      productId,
      supplierId,
    };
    await createAudit("CREATE", "RESUPPLY", reSupply.id, userId, {
      id: reSupply.id,
      added: [added],
    });
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

    const changes = {};
    for (const [key, value] of Object.entries(updateFields)) {
      changes[key] = value;
    }

    await createAudit("UPDATE", "RESUPPLY", reSupplyRequest.id, userId, {
      id: reSupplyRequest.id,
      changes: [changes],
    });
    return reSupplyRequestUpdate;
  } catch (error) {
    throw error;
  }
}

module.exports = { newReSupplyRequest, updateReSupplyRequest };
