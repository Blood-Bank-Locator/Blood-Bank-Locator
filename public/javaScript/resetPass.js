const pass = document.getElementById("password");
const confirm = document.getElementById("confirm-password");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


async function handelSubmit(e) {
  e.preventDefault();
  console.log("start");
  user = {
    token: id,
    password : pass.value,
  };
  console.log(user);
  const post = await axios.post("/auth/reset", user);
  if (post.data.success) result.style.color = "green";
  else result.style.color = "red";
  result.innerText = post.data.text;
  console.log(post);
}