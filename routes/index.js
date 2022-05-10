// router создаёт объект, на который мы повесим обработчики
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

// Так как мы добавили auth нужным роутам вторым параметрам,
// устанавливать router.use(auth) нет необходимости
// router.use(auth);

// Пользователи
router.use("/users", auth, usersRouter);

// Вакансии
router.use("/jobs", auth, jobsRouter);

// Отклики
router.use("/applicants", auth, applicantsRouter);

// Отсутствующие роуты
router.use("*", errorsRouter);

module.exports = router;
