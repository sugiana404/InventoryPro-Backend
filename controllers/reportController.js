const reportService = require("../services/reportService");
const { sendSuccessResponse } = require("../utils/responseUtils");

async function generateFinancialReport(req, res) {
  const { year, month } = req.query;
  try {
    if (!year || !month) {
      return res.status(400).json({
        error: "Year and month are required",
      });
    }
    const totalMonthlyRevenue = await reportService.getRevenueInfo(
      Number(year),
      Number(month)
    );
    sendSuccessResponse(res, 200, totalMonthlyRevenue, "Get data successfully");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = { generateFinancialReport };
