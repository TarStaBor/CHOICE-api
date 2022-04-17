const mongoose = require("mongoose");
const { isURL } = require("validator");
const errorMessages = require("../utils/error-messages");

const applicantSchema = new mongoose.Schema(
  {
    // Название отклика
    date: {
      type: String,
      required: true,
    },
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
    },
    // Компания, по которой был отклик
    company: {
      type: String,
      required: true,
    },
    // Вакансия, по которой отклик
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("applicant", applicantSchema);
