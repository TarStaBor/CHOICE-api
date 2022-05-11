// Dotenv анализирует файлы .env, чтобы сделать переменные окружения, хранящиеся в них, доступными
require("dotenv").config({ path: "ENV_FILENAME" });

// При получении запроса на бэкенде выполняются стандартные операции:
// определяется тип этого запроса, извлекаются параметры и тело.
// Затем вызывается функция-обработчик, которая соответствует запросу,
// и результат её выполнения возвращается клиенту.
// Для их решения применяем фреймворк Express (router, middlewear, BodyParser)
const express = require("express");

// Мидлвэр для загрузки файлов
const fileUpload = require("express-fileupload");

// Импортируем CORS
const cors = require("cors");

// Автоматическое проставление заголовков безопасности
const helmet = require("helmet");

// Чтобы подружить JS с документами, существуют специальные инструменты — ODM,
// или Object Document Mapper (англ. «сопоставитель объектов и документов»).
// У MongoDB он называется Mongoose и представляет собой мост между двумя мирами:
// миром документов в базе данных имиром объектов JavaScript.
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

const devConfig = require("./utils/devConfig");

// Обработка допустимого количества запросов с одного IP
const limiter = require("./middlewares/rateLimit");

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

// Вытаскиваем из .env
const { dbSrc, NODE_ENV } = process.env;

const { PORT = 3000 } = process.env;

// для статики
// Делаем папки companyLogos и resumes внутри папки public статичными.
// Возможно достаточно сделать публичной только папку public.
app.use(
  "/companyLogos",
  express.static(path.join(__dirname, "/public/companyLogos"))
);

app.use("/resumes", express.static(path.join(__dirname, "/public/resumes")));

app.use(morgan("dev"));

// для собирания JSON-формата
app.use(bodyParser.json());

// для приёма веб-страниц внутри POST-запроса.
// "extended: true" означает, что данные в полученном объекте body
// могут быть любых типов. При значении false, в свойства body могут попасть
// только строки и массивы
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === "production" ? dbSrc : devConfig.dbDev, {
  useNewUrlParser: true,
  // Эти объекты опций должны быть что бы не возникло проблем с совместимостью,
  // но если их включить, проблемы возникают )
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const options = {
  // В заголовок Access-Control-Allow-Origin можно записать либо один URL,
  // либо сразу все. Иногда нужно разрешить кросс-доменные запросы с нескольких
  // ресурсов, но не всех. Например, с локального сервера и продакшн-сайта.
  // У любого запроса есть заголовок Origin (const { origin } = req.headers;).
  // Он содержит адрес, с которого идёт этот запрос.
  origin: [
    "http://localhost:3005",
    // "http://film-explorer.nomoredomains.rocks",
    // "https://film-explorer.nomoredomains.rocks",
    // 'https://YOUR.github.io',
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
  console.log(PORT);
});
