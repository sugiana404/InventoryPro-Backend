const { Op, Sequelize } = require("sequelize");
const { TransactionItem } = require("../models/transactionItemModel");
const Product = require("../models/productModel");
const Transaction = require("../models/transactionModel");
const sequelize = require("../db/sequelize");

async function getRevenueInfo(year, month) {
  try {
    const startDate = `${year}-${month
      .toString()
      .padStart(2, "0")}-01 00:00:00`;
    const endDate = await getLastDayOfMonth(year, month);

    console.log(`startDate : ${startDate}, endDate: ${endDate}`);

    const query = `SELECT p.name AS productName, CAST(SUM(ti.quantity * ti.price) AS UNSIGNED) AS totalIncome 
    FROM transactionitems ti
    JOIN transactions t ON ti.TransactionId = t.id
    JOIN products p ON ti.ProductId = p.id
    WHERE t.date >= :startDate AND t.date <= :endDate
    GROUP By p.id, p.name
    `;

    const productInfo = await sequelize.query(query, {
      replacements: { startDate, endDate },
      type: sequelize.QueryTypes.SELECT,
    });

    console.log(`productInfo: ${productInfo}`);

    let totalMonthlyRevenue = 0;
    productInfo.forEach((product) => {
      totalMonthlyRevenue += Number(product.totalIncome);
    });

    console.log(`totalMonthlyRevenue: ${totalMonthlyRevenue}`);

    return { totalMonthlyRevenue, productInfo };
  } catch (error) {
    throw new Error("Error finding all transactions");
  }
}

async function getLastDayOfMonth(year, month) {
  const lastDay = new Date(year, month + 1, 0).getDate();
  return `${year}-${(month + 1)
    .toString()
    .padStart(2, "0")}-${lastDay} 23:59:59`;
}

module.exports = {
  getRevenueInfo,
};
