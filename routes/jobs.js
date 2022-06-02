const router = require("express").Router();

// TODO: Validation with Joi
// const {
//   createJobValidate,
//   getJobsValidate,
// } = require("../middlewares/validation");

const { getJobs, createJob, deleteJob } = require("../controllers/jobs");

router.get(
  "/",
  // getJobsValidate,
  getJobs
);

router.post(
  "/",
  // createJobValidate,
  createJob
);

router.delete("/:id", deleteJob);

module.exports = router;
