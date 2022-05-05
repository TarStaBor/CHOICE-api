const router = require("express").Router();
// const fileMiddleware = require("../middlewares/multer");
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const { getJobById } = require("../controllers/jobs");

const { createApplicant } = require("../controllers/responses");

// возвращает вакансию по id
router.get("/:id", getJobById);

// создаёт фильм с переданными в теле данными
router.post("/", createApplicant);

module.exports = router;
