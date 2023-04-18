const mongoose = require("mongoose");

const auth = new mongoose.Schema({
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
});

module.exports = mongoose.model("Authentication", auth);
