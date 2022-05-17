const rateLimit = require("express-rate-limit");

// Не более 100 запросов с одного IP за 1 минуту
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

module.exports = limiter;
