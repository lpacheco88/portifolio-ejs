const express = require("express");
const router = express.Router();
const Skill = require("../model/skill");
const Social = require("../model/socialMedia");

router.get("/", async (req, res) => {
  let skills = [];
  let socials = [];
  try {
    skills = await Skill.find().exec();
    socials = await Social.find().exec();
    res.render("index", { skills: skills, socials: socials });
  } catch (error) {
    skill = [];
  }
});

router.get("/download", function(req, res) {
  const file = `public/upload-folder/Lpacheco.docx`;
  res.download(file); // Set disposition and send it.
});

module.exports = router;
