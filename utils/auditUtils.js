const { QueryTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const { EnumViolationError } = require("./errorUtils");
const validEntityTypes = [
  "PRODUCT",
  "TRANSACTION",
  "CUSTOMER",
  "SUPPLIER",
  "RESUPPLY",
];

async function createAudit(actionType, entityType, entityId, userId, details) {
  try {
    if (!isValidEntityType(entityType)) {
      throw new EnumViolationError("Can't save audit data.");
    }

    const query = `INSERT INTO audits (actionType, entityType, entityId, userId, details, timeStamp)
    VALUES (:actionType, :entityType, :entityId, :userId, :details, NOW())`;

    await sequelize.query(query, {
      replacements: {
        actionType,
        entityType,
        entityId,
        userId,
        details: `${JSON.stringify(details)}`,
      },
      type: QueryTypes.INSERT,
    });
  } catch (error) {
    throw error;
  }
}

function isValidEntityType(entityType) {
  return validEntityTypes.includes(entityType);
}

module.exports = { createAudit };
