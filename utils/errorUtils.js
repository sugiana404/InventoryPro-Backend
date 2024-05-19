class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class IncorrectPasswordError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectPasswordError";
    this.statusCode = 401;
  }
}

class AddDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "AddDataError";
    this.statusCode = 400;
  }
}

class UserNotSignInError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotSignInError";
    this.statusCode = 401;
  }
}

class UnauthroizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.statusCode = 401;
  }
}

class PageNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "PageNotFoundError";
    this.statusCode = 404;
  }
}

class EnumViolationError extends Error {
  constructor(message) {
    super(message);
    this.name = "EnumViolationError";
    this.statusCode = 400;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

module.exports = {
  NotFoundError,
  IncorrectPasswordError,
  AddDataError,
  UserNotSignInError,
  UnauthroizedError,
  PageNotFoundError,
  EnumViolationError,
  BadRequestError,
};
