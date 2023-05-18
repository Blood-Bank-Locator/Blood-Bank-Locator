const email = document.getElementById("email");
const result = document.getElementById("result");
const text = document.getElementById("text");

async function handelSubmit(e) {
  e.preventDefault();
  console.log("start");
  user = {
    email: email.value,
  };
  const token = await axios.post("/auth/resetPass", user);
  if (token.data.success) result.style.color = "green";
  else result.style.color = "red";
  if(token.data.text) result.innerText = token.data.text;
  if(token.data.msg) text.innerText = token.data.msg;
  result.style.display = 'block';
  console.log(token);
}
