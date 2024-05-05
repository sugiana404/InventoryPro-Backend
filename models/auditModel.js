const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const User = require("./userModel");

const AuditLog = sequelize.define("Audit", {
  actionType: {
    type: DataTypes.ENUM("CREATE", "UPDATE"),
    allowNull: false,
  },
  entityType: {
    type: DataTypes.ENUM("PRODUCT", "ORDER"),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  details: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeStamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = AuditLog;
