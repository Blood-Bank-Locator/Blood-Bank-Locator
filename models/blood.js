const mongoose = require("mongoose");

const blood = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "this is the id of the document"],
  },
  "a+": {
    type: Number,
    required: true,
  },
  "a-": {
    type: Number,
    required: true,
  },
  "b+": {
    type: Number,
    required: true,
  },
  "b-": {
    type: Number,
    required: true,
  },
  "o+": {
    type: Number,
    required: true,
  },
  "o-": {
    type: Number,
      required: true,
  },
  "ab+": {
    type: Number,
    required: true,
  },
  "ab-": {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Blood", blood);
