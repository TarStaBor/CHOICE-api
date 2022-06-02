const router = require("express").Router();

// TODO: Validation with Joi
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const { getJobById, createApplicant } = require("../controllers/responses");

router.get("/:id", getJobById);
router.post("/", createApplicant);

module.exports = router;
