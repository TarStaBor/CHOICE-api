require("dotenv").config({ path: "ENV_FILENAME" });
const express = require("express"); //1
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
const { dbSrc, NODE_ENV } = process.env;

// app.use(helmet());
// app.use(express.json({ extended: true })); // все запросы в формате json
const path = require("path"); //для статики
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/resumes", express.static(path.join(__dirname, "resumes")));

// app.use(express.static("uploads"));
// enable files upload

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === "production" ? dbSrc : devConfig.dbDev, {
  useNewUrlParser: true,
});

const options = {
  origin: "http://localhost:3005",
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
const { PORT = 3000 } = process.env; //const port = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
