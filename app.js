require("dotenv").config({ path: "ENV_FILENAME" });
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const bodyParser = require("body-parser");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const allRouters = require("./routes/index");
const errorsMiddleware = require("./middlewares/errors");
const devConfig = require("./utils/devConfig");
const limiter = require("./middlewares/rateLimit");

const { dbSrc, NODE_ENV } = process.env;
const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === "production" ? dbSrc : devConfig.dbDev, {
  useNewUrlParser: true,
});

const options = {
  origin: [
    "http://localhost:3000",
    "http://film-explorer.nomoredomains.rocks",
    "https://film-explorer.nomoredomains.rocks",
    // 'https://YOUR.github.io',
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "origin", "Authorization"],
  credentials: true,
};
app.use("*", cors(options));

// логгер запросов
app.use(requestLogger);

// лимит запросов
app.use(limiter);

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
