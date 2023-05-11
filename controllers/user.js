const jwt = require("jsonwebtoken");
require("dotenv").config();

const Authentication = require("../models/auth");
const License = require("../models/license.js");
const Blood = require("../models/blood");
const Address = require("../models/address");

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(
    2,
    "0"
  );
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const user = async (req, res) => {
  const token = req.cookies.token;
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
  const auth = await Authentication.findOne({
    _id: id,
  });

  const license = await License.findOne({
    _id: id,
  });

  if (!auth || !license) {
    return res.json(
      res.json({
        success: false,
        text: "Are you sure you have not delted your account in between!!!",
        msg: "Don't be scare we are there for you ",
      })
    );
  }
  var data = {
    name: auth.blood_bank_name,
    contact: auth.contact,
    license: license.license,
    valid_till: formatDate(license.valid_till),
    valid_from: formatDate(license.valid_from),
  };

  return res.render("userForm", data);
};

const form = async (req, res) => {
  const token = req.body.token;
  console.log("cookie", req.body);
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(400).send("session expired");
  }

  const licenseData = {
    license: req.body.license,
    valid_from: req.body.formDate,
    valid_till: req.body.toDate,
  };

  console.log(licenseData);
  try {
    console.log("updating license");
    const data = await License.updateOne(
      { _id: req.user.user },
      {
        $set: {
          license: req.body.license,
          valid_from: req.body.formDate,
          valid_till: req.body.toDate,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      address: false,
      blood: false,
    });
  }

  const addressData = {
    _id: req.user.user,
    address: req.body.address,
    pincode: parseInt(req.body.pincode),
    state: req.body.state,
    city: req.body.city,
  };
  console.log(addressData);
  try {
    const data = await Address.findById(req.user.user);
    if (!data) {
      console.log("Address not avilable");
      await new Address(addressData).save();
    } else {
      console.log("Address is avilable");
      await Address.updateOne(
        { _id: req.user.user },
        {
          $set: {
            address: req.body.address,
            pincode: parseInt(req.body.pincode),
            state: req.body.state,
            city: req.body.city,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      address: true,
      blood: false,
    });
  }

  const bloodData = {
    _id: req.user.user,
    "a+": parseInt(req.body.a_pos),
    "a-": parseInt(req.body.b_neg),
    "b+": parseInt(req.body.b_pos),
    "b-": parseInt(req.body.b_neg),
    "o+": parseInt(req.body.o_pos),
    "o-": parseInt(req.body.o_neg),
    "ab+": parseInt(req.body.ab_pos),
    "ab-": parseInt(req.body.ab_neg),
  };
  console.log(bloodData);
  try {
    const data = await Blood.findById(req.user.user);
    if (!data) {
      console.log("Address not avilable");
      await new Blood(bloodData).save();
    } else {
      console.log("Address is avilable");
      await Address.updateOne(
        { _id: req.user.user },
        {
          $set: {
            "a+": parseInt(req.body.a_pos),
            "a-": parseInt(req.body.b_neg),
            "b+": parseInt(req.body.b_pos),
            "b-": parseInt(req.body.b_neg),
            "o+": parseInt(req.body.o_pos),
            "o-": parseInt(req.body.o_neg),
            "ab+": parseInt(req.body.ab_pos),
            "ab-": parseInt(req.body.ab_neg),
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      address: true,
      blood: false,
    });
  }

  res.json({ success: true });
};

module.exports = { user, form };
