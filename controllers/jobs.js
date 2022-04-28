const Job = require("../models/job");

const { deleteApplicants } = require("../controllers/applicants");

const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const errorMessages = require("../utils/error-messages");
const fs = require("fs");

// возвращает все вакансии
const getJobs = (req, res, next) => {
  Job.find()
    .then((jobs) => res.send(jobs))
    .catch(next);
};

// возвращает вакансию по Id
const getJobById = (req, res, next) => {
  console.log(req.params.id);
  Job.findById(req.params.id)
    .then((job) => res.send(job))
    .catch(next);
};

// создать
const createJob = (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  const { company, position, level, tags, note, todo, why } = req.body;
  let logoPath = req.files.logo;
  logoPath.mv("./uploads/" + logoPath.name);
  let logo = "localhost:3000/uploads/" + logoPath.name;

  console.log(tags);
  Job.create({
    company,
    position,
    level,
    tags,
    logo,
    note,
    todo,
    why,
  })
    .then((job) => {
      console.log(job._id);
      fs.mkdirSync(
        `./resumes/${job.company}/${job._id}`,
        { recursive: true },
        (err) => {}
      );
      res.send(job);
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

// удаляет вакансию по id
const deleteJob = (req, res, next) => {
  const { id } = req.params;
  Job.findById(id)
    // .orFail(new NotFoundError(errorMessages.NotFoundError))
    .then((job) => {
      console.log(`./resumes/${job.company}/${id}`);
      deleteApplicants(id, job.company);
      const path = `./resumes/${job.company}`;
      // удаляем папку, содержащуюю документы по откликам на вакансию
      fs.rmdirSync(path, { recursive: true });
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
  getJobById,
  createJob,
  deleteJob,
};
