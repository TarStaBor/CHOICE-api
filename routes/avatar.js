const fileMiddleware = require("../middlewares/multer");

const router = require("express").Router();
// const { createMovieValidate, getMoviesValidate } = require('../middlewares/validation');

const { uploadLogo } = require("../controllers/avatar");

// router.post("/upload", fileMiddleware.single("avatar"), uploadLogo);
router.post("/", fileMiddleware.single("avatar"), uploadLogo);

module.exports = router;
