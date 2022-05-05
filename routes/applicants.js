// router создаёт объект, на который мы повесим обработчики
const router = require("express").Router();
// const fileMiddleware = require("../middlewares/multer");
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const {
  getApplicants,
  // deleteApplicants,
  getCountOfApplicants,
  deleteApplicantById,
  patchApplicantComment,
} = require("../controllers/applicants");

// возвращает все сохранённые пользователем фильмы
router.get("/", getApplicants);

// возвращает отклик по id
router.get("/:id", getCountOfApplicants);

// возвращает отклик по id
router.delete("/:id", deleteApplicantById);

// возвращает отклик по id
router.patch("/:id", patchApplicantComment);

// // удаляет сохранённый фильм по id
// router.delete("/:id", deleteApplicants);

module.exports = router;
