const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../passport-config");
const flash = require("express-flash");
const session = require("express-session");
// returnable objetcs
const Skill = require("../model/skill");
const Costumer = require("../model/costumer");
const Project = require("../model/project");
const SocialMedia = require("../model/socialMedia");
//User
const User = require("../model/admin/user");

initializePassport(
  passport,
  (email) => User.find((user) => user.email === email),
  (id) => User.find((user) => user.id === id)
);

router.use(express.urlencoded({ extended: false }));
router.use(flash());
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

router.use(passport.initialize());
router.use(passport.session());

//LoggedIn page router
router.get("/", checkAuthenticated, async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  const costumers = await Costumer.find(searchOptions);
  const skills = await Skill.find(searchOptions);
  const projects = await Project.find(searchOptions);
  const socials = await SocialMedia.find(searchOptions);
  const user = await User.findById(req.user);
  const registredUsers = await User.find(searchOptions);

  res.render("admin/index", {
    costumers: costumers,
    skills: skills,
    projects: projects,
    socials: socials,
    user: user.name,
    registredUsers: registredUsers
  });
});

// //Show page Route
router.get("/crud/:userid", checkAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user);

    res.render("admin/crud/show", {
      user: user
    });
  } catch (error) {}
});

//Login page route
router.get("/login", async (req, res) => {
  res.render("admin/login.ejs");
});

//Register page route
router.get("/register", async (req, res) => {
  const users = await User.find().exec();

  res.render("admin/register.ejs");
});

//Edit page route
router.get("/:id/edit", checkAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.render("admin/crud/edit", { user: user });
  } catch (error) {
    console.log("error");
    res.redirect("/admin");
  }
});

//Update page route
router.put("/edit/:id", checkAuthenticated, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    await user.save();

    res.redirect(`/admin/`);
  } catch (error) {
    console.log(error);
  }
});

//Delete page route
router.delete("/delete/user/:id", checkAuthenticated, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    await user.remove();

    res.redirect("/admin/");
  } catch (error) {
    console.log(error);
  }
});

//Error route - if something is typed incorrect for example
router.get("/error", async (req, res) => {
  res.render("admin/error.ejs");
});

//Register route
router.post("/register/new/user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    const newUser = await user.save();
    res.redirect("/admin");
  } catch (error) {
    res.redirect("/admin/register");
  }
});

//Login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/error",
    failureFlash: true
  })
);

//Logout route
router.delete("/logout", (req, res) => {
  req.logout();
  res.redirect("/admin/login");
});

//Check if user has loggedIn
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/admin/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  next();
}

module.exports = router;
