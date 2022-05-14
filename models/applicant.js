const mongoose = require("mongoose");
// const { isURL } = require("validator");
// const errorMessages = require("../utils/error-messages");

const applicantSchema = new mongoose.Schema(
  {
    // Ссылка на резюме
    link: {
      type: String,
      // validate: {
      //   validator: (v) => isURL(v),
      //   message: errorMessages.BadUrl,
      // },
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
);

module.exports = mongoose.model("applicant", applicantSchema);
