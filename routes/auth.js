const express = require("express");
const router = express.Router();
const {
  login,
  signup,
  verify,
  forgetPassLink,
  forgetPass,
  changePass,
  sendPass,
} = require("../controllers/auth");

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/verify").post(verify);
router.route("/forgetPass").get(forgetPass);
router.route("/resetPass").post(forgetPassLink);
router.route("/reset").post(changePass);
router.route("/reset").get(sendPass);

module.exports = router;
