// router создаёт объект, на который мы повесим обработчики
const router = require("express").Router();
// const fileMiddleware = require("../middlewares/multer");
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const {
  getApplicants,
  getApplicantsByJobId,
  deleteApplicantById,
  patchApplicantComment,
} = require("../controllers/applicants");

// вернуть все отклики
router.get("/", getApplicants);

// вернуть количество откликов по вакансии (Доделать)
router.get("/:id", getApplicantsByJobId);

// удалить отклик по ID
router.delete("/:id", deleteApplicantById);

// изменить комментарий отклика
router.patch("/:id", patchApplicantComment);

module.exports = router;
