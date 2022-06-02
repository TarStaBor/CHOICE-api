const rateLimit = require("express-rate-limit");

// No more than 100 requests from one IP in 1 minute
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

module.exports = limiter;
