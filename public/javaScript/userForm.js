const result = document.getElementById("result");
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
    a_pos: A_p.value ? A_p.value : 0,
    b_pos: B_p.value ? B_p.value : 0,
    o_pos: O_p.value ? O_p.value : 0,
    ab_pos: AB_p.value ? AB_p.value : 0,
    a_neg: A_n.value ? A_n.value : 0,
    b_neg: B_n.value ? B_n.value : 0,
    o_neg: O_n.value ? O_n.value : 0,
    ab_neg: AB_n.value ? AB_n.value : 0,
  };
  console.log(user);
  const data = await axios.post("/user/details", user);
  if (data.data.success) {
    result.innerText =
      "Your Details Are Succesfully updated";
    result.style.color = "green";
    result.style.display = "block";
  } else {
    result.innerText =
      "An error occured while saving your data please try after some time";
    result.style.color = "red";
    result.style.display = "block";
  }
  console.log(data);
}
