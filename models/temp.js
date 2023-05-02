const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "this is the id of the document"],
    },
    contact: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    blood_bank_name: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      required: true,
    },

    valid_till: {
      type: Date,
      required: true,
    },

    valid_from: {
      type: Date,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 360,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Temp", Schema);
