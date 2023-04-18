const mongoose = require("mongoose");
const connectionString = "";

const connectDB = (url) => {
  return mongoose.connect(url, {
    keepAlive: true,
  });
};

module.exports = connectDB;
