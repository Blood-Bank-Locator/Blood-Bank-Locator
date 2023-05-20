const pass = document.getElementById("password");
const email = document.getElementById("email");
const result = document.getElementById("result");

function password() {}

async function handelSubmit(e) {
  e.preventDefault();
  console.log("start");
  const user = {
    email: email.value,
    password: pass.value,
  };
  const data = await axios.post("/auth/login", user);
  console.log(data);
  if (data.data.success) {
    window.location.href = "/user";
  } else {
    result.style.display = "block";
    result.innerText = "The Email Id Or Password is Wrong";
  }
}

pass.addEventListener("change", password);
