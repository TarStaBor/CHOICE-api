const mongoose = require("mongoose");
const moment = require("moment/min/moment-with-locales");
// const { isURL } = require("validator");
// const errorMessages = require("../utils/error-messages");
moment.locale("ru");
const applicantSchema = new mongoose.Schema(
  {
    // Ссылка на резюме
    link: {
      type: String,
    },
    // Файл резюме
    resume: {
      type: String,
    },
    // Комментарий об откликнувшемся пользователе
    comment: {
      type: String,
      default: "",
    },
    // Вакансия, по которой отклик
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
  // { versionKey: false }
);

module.exports = mongoose.model("applicant", applicantSchema);
