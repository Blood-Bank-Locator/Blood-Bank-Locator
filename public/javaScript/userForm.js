async function handelSubmit(e) {
  e.preventDefault();
  console.log("start");
  const user = {
    name: names.value,
    license: license.value,
    formDate: new Date(fromDate.value),
    toDate: new Date(toDate.value),
    address: address.value,
    pincode: pinCode.value,
    state: state.value,
    city: city.value,
    token: document.cookie,
  };
  console.log(user);
  const data = await axios.post("/user/details", user);
  console.log(data);
 
  // if (data.data.success) {
  //   document.cookie = data.data.token;
  //   window.location.href = '/user';
  // }
  // else
  //   result.innerText = "The Email Id Or Password is Wrong";
}
