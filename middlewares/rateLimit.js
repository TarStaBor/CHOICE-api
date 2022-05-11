const rateLimit = require("express-rate-limit");

// Не более 200 запросов с одного IP за 15 минут
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

module.exports = limiter;
