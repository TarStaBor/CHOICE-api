const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
// const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");
const BadRequestError = require("../errors/bad-request-err");
const ConflictError = require("../errors/conflict-err");
const UnauthorizedError = require("../errors/unauthorized-err");
const errorMessages = require("../utils/error-messages");

const createUser = (req, res, next) => {
  if (!process.env.REGISTRATION) {
    throw new ForbiddenError(errorMessages.RegistrationIsDisabled);
  }
  const { name, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then(() => res.send({ email, name }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(errorMessages.BadEmailOrName));
      } else if (err.code === 11000) {
        next(new ConflictError(errorMessages.DuplicateEmail));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

// TODO: patch User
// const patchUser = (req, res, next) => {
//  User.findByIdAndUpdate(
//    req.user._id,
//    { name: req.body.name, email: req.body.email },
//    { new: true, runValidators: true }
//  )
//    .then((user) => {
//      if (user) {
//        return res.send({ email: user.email, name: user.name });
//      }
//      throw new NotFoundError(errorMessages.NotFoundUser);
//    })
//    .catch((err) => {
//      if (err.name === "ValidationError") {
//        next(new BadRequestError(errorMessages.BadEmailOrName));
//      } else if (err.code === 11000) {
//        next(new ConflictError(errorMessages.DuplicateEmail));
//      } else {
//        next(err);
//      }
//    });
// };

module.exports = {
  getUserMe,
  // patchUser,
  createUser,
  login,
};
