const mongoose = require("mongoose");

const license = new mongoose.Schema({
  _id: {
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
});

module.exports = mongoose.model("License", license);
