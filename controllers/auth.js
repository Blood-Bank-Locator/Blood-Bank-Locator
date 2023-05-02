const path = require("path");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Authentication = require("../models/auth");
const License = require("../models/license.js");
const Temp = require("../models/temp");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const { transport, createMailOptions } = require("./nodemailer");
const { log } = require("console");
const auth = require("../models/auth");

// ****************** Login *********************** // 
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const doc = await Authentication.findById(email);
  if (!doc) {
    console.log("email not exist");
    return res
      .status(200)
      .json({ success: false, login: false, signup: false, msg: "email not exist" });
  }

  if (await bcrypt.compare(password, doc.password)) {
    const token = jwt.sign({ user: doc._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ success: true, login: true, signup: false, token: token });
  }

  console.log("wrong password");
  res.status(200).json({ success: false, login: false, signup: false, msg: "wrong password" });
};


// ****************** Signup *********************** //
const signup = async (req, res) => {
  const { blood_bank_name, email, contact, license_number, valid_from, valid_till, password } =
    req.body;
  console.log(req.body);
  const user = await Authentication.findOne({ _id: email });
  if (user) {
    return res.status(400).json({
      sucsess: false,
      msg: "user already registered!!!",
    });
  }
  const otp = otpGenerator.generate(6, {
    digit: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(otp);
  const hashOtp = await bcrypt.hash(otp, salt);
  const hashPass = await bcrypt.hash(password, salt);
  const hashLicense = await bcrypt.hash(license_number, salt);
  const tempInput = {
    _id: email,
    contact: contact,
    password: hashPass,
    blood_bank_name: blood_bank_name,
    license: hashLicense,
    valid_till: valid_till,
    valid_from: valid_from,
    otp: hashOtp,
  };
  const doc = await Temp.findOne({ _id: email });
  if (doc) {
    await Temp.updateOne({ _id: email }, { otp: hashOtp });
  } else {
    const data = new Temp(tempInput);
    await data.save();
  }
  const mailoptions = createMailOptions(req.body.email, otp);
  transport.sendMail(mailoptions, (err, info) => {
    if (err) {
      return res.status(404).json({
        success: false,
        err: err,
        msg: "unable to send otp",
      });
    } else {
      console.log("Email sended :" + info.response);
      return res
        .status(200)
        .sendFile("otpverification.html", { root: path.resolve(__dirname + "/../public") });
    }
  });
};

// ****************** Verify *********************** //
const verify = async (req, res) => {
  console.log("otp verify");
  const { email, otp } = req.body;
  console.log(req.body);
  const doc = await Temp.findOne({ _id: email });
  if (!doc)
    return res.status(200).json({
      success: true,
      msg: "Your Otp is expired!!",
    });
  console.log(doc);
  const otp_checked = await bcrypt.compare(otp, doc.otp);
  if (email === doc._id && otp_checked) {
    const auth = new Authentication({
      _id: doc._id,
      blood_bank_name: doc.blood_bank_name,
      contact: doc.contact,
      password: doc.password,
    });

    await auth.save();

    const license = new License({
      _id: doc._id,
      license: doc.license,
      valid_from: doc.valid_from,
      valid_till: doc.valid_till,
    });

    await license.save();

    res.status(200).json({
      success: true,
      msg: "Otp Verified and user saved",
    });
  } else {
    res.status(401).json({
      success: false,
      msg: "Either otp or email is wrong",
    });
  }
};
module.exports = { login, signup, verify };
