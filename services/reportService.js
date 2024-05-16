const sequelize = require("../db/sequelize");

async function getRevenueInfo(year, month) {
  try {
    // Get first date and last date of month
    const startDate = `${year}-${month
      .toString()
      .padStart(2, "0")}-01 00:00:00`;
    const endDate = await getLastDayOfMonth(year, month);

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

    let totalMonthlyRevenue = 0;

    // Count total monthly revenue
    productInfo.forEach((product) => {
      totalMonthlyRevenue += Number(product.totalIncome);
    });

    return { totalMonthlyRevenue, productInfo };
  } catch (error) {
    throw error;
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
