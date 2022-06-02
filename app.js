require("dotenv").config();

const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const allRouters = require("./routes/index");
const errorsMiddleware = require("./middlewares/errors");
const limiter = require("./middlewares/rateLimit");

const { PORT = 3000 } = process.env;

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

app.use(
  "/companyLogos",
  express.static(path.join(__dirname, "/public/companyLogos"))
);

app.use("/resumes", express.static(path.join(__dirname, "/public/resumes")));

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "10mb" }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(process.env.db, {
  useNewUrlParser: true,
});

const options = {
  origin: [
    "http://localhost:3005",
    "http://choicejobs.ru",
    "https://choicejobs.ru",
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
app.use(requestLogger);
app.use(limiter);
app.use("/", allRouters);
app.use(errorLogger);
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
