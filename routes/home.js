const express = require("express");
const router = express.Router();
const {
  start,
  home,
  login,
  signup,
  about,
  findBlood,
  donateBlood,
  changeLocation,
} = require("../controllers/home");

router.route("/").get(home);
router.route("/home").get(start);
router.route("/login").get(login);
router.route("/signup").get(signup);
router.route("/about").get(about);
router.route("/findBlood").get(findBlood);
router.route("/donateBlood").get(donateBlood);
router.route("/changeLocation").get(changeLocation);

module.exports = router;
