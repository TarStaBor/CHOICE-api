// Dotenv анализирует файлы .env, чтобы сделать переменные окружения, хранящиеся в них, доступными
require("dotenv").config();

// Импортируем CORS
const cors = require("cors");

// При получении запроса на бэкенде выполняются стандартные операции:
// определяется тип этого запроса, извлекаются параметры и тело.
// Затем вызывается функция-обработчик, которая соответствует запросу,
// и результат её выполнения возвращается клиенту.
// Для их решения применяем фреймворк Express
const express = require("express");

// Мидлвэр для загрузки файлов
const fileUpload = require("express-fileupload");

// Автоматическое проставление заголовков безопасности
const helmet = require("helmet");

// Чтобы связать JS с документами БД, существуют специальные инструменты —
// Object Document Mapper (У MongoDB он называется Mongoose,
// который осуществляет связь между документами в БД и объектами JS)
const mongoose = require("mongoose");

// Мидлвэр для обработки проверки joi.
const { errors } = require("celebrate");

// Мидлвэр body-parser самостоятельно объединяет все пакеты,
// которые при передаче между клиентом и сервером бьются на блоки (chunk),
// а на принимающей стороне собираются обратно
const bodyParser = require("body-parser");

// Логирование запросов
const morgan = require("morgan");

// Модуль path предоставляет утилиты для работы с путями к файлам и каталогам
const path = require("path");

// Логирование запросов и ошибок
const { requestLogger, errorLogger } = require("./middlewares/logger");

// Добавляем точку входа
const allRouters = require("./routes/index");

// Обработка ошибок, которые небыли перехвачены другими обработчиками
const errorsMiddleware = require("./middlewares/errors");

// Обработка допустимого количества запросов с одного IP
const limiter = require("./middlewares/rateLimit");

const { PORT = 3000 } = process.env;

// создаем приложение методом express
const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());

// для статики
app.use(
  "/companyLogos",
  express.static(path.join(__dirname, "/public/companyLogos"))
);

app.use("/resumes", express.static(path.join(__dirname, "/public/resumes")));

app.use(morgan("dev"));

// для собирания JSON-формата
app.use(bodyParser.json({ limit: "10mb" }));

// для приёма веб-страниц внутри POST-запроса.
// "extended: true" означает, что данные в полученном объекте body
// могут быть любых типов. При значении false, в свойства body могут попасть
// только строки и массивы
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// подключаемся к серверу mongo
mongoose.connect(process.env.db, {
  useNewUrlParser: true,
});

const options = {
  origin: [
    "http://localhost:3005",
    "http://choicejob.ru",
    "https://choicejob.ru",
  ],

  // Разрешенные методы
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,

  // Разрешенные заголовки
  allowedHeaders: [
    "Content-Type",
    "origin",
    "Authorization",
    "multipart/form-data",
  ],
  credentials: true,
};

app.use("*", cors(options));

// логгер запросов
app.use(requestLogger);

// лимит запросов
app.use(limiter);

// запускаем точку входа.
app.use("/", allRouters);

// логгер ошибок. Если запрос не проходит валидацию,
// клиенту отправляется ошибка
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// обработчик ошибок
app.use(errorsMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
