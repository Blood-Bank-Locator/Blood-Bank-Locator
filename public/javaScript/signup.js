const currentDate = new Date().toISOString().split("T")[0];
document
  .getElementById("valid_from")
  .setAttribute("min", currentDate);
document
  .getElementById("valid_till")
  .setAttribute("max", currentDate);

function isValidEmail(email) {
  // check if email ends with ".com" or ".in"
  console.log(email);
  if (email.endsWith(".com") || email.endsWith(".in")) {
    return true;
  } else {
    return false;
  }
}
function isValidPassword(password) {
  const lowercaseRegex = /[a-z]/;  // Regular expression to match lowercase letters
  const uppercaseRegex = /[A-Z]/;  // Regular expression to match uppercase letters
  const numericRegex = /[0-9]/;    // Regular expression to match numeric characters

  if (
    lowercaseRegex.test(password) &&
    uppercaseRegex.test(password) &&
    numericRegex.test(password) &&
    password.length >= 8
  ) {
    return true;  // Password meets the requirements
  }

  return false;  // Password does not meet the requirements
}

// function isValidPassword(password) {
//   console.log(password);
//   // const password = document.getElementById("password").value;
//   if (password.length < 8) {
//     return false;
//   }

//   // Check if password contains at least one alphabet and one numeric character
//   const hasAlphabet = /[a-z]/.test(password);
//   const hasNumber = /\d/.test(password);
//   if (!hasAlphabet || !hasNumber) {
//     return false;
//   }

//   // Check if password contains at least one of the special characters @, &, or -
//   const hasSpecialChar = /[@&-]/.test(password);
//   if (!hasSpecialChar) {
//     return false;
//   }
//   const uppercaseRegex = /[A-Z]/;
//   if ( !uppercaseRegex.test(password)){
//     return false;  // Password meets the requirements
//   }

//   return true;

  
// }




function isValidPhoneNumber(phoneNumber) {
  console.log(phoneNumber);
  // var phoneNumber = event.target.value
  // Remove any whitespace or dashes from the phone number
  phoneNumber = phoneNumber
    .replace(/\s/g, "")
    .replace(/-/g, "");

  // Check if the phone number contains only digits

  // Check if the phone number has a length of 10 digits
  if (phoneNumber.length !== 9) {
    return false;
  }

  return true;
}

// const passwordInput = document.getElementById("password");
// const phoneNumberInput = document.getElementById("contact");
// const submitButton = document.getElementById("submit");

// // Add event listeners to the input fields
// passwordInput.addEventListener(
//   "input",
//   validatePasswordAndDisableButton
// );
// phoneNumberInput.addEventListener(
//   "input",
//   validatePhoneNumberAndDisableButton
// );

// function validatePasswordAndDisableButton() {
//   const password = passwordInput.value;
//   const isValid = isValidPassword(password);
//   submitButton.disabled = !isValid;
// }

// function validatePhoneNumberAndDisableButton() {
//   const phoneNumber = phoneNumberInput.value;
//   const isValid = isValidPhoneNumber(phoneNumber);
//   console.log(isValid);
//   submitButton.disabled = !isValid;
// }
