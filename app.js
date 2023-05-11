const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");
const auth = require("./routes/auth");
const home = require("./routes/home");
const user = require("./routes/user");
const find = require("./routes/find");

const connectDB = require("./db/connect");
const ejs = require("ejs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cookie());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("view engine", "ejs");

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/auth", auth);
// app.use("/", home);

app.use("/", home);

app.use("/user", user);

app.use("/find",find);

// app.get("/second", (req, res) => {
//   res.render("second", { title: "Home Page" });
// });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI_WRITE);
    app.listen(process.env.PORT, () => {
      console.log(
        "Server Running on port :",
        process.env.PORT
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
