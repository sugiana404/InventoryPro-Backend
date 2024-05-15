const reportService = require("../services/reportService");
const { UnauthroizedError } = require("../utils/errorUtils");
const { sendSuccessResponse } = require("../utils/responseUtils");

async function generateFinancialReport(req, res, next) {
  const { year, month } = req.query;
  try {
    if (!req.user) {
      throw new UnauthroizedError("Can't get data");
    }
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
    next(error);
  }
}

module.exports = { generateFinancialReport };
