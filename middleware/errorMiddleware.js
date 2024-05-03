const createError = require("http-errors");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (!err.status) {
    err = createError(500, "Internal Server Error");
  }

  res.status(err.status);
  res.json({
    error: {
      message: err.message,
    },
  });
};

module.exports = errorHandler;
