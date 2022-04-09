const Job = require("../models/job");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const errorMessages = require("../utils/error-messages");

// возвращает все вакансии
const getJobs = (req, res, next) => {
  Job.find()
    .then((jobs) => res.send(jobs))
    .catch(next);
};

// создать
const createJob = (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  const { company, position, level, tag, note, todo, why } = req.body;
  const applicants = 0;
  let logoPath = req.files.logo;
  logoPath.mv("./uploads/" + logoPath.name);
  let logo = "localhost:3000/uploads/" + logoPath.name;

  console.log(tag);
  Job.create({
    company,
    position,
    level,
    tag,
    logo,
    note,
    todo,
    why,
    applicants,
  })
    .then((job) => res.send(job))
    .catch((err) => {
      if (err.name === "ValidationError") {
        // next(new BadRequestError(errorMessages.BadRequestError));
        next(new BadRequestError(err));
      } else {
        next(err);
      }
    });
};

// удаляет вакансию по id
const deleteJob = (req, res, next) => {
  const { id } = req.params;
  Job.findById(id)
    .orFail(new NotFoundError(errorMessages.NotFoundError))
    .then((job) => {
      return job
        .remove()
        .then(res.send({ message: errorMessages.SuccessDelete }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(errorMessages.BadRequestUser));
      } else {
        next(err);
      }
    });
};

// загружает изображение
// const uploadLogo = (req, res, next) => {
//   try {
//     if (req.file) {
//       res.json(req.file);
//     }
//   } catch (err) {
//     if (err.name === "CastError") {
//       next(new BadRequestError(errorMessages.BadRequestUser));
//     } else {
//       next(err);
//     }
//   }
// };

module.exports = {
  getJobs,
  createJob,
  deleteJob,
  // uploadLogo,
};
