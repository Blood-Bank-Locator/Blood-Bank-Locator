const fastTwoSMS = require("fast-two-sms");
require("dotenv").config();

const options = {
  authorization: process.env.FAST_API_KEY,
  message: "Hello I am a bot",
  numbers: ["9718252159"],
  sender_id: "Blood Bank Locator",
  flash: "1",
};

async function smsSend(options) {
  const response = await fastTwoSMS.sendMessage(options);
  console.log("the response is", response);
}

smsSend(options);
