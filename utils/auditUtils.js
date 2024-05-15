const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const AuditLog = require("../models/auditModel");

async function createAudit(actionType, entityType, userId, entityId, details) {
  try {
    const detailsInfo = `${actionType} : {entity Id : ${entityId}}, DETAILS: ${details}`;
    const query = `INSERT INTO audits (actionType, entityType, userId, details, timeStamp)
    VALUES (:actionType, :entityType, :userId, :detailsInfo, NOW())`;

    console.log(`details info : ${detailsInfo}`);
    await sequelize.query(query, {
      replacements: { actionType, entityType, userId, detailsInfo },
      type: QueryTypes.INSERT,
    });
  } catch (error) {
    throw error;
  }
}

module.exports = { createAudit };
