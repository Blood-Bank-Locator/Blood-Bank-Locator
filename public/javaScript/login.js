const pass = document.getElementById("password");
const email = document.getElementById("email");
const result = document.getElementById("result");

function password() {}

async function handelSubmit(e) {
  e.preventDefault();
  console.log("start");
  user = {
    email: email.value,
    password: pass.value,
  };
  const token = await axios.post("/auth/login", user);
  console.log(token)
  if(token.data.success) sessionStorage.setItem("token", token.data.token);
  else result.innerText = "The Email Id Or Password is Wrong";
}

const togglePassword = document.querySelector(
  "#togglePassword"
);

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    pass.getAttribute("type") === "password"
      ? "text"
      : "password";
  pass.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});

pass.addEventListener("change", password);
