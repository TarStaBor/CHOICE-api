const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const usersRouter = require("./users");
const jobsRouter = require("./jobs");
const applicantsRouter = require("./applicants");
const response = require("./response");
const errorsRouter = require("./errors");
const auth = require("../middlewares/auth");

// TODO: Validation with Joi
// const {
//   createUserValidate,
//   loginValidate,
// } = require("../middlewares/validation");

router.post(
  "/signup",
  // createUserValidate,
  createUser
);

router.post(
  "/signin",
  //  loginValidate,
  login
);

router.use("/response", response);
router.use("/users", auth, usersRouter);
router.use("/jobs", auth, jobsRouter);
router.use("/applicants", auth, applicantsRouter);
router.use("*", errorsRouter);

module.exports = router;
