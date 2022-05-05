require("dotenv").config({ path: "ENV_FILENAME" });

// При получении запроса на бэкенде выполняются стандартные операции: определяется тип этого запроса, извлекаются параметры и тело. Затем вызывается функция-обработчик, которая соответствует запросу, и результат её выполнения возвращается клиенту. Это задачи, с которыми разработчик сталкивается регулярно, поэтому для их решения применяют специальный веб-фреймворк — Express.
const express = require("express");

const fileUpload = require("express-fileupload"); //2
const cors = require("cors"); //3

// const helmet = require("helmet");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const bodyParser = require("body-parser"); //4
const morgan = require("morgan"); //5
const _ = require("lodash"); //6
const { requestLogger, errorLogger } = require("./middlewares/logger");
const allRouters = require("./routes/index");
const errorsMiddleware = require("./middlewares/errors");
const devConfig = require("./utils/devConfig");
const limiter = require("./middlewares/rateLimit");

const app = express();
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors()); //если дубль - удалить

// ХЗ что тут. Тема "Переменные окружения"
const { dbSrc, NODE_ENV } = process.env;
const { PORT = 3000 } = process.env;
//const port = process.env.PORT || 3000;

// app.use(helmet());
const path = require("path"); //для статики
app.use(
  "/companyLogos",
  express.static(path.join(__dirname, "/public/companyLogos"))
);
app.use("/resumes", express.static(path.join(__dirname, "/public/resumes")));

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === "production" ? dbSrc : devConfig.dbDev, {
  useNewUrlParser: true,
});

const options = {
  origin: [
    "http://localhost:3005",
    "http://film-explorer.nomoredomains.rocks", //есть
    "https://film-explorer.nomoredomains.rocks", //есть
    // 'https://YOUR.github.io', //есть
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
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

// app.use("/api", require("./routes/upload.route"));

app.use("/", allRouters);

// логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// обработчик ошибок
app.use(errorsMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
