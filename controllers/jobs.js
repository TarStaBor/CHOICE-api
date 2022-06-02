const fs = require("fs");
const Job = require("../models/job");
const Applicant = require("../models/applicant");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const errorMessages = require("../utils/error-messages");
const messages = require("../utils/messages");

const getJobs = (req, res, next) => {
  Job.find({})
    .then((jobs) => res.send(jobs))
    .catch(next);
};

const createJob = (req, res, next) => {
  const { company, position, level, tags, note, todo, why } = req.body;
  const logoPath = req.files.logo;
  logoPath.mv(`./public/companyLogos/${logoPath.name}`);
  const logo = `${process.env.DOMAIN}/companyLogos/${logoPath.name}`;
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
      fs.mkdirSync(
        `./public/resumes/${job.company}/${job._id}`,
        { recursive: true },
        (err) => {
          console.log(err);
        }
      );
      res.send(job);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(errorMessages.BadAddJobRequestError));
      } else {
        next(err);
      }
    });
};

const deleteJob = (req, res, next) => {
  const { id } = req.params;
  Job.findById(id)
    .orFail(new NotFoundError(errorMessages.NotFoundJobError))
    .then((job) => {
      Applicant.deleteMany({ job: id })
        .orFail(new NotFoundError(errorMessages.NotFoundJobError))
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      const path = `./public/resumes/${job.company}`;
      fs.rmdirSync(path, { recursive: true });
      return job
        .remove()
        .then(res.send({ message: messages.SuccessJobDelete }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(errorMessages.BadRequestJobId));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getJobs,
  createJob,
  deleteJob,
};
