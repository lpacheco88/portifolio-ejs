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

const users = [];

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

  res.render("admin/index", {
    costumers: costumers,
    skills: skills,
    projects: projects,
    socials: socials,
    user: user.name
  });
});

router.get("/", checkAuthenticated, async (req, res) => {});

router.get("/login", async (req, res) => {
  res.render("admin/login.ejs");
});

router.get("/register", async (req, res) => {
  const users = await User.find().exec();
  console.log(users);
  res.render("admin/register.ejs");
});

router.get("/error", async (req, res) => {
  res.render("admin/error.ejs");
});

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    const newUser = await user.save();
    res.redirect("/admin/login");
    console.log("post register");
  } catch (error) {
    res.redirect("/admin/register");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/error",
    failureFlash: true
  })
);

router.delete("/logout", (req, res) => {
  req.logout();
  res.redirect("/admin/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("admin/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/admin");
  }
  next();
}

module.exports = router;
