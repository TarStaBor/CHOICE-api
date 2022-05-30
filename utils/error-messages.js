const errorMessages = {
  BadEmailOrName:
    "Ошибка: Переданы некорректные данные при создании или обновлении профиля",
  DuplicateEmail: "Ошибка: Пользователь с такой почтой уже зарегистрирован",
  BadEmailOrPassword: "Ошибка: Неправильные почта или пароль",
  BadResponseRequestError: "Ошибка: Отклик не отправлен",
  BadAddJobRequestError: "Ошибка: Вакансия не создана",
  NotFoundJobError: "Ошибка: Вакансия не найдена",
  NotFoundApplicantError: "Ошибка: Отклик не найден",
  BadRequestJobId: "Ошибка: Передан невалидный id вакансии",
  BadRequestApplicantId: "Ошибка: Передан невалидный id отклика",
  NotFoundUser: "Ошибка: Пользователь не найден",
  RegistrationIsDisabled: "Ошибка: Регистрация отключена",
  NotFoundPage: "Ошибка: Ресурс не найден!!!",
  ServerError: "Ошибка: На сервере произошла ошибка",
  BadUrl: "Неправильный формат URL",
  BadEmail: "Ошибка: Неправильный формат почты",
  AuthorizationError: "Ошибка: Необходима авторизация",
};

module.exports = errorMessages;
