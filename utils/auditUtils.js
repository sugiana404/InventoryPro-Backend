const AuditLog = require("../models/auditModel");

async function createAudit(actionType, entityType, userId, details) {
  try {
    await AuditLog.create({
      actionType: actionType,
      entityType: entityType,
      userId: userId,
      details: details,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { createAudit };
