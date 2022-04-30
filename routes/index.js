const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const usersRouter = require("./users");
const jobsRouter = require("./jobs");
const applicantsRouter = require("./applicants");
const response = require("./response");
const errorsRouter = require("./errors");
const auth = require("../middlewares/auth");
const {
  createUserValidate,
  loginValidate,
} = require("../middlewares/validation");

// регистрация
router.post("/signup", createUserValidate, createUser);

// авторизация
router.post("/signin", loginValidate, login);

// получение отклика
router.use("/response", response);

router.use(auth);

// пользователи
router.use("/users", usersRouter);

// вакансии
router.use("/jobs", jobsRouter);
router.use("/applicants", applicantsRouter);

// отсутствующие роуты
router.use("*", errorsRouter);

module.exports = router;
