// Global Import
const { Sequelize } = require("sequelize");

// Local Import
const dbConfig = require("../config/dbConfig");

const sequelize = new Sequelize(
  dbConfig.dbDatabase,
  dbConfig.dbUser,
  dbConfig.dbPassword,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false,
    },
  }
);

module.exports = sequelize;
