const mongoose = require("mongoose");

const blood = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "this is the id of the document"],
  },
  blood: {
    a: {
      pos: {
        type: Number,
        required: true,
      },
      neg: {
        type: Number,
        required: true,
      },
    },
    b: {
      pos: {
        type: Number,
        required: true,
      },
      neg: {
        type: Number,
        required: true,
      },
    },
    o: {
      pos: {
        type: Number,
        required: true,
      },
      neg: {
        type: Number,
        required: true,
      },
    },
    ab: {
      pos: {
        type: Number,
        required: true,
      },
      neg: {
        type: Number,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("Blood", blood);
