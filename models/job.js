const mongoose = require("mongoose");
const { isURL } = require("validator");
const errorMessages = require("../utils/error-messages");

const jobSchema = new mongoose.Schema(
  {
    // Должность
    position: {
      type: String,
      required: true,
    },
    // логотип (бывш image)
    logo: {
      type: String,
      required: true,
      //   validate: {
      //     validator: (v) => isURL(v),
      //     message: errorMessages.BadUrl,
      //   },
    },
    // Количество откликов
    applicants: {
      type: Number,
      required: true,
    },
    // Комментарий
    note: {
      type: String,
      required: true,
    },
    // Название компании работодателя
    company: {
      type: String,
      required: true,
    },
    // Необходимый уровень кандидата
    level: {
      type: String,
      required: true,
    },
    // Id вакансии
    jobId: {
      type: Number,
      required: true,
    },
    // Тэг вакансии
    tag: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("job", jobSchema);
