const router = require("express").Router();

// Валидацию с помощью Joi доделать позже
// const {
//   createJobValidate,
//   getJobsValidate,
// } = require("../middlewares/validation");

const { getJobs, createJob, deleteJob } = require("../controllers/jobs");

// Вернуть все вакансии
router.get(
  "/",
  // getJobsValidate,
  getJobs
);

// Создать вакансию
router.post(
  "/",
  // createJobValidate,
  createJob
);

// Удалить вакансию по Id
router.delete("/:id", deleteJob);

module.exports = router;
