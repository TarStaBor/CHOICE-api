const mongoose = require("mongoose");
const { isURL } = require("validator");
const errorMessages = require("../utils/error-messages");

const jobSchema = new mongoose.Schema(
  {
    // Название компании работодателя
    company: {
      type: String,
      required: true,
    },
    // Должность
    position: {
      type: String,
      required: true,
    },
    // Необходимый уровень кандидата
    level: {
      type: String,
      enum: ["intern", "junior", "middle", "senior", "lead", "lead"],
      required: true,
    },
    // Тэги вакансии
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    // логотип
    logo: {
      type: String,
      required: true,
    },
    // Комментарий
    note: {
      type: String,
      required: true,
    },

    // Что делать
    todo: {
      type: String,
      required: true,
    },

    // Почему
    why: {
      type: String,
      required: true,
    },

    // Количество откликов
    applicants: {
      type: Number,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("job", jobSchema);
