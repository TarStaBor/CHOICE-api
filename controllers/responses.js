const Applicant = require("../models/applicant");
const Job = require("../models/job");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const errorMessages = require("../utils/error-messages");
const messages = require("../utils/messages");

const getJobById = (req, res, next) => {
  Job.findById(req.params.id)
    .orFail(new NotFoundError(errorMessages.NotFoundError))
    .then((job) => res.send(job))
    .catch(next);
};

const createApplicant = (req, res, next) => {
  const { link, company, jobId } = req.body;

  let resume = "";
  if (req.files) {
    resume = req.files.resume.name;
  }
  Applicant.create({
    link,
    resume,
    job: jobId,
  })
    .then((data) => {
      if (data.resume) {
        const extention = data.resume.split(".").pop();
        req.files.resume.mv(
          `./public/resumes/${company}/${jobId}/${data._id}.${extention}`
        );
      }
      Job.findByIdAndUpdate(
        jobId,
        { $inc: { applicants: 1 } },
        {
          new: true,
        }
      )
        .orFail(new NotFoundError(errorMessages.NotFoundJobError))
        .then((updateJob) => {
          console.log(updateJob);
        })
        .catch((err) => {
          console.log(err);
        });

      res.send({ message: messages.SuccessResponse });
    })
    .catch((err) => {
      console.log(err.message);
      if (err.name === "ValidationError") {
        next(new BadRequestError(errorMessages.BadResponseRequestError));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getJobById,
  createApplicant,
};
