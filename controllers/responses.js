const Applicant = require("../models/applicant");
// const Job = require("../models/job");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");
const errorMessages = require("../utils/error-messages");
const fs = require("fs");

// создать отклик
const createApplicant = (req, res, next) => {
  const { date, link, company, jobId } = req.body;
  let resume = "";
  if (req.files) {
    resume = req.files.resume.name;
  }

  const comment = "";

  Applicant.create({
    date,
    link,
    resume: resume,
    job: jobId,
    comment: comment,
    // company: company,
  })
    .then((data) => {
      console.log();
      if (data.resume) {
        req.files.resume.mv(
          `./public/resumes/${company}/${jobId}/${data._id}/${data.resume}`
        );
      }
      res.send({
        title: "Спасибо!",
        subTitle: "Мы получили ваш отклик",
      });
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

module.exports = {
  createApplicant,
};
