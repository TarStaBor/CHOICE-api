// router создаёт объект, на который мы повесим обработчики
const router = require("express").Router();
// const fileMiddleware = require("../middlewares/multer");
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const { getJobs, createJob, deleteJob } = require("../controllers/jobs");

// возвращает все сохранённые пользователем фильмы
router.get("/", getJobs);

// создаёт фильм с переданными в теле данными
router.post("/", createJob);

// удаляет сохранённый фильм по id
router.delete("/:id", deleteJob);

module.exports = router;
