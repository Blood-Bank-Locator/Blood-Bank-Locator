const mongoose = require("mongoose");

const address = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  address: {
    type:String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city:{
    type:String,
    required:true,
  }
})

module.exports = mongoose.model("Address" , address);