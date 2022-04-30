const router = require("express").Router();
// const fileMiddleware = require("../middlewares/multer");
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const { createApplicant } = require("../controllers/responses");

// создаёт фильм с переданными в теле данными
router.post("/", createApplicant);

module.exports = router;
