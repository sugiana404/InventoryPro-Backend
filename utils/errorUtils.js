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

module.exports = {
  NotFoundError,
  IncorrectPasswordError,
  AddDataError,
};
