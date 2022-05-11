const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    // Название компании работодателя
    company: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    // Должность
    position: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    // Необходимый уровень кандидата
    level: {
      type: String,
      enum: ["intern", "junior", "middle", "senior", "lead", "director"],
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
      minlength: 2,
      maxlength: 60,
      required: true,
    },

    // Что делать
    todo: {
      type: String,
      minlength: 2,
      maxlength: 500,
      required: true,
    },

    // Почему
    why: {
      type: String,
      minlength: 2,
      maxlength: 500,
      required: true,
    },

    // Количество откликов
    applicants: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("job", jobSchema);
