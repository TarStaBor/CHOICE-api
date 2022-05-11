const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcrypt");
const errorMessages = require("../utils/error-messages");

const userSchema = new mongoose.Schema(
  {
    // почта пользователя
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: errorMessages.BadEmail,
      },
    },
    // пароль пользователя
    password: {
      type: String,
      required: true,
      select: false,
    },
    // имя пользователя
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Новый пользователь",
    },
  },
  { versionKey: false }
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  // this — это модель User
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(errorMessages.BadEmailOrPassword));
      }
      // сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error(errorMessages.BadEmailOrPassword));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
