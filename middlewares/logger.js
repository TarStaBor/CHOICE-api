//  Для Node.js существует множество модулей логирования, но мы
// остановимся на одном — winston — он гибкий и его просто настраивать.
// Для winston существует специализированный модуль-обёртка express-winston,
// который упрощает подключение логера к Express. С ним подключение логера
// в Express реализуется несколькими строками кода, после добавления которых
// мы получаем детальную информацию о работе сервиса.
const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
