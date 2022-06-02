const fs = require("fs");
const Applicant = require("../models/applicant");
const Job = require("../models/job");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const errorMessages = require("../utils/error-messages");
const messages = require("../utils/messages");

const getApplicants = (req, res, next) => {
  Applicant.find({})
    .populate("job", "company")
    .then((applicants) => {
      res.send(applicants);
    })
    .catch(next);
};

const getApplicantsByJobId = (req, res, next) => {
  const { id } = req.params;
  Applicant.find({ job: id })
    .populate("job", "company")
    .orFail(new NotFoundError(errorMessages.NotFoundJobError))
    .then((applicants) => {
      res.send(applicants);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(errorMessages.BadRequestJobId));
      } else {
        next(err);
      }
    });
};

const deleteApplicantById = (req, res, next) => {
  const { id } = req.params;
  Applicant.findById(id)
    .orFail(new NotFoundError(errorMessages.NotFoundApplicantError))
    .populate("job", "company")
    .then((applicant) => {
      if (applicant.resume) {
        const path = `./public/resumes/${applicant.job.company}/${
          applicant.job._id
        }/${id}.${applicant.resume.split(".").pop()}`;
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Файл удалён");
          }
        });
      }

      Job.findByIdAndUpdate(
        applicant.job._id,
        { $inc: { applicants: -1 } },
        { new: true }
      )
        .orFail(new NotFoundError(errorMessages.NotFoundJobError))
        .then((updateJob) => {
          console.log(updateJob);
        })
        .catch((err) => {
          console.log(err);
        });

      return applicant
        .remove()
        .then(res.send({ message: messages.SuccessApplicantDelete }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(errorMessages.BadRequestApplicantId));
      } else {
        next(err);
      }
    });
};

const patchApplicantComment = (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;
  Applicant.findByIdAndUpdate(
    id,
    { comment },
    {
      new: true,
    }
  )
    .orFail(new NotFoundError(errorMessages.NotFoundApplicantError))
    .then(() => {
      res.send(comment);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(errorMessages.BadRequestApplicantId));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getApplicants,
  deleteApplicantById,
  getApplicantsByJobId,
  patchApplicantComment,
};
