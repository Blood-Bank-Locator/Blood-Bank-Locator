const axios = require("axios");

const options = {
  method: "POST",
  url: "https://d7sms.p.rapidapi.com/messages/v1/send",
  headers: {
    "content-type": "application/json",
    Token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYjJiZDQ5MmQtMjBhMy00NTg3LWEwNDktMjdiYWQxYWZiNzVlIn0.FO53XNEpfHkh9cP8-Dolx0hBDCqP54hLYSKwaeIJO4o",
    "X-RapidAPI-Key":
      "c43a5882d4msh88934ef872046fdp121b64jsn8b82481328ed",
    "X-RapidAPI-Host": "d7sms.p.rapidapi.com",
  },
  data: '{"messages":[{"channel":"sms","originator":"D7-RapidAPI","recipients":["+919718252159"],"content":"Hello my name is himanshu and i am having a fun","data_coding":"text"}]}',
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
