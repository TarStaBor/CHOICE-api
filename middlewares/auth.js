// Авторизация
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const errorMessages = require('../utils/error-messages');
const devConfig = require('../utils/devConfig');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errorMessages.AuthorizationError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devConfig.JWT_SECRET_DEV);
  } catch (e) {
    throw new UnauthorizedError(errorMessages.AuthorizationError);
  }
  req.user = payload;

  return next();
};
