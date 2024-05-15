const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const AuditLog = require("../models/auditModel");

async function createAudit(actionType, entityType, userId, details) {
  try {
    const query = `INSERT INTO audits (actionType, entityType, userId, details, timeStamp)
    VALUES (:actionType, :entityType, :userId, :details, NOW())`;

    await sequelize.query(query, {
      replacements: {
        actionType,
        entityType,
        userId,
        details: `${JSON.stringify(details)}`,
      },
      type: QueryTypes.INSERT,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { createAudit };
