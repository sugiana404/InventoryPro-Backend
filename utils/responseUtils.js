function sendSuccessResponse(
  res,
  statusCode,
  data,
  message = "Operation successful"
) {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data,
  });
}

module.exports = { sendSuccessResponse };
