const errorMessages = {
  BadEmailOrName:
    "Ошибка: Переданы некорректные данные при создании или обновлении профиля",
  DuplicateEmail: "Ошибка: Пользователь с такой почтой уже зарегистрирован",
  BadEmailOrPassword: "Ошибка: Неправильные почта или пароль",
  SuccessResponse: "Отклик получен",
  BadResponseRequestError: "Ошибка: Отклик не отправлен",
  BadAddJobRequestError: "Ошибка: Вакансия не создана",
  NotFoundJobError: "Ошибка: Вакансия не найдена",
  NotFoundApplicantError: "Ошибка: Отклик не найден",
  SuccessJobDelete: "Вакансия удалена",
  SuccessApplicantDelete: "Отклик удален",
  SuccessCommentUpdate: "Комментарий успешно обновлен",
  BadRequestJobId: "Ошибка: Передан невалидный id вакансии",
  BadRequestApplicantId: "Ошибка: Передан невалидный id отклика",
  NotFoundUser: "Ошибка: Пользователь не найден",
  NotFoundPage: "Ошибка: Ресурс не найден!!!",
  ServerError: "Ошибка: На сервере произошла ошибка",
  BadUrl: "Неправильный формат URL",
  BadEmail: "Ошибка: Неправильный формат почты",
  AuthorizationError: "Ошибка: Необходима авторизация",
};

module.exports = errorMessages;
