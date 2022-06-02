const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },

    position: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },

    level: {
      type: String,
      enum: ["intern", "junior", "middle", "senior", "lead", "director"],
      required: true,
    },

    tags: [
      {
        type: String,
        required: true,
      },
    ],

    logo: {
      type: String,
      required: true,
    },

    note: {
      type: String,
      minlength: 2,
      maxlength: 60,
      required: true,
    },

    todo: {
      type: String,
      minlength: 2,
      maxlength: 500,
      required: true,
    },

    why: {
      type: String,
      minlength: 2,
      maxlength: 500,
      required: true,
    },

    applicants: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("job", jobSchema);
