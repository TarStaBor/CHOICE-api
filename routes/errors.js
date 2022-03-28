const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const errorMessages = require('../utils/error-messages');

router.use('/*', (req, res, next) => {
  next(new NotFoundError(errorMessages.NotFoundPage));
});

module.exports = router;
