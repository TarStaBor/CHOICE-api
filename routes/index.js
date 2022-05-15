const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const usersRouter = require("./users");
const jobsRouter = require("./jobs");
const applicantsRouter = require("./applicants");
const response = require("./response");
const errorsRouter = require("./errors");
const auth = require("../middlewares/auth");

// Валидацию с помощью Joi доделать позже
// const {
//   createUserValidate,
//   loginValidate,
// } = require("../middlewares/validation");

// Регистрация
router.post(
  "/signup",
  // createUserValidate,
  createUser
);

// Авторизация
router.post(
  "/signin",
  //  loginValidate,
  login
);

// Получить отклик
router.use("/response", response);

// Пользователи
router.use("/users", auth, usersRouter);

// Вакансии
router.use("/jobs", auth, jobsRouter);

// Отклики
router.use("/applicants", auth, applicantsRouter);

// Отсутствующие роуты
router.use("*", errorsRouter);

module.exports = router;
