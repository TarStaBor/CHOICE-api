const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-err");
const errorMessages = require("../utils/error-messages");

module.exports = (req, res, next) => {
  // Достать авторизационный заголовок
  const { authorization } = req.headers;
  // Убедиться, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError(errorMessages.AuthorizationError);
  }
  // Извлечь токен
  const token = authorization.replace("Bearer ", "");
  let payload;

  // После извлечения токена из запроса убедиться,
  // что пользователь прислал именно тот токен, который был выдан ему ранее
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new UnauthorizedError(errorMessages.AuthorizationError);
  }
  // Записать пейлоуд в объект запроса
  req.user = payload;
  // Пропустить запрос дальше
  return next();
};
