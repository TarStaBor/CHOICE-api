const router = require("express").Router();
// const fileMiddleware = require("../middlewares/multer");
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const {
  getApplicants,
  createApplicant,
  // deleteApplicants,
  getCountOfApplicants,
} = require("../controllers/applicants");

// возвращает все сохранённые пользователем фильмы
router.get("/", getApplicants);

// возвращает отклик по id
router.get("/:id", getCountOfApplicants);

// создаёт фильм с переданными в теле данными
router.post("/", createApplicant);

// // удаляет сохранённый фильм по id
// router.delete("/:id", deleteApplicants);

module.exports = router;
