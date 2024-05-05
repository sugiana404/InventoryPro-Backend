const {
  NotFoundError,
  IncorrectPasswordError,
  DataAlreadyExistsError,
  AddDataError,
} = require("../utils/errorUtils");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof NotFoundError) {
    const errorResponse = {
      error: {
        code: "NOT_FOUND_ERROR",
        message: err.message,
        details: "The requested resource was not found.",
      },
    };
    return res.status(404).json(errorResponse);
  } else if (err instanceof IncorrectPasswordError) {
    const errorResponse = {
      error: {
        code: "INCORRECT_PASSWORD_ERROR",
        message: err.message,
        details: "Please check your password and try again.",
      },
    };
    return res.status(401).json(errorResponse);
  } else if (err instanceof AddDataError) {
    const errorResponse = {
      error: {
        code: "ADD_DATA_ERROR",
        message: err.message,
        details: "Failed to add the data.",
      },
    };
    return res.status(400).json(errorResponse);
  }

  const genericErrorResponse = {
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error.",
      details: "AN unexpected error occured. Please try again later.",
    },
  };

  res.status(500).json(genericErrorResponse);
};

module.exports = errorHandler;
