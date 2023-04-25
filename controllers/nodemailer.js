const nodemailer = require("nodemailer");
require("dotenv").config();

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, //put here app pass word make => app - mail , device -> windows computer
  },
});
function createMailOptions(email, otp) {
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

module.exports = { transport, createMailOptions };
