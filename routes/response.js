// router создаёт объект, на который мы повесим обработчики
const router = require("express").Router();
// const fileMiddleware = require("../middlewares/multer");
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const { getJobById, createApplicant } = require("../controllers/responses");

// Вернуть вакансию по id
router.get("/:id", getJobById);

// Создать отклик
router.post("/", createApplicant);

module.exports = router;
