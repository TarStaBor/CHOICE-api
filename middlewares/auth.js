const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-err");
const errorMessages = require("../utils/error-messages");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError(errorMessages.AuthorizationError);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new UnauthorizedError(errorMessages.AuthorizationError);
  }
  req.user = payload;
  return next();
};
