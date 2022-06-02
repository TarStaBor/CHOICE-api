const mongoose = require("mongoose");
// const { isURL } = require("validator");
// const errorMessages = require("../utils/error-messages");

const applicantSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      // TODO: Validate
      // validate: {
      //   validator: (v) => isURL(v),
      //   message: errorMessages.BadUrl,
      // },
    },

    resume: {
      type: String,
    },

    comment: {
      type: String,
      default: "",
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("applicant", applicantSchema);
