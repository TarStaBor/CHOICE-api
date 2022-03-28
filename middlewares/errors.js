const errorMessages = require('../utils/error-messages');

const errorsMiddleware = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.ServerError
        : message,
    });
  next();
};

module.exports = errorsMiddleware;
