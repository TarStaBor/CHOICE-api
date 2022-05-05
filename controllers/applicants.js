const Applicant = require("../models/applicant");
// const Job = require("../models/job");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const errorMessages = require("../utils/error-messages");
const fs = require("fs");

// возвращает все отклики
const getApplicants = (req, res, next) => {
  Applicant.find({})
    // в .job будет хранится название компании, по которой был отклик на случай если в верстке надо будет отобразить название компании
    .populate("job", "company")
    .then((applicants) => res.send(applicants))
    .catch(next);
};

// Получить количество откликов
const getCountOfApplicants = (req, res, next) => {
  const { id } = req.params;
  Applicant.find({ job: id })
    .orFail(new NotFoundError(errorMessages.NotFoundError))
    .then((applicants) => {
      // count = `${applicants.length}`;
      res.send(applicants);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        next(new BadRequestError(errorMessages.BadRequestUser));
      } else {
        next(err);
      }
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
};

// удаляет отклик по id
const deleteApplicantById = (req, res, next) => {
  const { id } = req.params;
  Applicant.findById(id)
    // .orFail(new NotFoundError(errorMessages.NotFoundError))
    .populate("job", "company")
    .then((applicant) => {
      if (applicant.resume) {
        // удаляем папку, содержащуюю документы по откликам на вакансию
        const path = `./public/resumes/${applicant.job.company}/${applicant.job._id}/${id}`;
        console.log(path);
        fs.rmdirSync(path, { recursive: true });
      }
      return applicant
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

// Обновляет комментарий к отклику
const patchApplicantComment = (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;
  Applicant.findByIdAndUpdate(
    id,
    { comment: comment },
    {
      new: true, // обработчик then получит на вход обновлённую запись
    }
  )
    // .orFail(new NotFoundError(errorMessages.NotFoundError))

    .then(() => {
      res.send(comment);
    })

    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(errorMessages.BadRequestUser));
      } else {
        next(err);
      }
    });
};

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
  deleteApplicants,
  deleteApplicantById,
  getCountOfApplicants,
  patchApplicantComment,
};
