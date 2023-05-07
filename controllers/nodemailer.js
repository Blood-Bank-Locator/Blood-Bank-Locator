const nodemailer = require("nodemailer");
require("dotenv").config();

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, //put here app pass word make => app - mail , device -> windows computer
  },
});
function createMailOptionsOTP(email, otp) {
  const mailoptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "One Time Password",
    html: `<h3>Otp for the account creation for blood bank</h3>
    <p>
      This is an Auto genrated mail containg the One time
      Password for the verfication of your account at<br>
      Blood-bank-locator.com the otp for verification is <b>${otp}</b>
    </p>
    <p>Please don't share this to anyone this otp automatically expires after 5 min's</p>`,
  };

  return mailoptions;
}

function createMailOptionsForgetPass(email, url) {
  const mailoptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "One Time Password",
    html: `<h3>Don't Panic we are here</h3>
    <p>
      This is an Auto genrated mail containg the link for resetting your password<br>
      Kindly ignore if it was not you <br>
      <a href="${url}">
      <button href='${url}'>Reset Password</button>
      </a>
    </p>
    <p>Please don't share this to anyone this link will automaticall expire after 15 min's</p>`,
  };

  return mailoptions;
}

module.exports = {
  transport,
  createMailOptionsOTP,
  createMailOptionsForgetPass,
};
