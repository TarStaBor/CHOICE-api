const router = require("express").Router();

// TODO: Validation with Joi
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const {
  getApplicants,
  getApplicantsByJobId,
  deleteApplicantById,
  patchApplicantComment,
} = require("../controllers/applicants");

router.get("/", getApplicants);
router.get("/:id", getApplicantsByJobId);
router.delete("/:id", deleteApplicantById);
router.patch("/:id", patchApplicantComment);

module.exports = router;
