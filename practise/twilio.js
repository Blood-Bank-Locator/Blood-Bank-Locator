// require("dotenv").config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_TOKEN;
var client = require("twilio")(
  "AC7fdc8afe4e8bcf14ca48c55dc2cd51ed",
  "d5ae38a465c4ab771a4063fa269b9009"
);

client.messages
  .create({
    body: "McAvoy or Stewart? These timelines can get so confusing.",
    from: "+15489185197",
    statusCallback: "http://postb.in/1234abcd",
    to: "+919718252159",
  })
  .then((message) => console.log(message.sid));
