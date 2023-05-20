const currentDate = new Date().toISOString().split("T")[0];
document
  .getElementById("valid_from")
  .setAttribute("max", currentDate);
document
  .getElementById("valid_till")
  .setAttribute("min", currentDate);

