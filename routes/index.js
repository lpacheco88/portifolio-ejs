const express = require("express");
const router = express.Router();
const Project = require("../model/project");
const Skill = require("../model/skill");

router.get("/", async (req, res) => {
  let projects = [];
  let skills = [];
  try {
    skills = await Skill.find()
      .sort({ name: "asc" })
      .exec();
    res.render("index", { skills: skills });
  } catch (error) {
    project = [];
    skill = [];
  }
});

module.exports = router;
