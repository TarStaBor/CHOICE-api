const { celebrate, Joi } = require("celebrate");
// const regExp = require("../regexp/regexp");

// валидация при регистрации
const createUserValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

// валидация при авторизации
const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(6).email(),
    password: Joi.string().required().min(8),
  }),
});

// валидация при
const getJobsValidate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});
// валидация создания вакансии
const createJobValidate = celebrate({
  body: Joi.object().keys({
    company: Joi.string().required().min(2).max(30),
    position: Joi.string().required().min(2).max(30),
    level: Joi.string()
      .required()
      .valid("intern", "junior", "middle", "senior", "lead", "director"),
    tags: Joi.required(),
    note: Joi.string().required().min(2).max(60),
    todo: Joi.string().required().min(2).max(500),
    why: Joi.string().required().min(2).max(500),
  }),

  // files: Joi.object().keys({
  //   logo: Joi.object().keys({
  //     name: Joi.string().required(),
  //     type: Joi.string().required().valid("image/jpeg", "image/png"),
  //     size: Joi.number().required().min(0).max(10485760),
  //   }),
  // }),
});

// // валидация при обновлении информации о пользователе
// const patchUserValidate = celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().min(2).email(),
//     name: Joi.string().required().min(2).max(30),
//   }),
// });

module.exports = {
  createUserValidate,
  loginValidate,
  getJobsValidate,
  createJobValidate,
  // patchUserValidate,
};
