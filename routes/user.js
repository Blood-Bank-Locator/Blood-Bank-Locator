const express = require("express");
const router = express.Router();

const { user, form } = require("../controllers/user.js");

router.route("/").get(user);
router.route("/details").post(form);

module.exports = router;
