const start = async (req, res) => {
  res.render("home", {
    title: "Home Page",
  });
};

const home = async (req, res) => {
  res.render("index", {
    title: "Blood Bank Locator",
    value: "Vitality For Blood",
  });
};

const login = (req, res) => {
  res.render("login", {
    title: "Login",
    Value: "",
    email: null,
  });
};

const signup = (req, res) => {
  res.render("signup", {
    title: "Signup",
  });
};

const about = (req, res) => {
  res.render("about", {
    title: "About Us",
  });
};

const findBlood = (req, res) => {
  res.render("findBlood", {
    title: "Find Blood",
  });
};

const donateBlood = (req, res) => {
  res.render("donateBlood", {
    title: "Donate Blood",
  });
};

const changeLocation = (req, res) => {
  res.render("changeLocation", {
    title: "Change Location",
  });
};

module.exports = {
  start,
  home,
  login,
  signup,
  about,
  findBlood,
  donateBlood,
  changeLocation,
};
