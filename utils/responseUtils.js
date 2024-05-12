function sendSuccessResponse(res, statusCode, data, message) {
  if (data !== undefined) {
    res.status(statusCode).json({
      success: true,
      message: message,
      data: data,
    });
  } else {
    res.status(statusCode).json({
      success: true,
      message: message,
    });
  }
}

module.exports = { sendSuccessResponse };
