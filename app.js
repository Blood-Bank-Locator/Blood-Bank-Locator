const express = require("express");
const auth = require("./routes/auth");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", auth);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI_WRITE);
    // await connectDB(process.env.MONGO_URI_READ);
    app.listen(process.env.PORT, () => {
      console.log(
        "Server running on port :",
        process.env.PORT
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
module.exports = { app };
