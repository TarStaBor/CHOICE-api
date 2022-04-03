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

// создаёт вакансию
const createJob = (req, res, next) => {
  const { position, logo, applicants, note, company, level, jobId, tag } =
    req.body;
  Job.create({
    position,
    logo,
    applicants,
    note,
    company,
    level,
    jobId,
    tag,
  })
    .then((job) => res.send(job))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(errorMessages.BadRequestError));
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
