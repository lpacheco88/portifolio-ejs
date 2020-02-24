const express = require("express");
const router = express.Router();
const Skill = require("../model/skill");
const imageMimeTypes = ["image/jpge", "image/png", "image/gif"];

//Get all skills route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const skills = await Skill.find(searchOptions);

    res.render("skills/index", {
      skills: skills
    });
  } catch (error) {
    res.redirect("/");
  }
});

//New skill route
router.get("/new", (req, res) => {
  try {
    renderNewPage(res, new Skill());
  } catch (error) {}
});

//Create skill route
router.post("/", async (req, res) => {
  const skill = new Skill({
    name: req.body.name,
    workingWithSince: req.body.workingWithSince,
    knowHowLevel: req.body.knowHowLevel,
    description: req.body.description
  });

  saveSkillImg(skill, req.body.skillImg);

  try {
    const newSkill = await skill.save();
    res.redirect(`skills/${newSkill.id}`);
  } catch (error) {
    if (skill.skillImageName != null) {
      removeSkillImage(skill.skillImageName);
    }
    renderNewPage(res, skill, true, error);
  }
});

//Get skill by ID route
router.get("/:id", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    res.render("skills/show", {
      skill: skill
    });
  } catch (error) {
    res.redirect("/");
  }
});

//Edit skill route
router.get("/:id/edit", async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    renderEditPage(res, skill);
  } catch (error) {
    console.log("error");
    res.redirect("/skills");
  }
});

//Update skill
router.put("/:id", async (req, res) => {
  let skill;

  try {
    skill = await Skill.findById(req.params.id);
    skill.name = req.body.name;
    skill.workingWithSince = req.body.workingWithSince;
    skill.knowHowLevel = req.body.knowHowLevel;

    await skill.save();
    res.redirect(`/skills/${skill.id}`);
  } catch (error) {
    res.render("skills/new", {
      costumer: skill,
      errorMEssage: "Error creating skil"
    });
  }
});

async function renderNewPage(res, skill, hasError = false) {
  renderFormPage(res, skill, "new", hasError);
}

async function renderEditPage(res, skill, hasError = false) {
  renderFormPage(res, skill, "edit", hasError);
}

async function renderFormPage(res, skill, form, hasError = false) {
  try {
    const params = {
      skill: skill
    };

    if (hasError) {
      if (form === "edit") {
        params.errorMessage = "Error updating skill";
      } else {
        params.errorMessage = "Error creating skill";
      }
    }
    res.render(`skills/${form}`, params);
  } catch (error) {
    res.redirect("/skills");
  }
}

//Delete skill
router.delete("/:id", async (req, res) => {
  let skill;
  try {
    skill = await Skill.findById(req.params.id);
    await skill.remove();
    res.redirect("/skills");
  } catch (error) {
    if (skill != null) {
      res.render("skills/show", {
        skill: skill,
        errorMessage: "Could not remove skill, reason: " + error
      });
    } else {
      res.redirect("/");
    }
  }
});

function saveSkillImg(skill, imgEnconded) {
  if (imgEnconded == null) return;
  const skillImg = JSON.parse(imgEnconded);
  if (skillImg != null && imageMimeTypes.includes(skillImg.type)) {
    skill.skillImage = new Buffer.from(skillImg.data, "base64");
    skill.skillImageType = skillImg.type;
  }
}

module.exports = router;
