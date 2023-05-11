const express = require("express");
const router = express.Router();

const { blood } = require("../controllers/find.js");

router.route("/blood").post(blood);

module.exports = router;
