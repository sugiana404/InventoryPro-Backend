const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig');

const sequelize = new Sequelize(dbConfig.dbDatabase,dbConfig.dbUser, dbConfig.dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
});

module.exports = sequelize;