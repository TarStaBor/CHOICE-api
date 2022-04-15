const Applicant = require("../models/applicant");
// const Job = require("../models/job");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const errorMessages = require("../utils/error-messages");

// возвращает все вакансии
const getApplicants = (req, res, next) => {
  Applicant.find()
    .then((jobs) => res.send(jobs))
    .catch(next);
};

// создать
const createApplicant = (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  const { date, link, company, jobId } = req.body;
  let resumePath = req.files.resume;
  resumePath.mv(`./resumes/${company}/${jobId}/${resumePath.name}`);
  let resume = "localhost:3000/resume/" + resumePath.name;

  Applicant.create({
    date,
    link,
    resume,
    job: jobId,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        // next(new BadRequestError(errorMessages.BadRequestError));
        next(new BadRequestError(err));
      } else {
        next(err);
      }
    });
};

// Получить количество откликов
const getCountOfApplicants = (req, res, next) => {
  const { id } = req.params;
  let count;
  Applicant.find({ job: id })
    .orFail(new NotFoundError(errorMessages.NotFoundError))
    .then((applicants) => {
      count = `${applicants.length}`;
      res.send(count);
    })
    .catch((err) => {
      count = "0";
      res.send(count);
      // if (err.name === "CastError") {
      //   next(new BadRequestError(errorMessages.BadRequestUser));
      // } else {
      //   next(err);
      // }
    });
};

// удаляет отклики по id вакансии
const deleteApplicants = (req, res, next) => {
  const id = req;
  Applicant.deleteMany({ job: id })
    .then((res) => {
      console.log(res + " все хорошо");
    })
    .catch((err) => {
      console.log(err);
    });

  // .orFail(new NotFoundError(errorMessages.NotFoundError))
  // .then((job) => {
  //   return job
  //     .remove()
  //     .then(res.send({ message: errorMessages.SuccessDelete }));
  // })
  // .catch((err) => {
  //   if (err.name === "CastError") {
  //     next(new BadRequestError(errorMessages.BadRequestUser));
  //   } else {
  //     next(err);
  //   }
  // });
};

// возвращает вакансию по Id
// const getJobById = (req, res, next) => {
//   console.log(req.params.id);
//   Job.findById(req.params.id)
//     .then((job) => res.send(job))
//     .catch(next);
// };

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
  getApplicants,
  createApplicant,
  deleteApplicants,
  getCountOfApplicants,
};
