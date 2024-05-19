const {
  NotFoundError,
  IncorrectPasswordError,
  AddDataError,
  UserNotSignInError,
  UnauthroizedError,
  EnumViolationError,
  BadRequestError,
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
  }

  if (err instanceof IncorrectPasswordError) {
    const errorResponse = {
      error: {
        code: "INCORRECT_PASSWORD_ERROR",
        message: err.message,
        details: "Please check your password and try again.",
      },
    };
    return res.status(401).json(errorResponse);
  }

  if (err instanceof AddDataError) {
    const errorResponse = {
      error: {
        code: "ADD_DATA_ERROR",
        message: err.message,
        details: "Failed to add the data.",
      },
    };
    return res.status(400).json(errorResponse);
  }

  if (err instanceof UserNotSignInError) {
    const errorResponse = {
      error: {
        code: "USER_NOT_SIGN_IN",
        message: err.message,
        details: "Failed to process request because there is no user login.",
      },
    };
    return res.status(401).json(errorResponse);
  }

  if (err instanceof UnauthroizedError) {
    const errorResponse = {
      error: {
        code: "UNAUTHORIZED_REQUEST",
        message: err.message,
        details: "Request failed because request is unauthorized.",
      },
    };
    return res.status(401).json(errorResponse);
  }

  if (err instanceof EnumViolationError) {
    const errorResponse = {
      error: {
        code: "ENUM_VIOLATION",
        message: err.message,
        details:
          "The input is not valid because the input is not accoding to database enum type data.",
      },
    };
    return res.status(400).json(errorResponse);
  }

  if (err instanceof BadRequestError) {
    const errorResponse = {
      error: {
        code: "BAD_REQUEST_ERROR",
        message: err.message,
        details: "Request can't be processed due to bad request error.",
      },
    };
  }

  const genericErrorResponse = {
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error.",
      details: "An unexpected error occured. Please try again later.",
    },
  };

  res.status(500).json(genericErrorResponse);
};

module.exports = errorHandler;
