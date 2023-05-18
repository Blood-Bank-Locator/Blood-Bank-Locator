const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const Authentication = require("../models/auth");
const License = require("../models/license.js");
const Temp = require("../models/temp");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const {
  transport,
  createMailOptionsOTP,
  createMailOptionsForgetPass,
} = require("./nodemailer");
const auth = require("../models/auth");

// ****************** Login *********************** //
const login = async (req, res) => {
  const { email, password } = req.body;
  const doc = await Authentication.findById(email);
  if (!doc) {
    console.log("email not exist");
    return res.status(200).json({
      success: false,
      login: false,
      signup: false,
      msg: "email not exist",
    });
  }

  if (await bcrypt.compare(password, doc.password)) {
    const token = jwt.sign(
      { user: doc._id },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    res.cookie("token", token, { httpOnly: true });
    console.log("sending Data");
    return res.json({
      success: true,
      login: true,
      signup: false,
      token: token,
    });
  } else {
    console.log("wrong password");
    return res.status(200).json({
      success: false,
      login: false,
      signup: false,
      msg: "wrong password",
    });
  }
};

// ****************** Signup *********************** //
const signup = async (req, res) => {
  const {
    blood_bank_name,
    email,
    contact,
    license_number,
    valid_from,
    valid_till,
    password,
  } = req.body;
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
  const tempInput = {
    _id: email,
    contact: contact,
    password: hashPass,
    blood_bank_name: blood_bank_name,
    license: license_number,
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
  const mailoptions = createMailOptionsOTP(
    req.body.email,
    otp
  );
  transport.sendMail(mailoptions, (err, info) => {
    if (err) {
      return res.status(404).json({
        success: false,
        err: err,
        msg: "unable to send otp",
      });
    } else {
      console.log("Email sended :" + info.response);
      return res.render("otpverification", {
        title: "Otp Verification",
        email: req.body.email,
      });
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

    res.render("login", {
      title: "Login Page",
      Value:
        "Congrats your account is crated successfull Kindly Login",
      email: email,
    });
  } else {
    res.status(401).json({
      success: false,
      msg: "Either otp or email is wrong",
    });
  }
};

const forgetPassLink = async (req, res) => {
  const { email } = req.body;
  const doc = await Authentication.findById(email);
  if (!doc) {
    console.log("email not exist");
    return res.json({
      title: "Forget Password",
      text: "The user email doesn't exist",
      success: false,
    });
  }
  const token = jwt.sign(
    { user: email },
    process.env.SECRET_KEY,
    { expiresIn: "15m" }
  );
  const url = `${req.protocol}://${req.get(
    "host"
  )}/auth/reset/?id=${token}`;

  const mailoptions = createMailOptionsForgetPass(
    email,
    url
  );

  transport.sendMail(mailoptions, (err, info) => {
    if (err) {
      console.log(err);
      return res.json({
        title: "Forget password",
        text: "Unable to send the reset link please try again later",
        success: false,
      });
    } else {
      console.log("Email sended :" + info.response);
      return res.json({
        title: "Forget password",
        text: "Password resent link sended, Please check your email it is valid for 15 mins",
        success: true,
      });
    }
  });
};

const forgetPass = (req, res) => {
  res.render("forgetPass", {
    title: "Forget Password",
  });
};

const changePass = async (req, res) => {
  const token = req.body.token;
  var id;
  try {
    const email = jwt.verify(token, process.env.SECRET_KEY);
    id = email.user;
  } catch (error) {
    res.json({
      success: false,
      text: "Your time is up, It's been more than 15 min kindly ask for the link again",
      msg: "Don't be scare we are there for you ",
    });
  }
  const user = await Authentication.findOne({
    _id: id,
  });
  if (!user) {
    return res.json(
      res.json({
        success: false,
        text: "Are you sure you have not delted your account in between!!!",
        msg: "Don't be scare we are there for you ",
      })
    );
  }
  const hashPass = await bcrypt.hash(
    req.body.password,
    salt
  );
  user.password = hashPass;
  const auth = await Authentication(user);
  try {
    await auth.save();
    res.json({
      success: true,
      text: "Congrats your password is changed",
      msg: "Told You !! Don't be scare we are there for you ",
    });
  } catch (err) {
    res.json({
      success: false,
      text: "An unknown error occured while saving your new password",
      msg: "Don't be scare we are there for you ",
    });
  }
};

const sendPass = (req, res) => {
  res.render("resetPass", {
    title: "Reset Password",
    text: "",
    msg: "Don't be scare we are there for you ",
  });
};

module.exports = {
  login,
  signup,
  verify,
  forgetPass,
  forgetPassLink,
  changePass,
  sendPass,
};
