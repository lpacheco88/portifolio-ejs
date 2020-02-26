const express = require("express");
const router = express.Router();
const SocialMedia = require("../model/socialMedia");

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const socials = await SocialMedia.find(searchOptions);

    res.render("socials/index", {
      socials: socials
    });
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  renderNewPage(res, new SocialMedia());
});

router.post("/", async (req, res) => {
  const socials = new SocialMedia({
    name: req.body.name,
    description: req.body.description,
    url: req.body.backEndTec,
    tip: req.body.frontEndTec
  });

  saveSocialImg(socials, req.body.socialImg);
  try {
    const newSocial = await socials.save();
    res.redirect(`socials/${newSocial.id}`);
  } catch (error) {
    res.render("socials/new", {
      project: project,
      errorMEssage: "Error creating project"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const socials = await SocialMedia.findById(req.params.id);
    res.render("socials/show", {
      socials: socials
    });
  } catch (error) {}
});

router.get("/:id/edit", async (req, res) => {
  try {
    const socials = await SocialMedia.findById(req.params.id);
    renderEditPage(res, socials);
  } catch (error) {
    console.log("error");
    res.redirect("/costumers");
  }
});

router.put("/:id", async (req, res) => {
  let social;

  try {
    social = await Costumer.findById(req.params.id);
    social.name = req.body.name;
    social.description = req.body.urlRoot;
    social.url = req.body.jobDescription;
    social.tip = new Date(req.body.dateFrom);

    if (req.body.costuImg != null && req.body.socialImg !== "") {
      saveSocial(social, req.body.costuImg);
    }
    await social.save();
    res.redirect(`/socials/${social.id}`);
  } catch (error) {
    res.render("costumers/new", {
      social: social,
      errorMEssage: "Error creating social"
    });
  }
});

async function renderNewPage(res, social, hasError = false) {
  renderFormPage(res, social, "new", hasError);
}

async function renderEditPage(res, social, hasError = false) {
  renderFormPage(res, social, "edit", hasError);
}

async function renderFormPage(res, social, form, hasError = false) {
  try {
    const params = {
      social: social
    };

    if (hasError) {
      if (form === "edit") {
        params.errorMessage = "Error Updating social";
      } else {
        params.errorMessage = "Error creating social";
      }
    }
    res.render(`socials/${form}`, params);
  } catch (error) {
    res.redirect("/socials");
  }
}

router.delete("/:id", async (req, res) => {
  let social;
  try {
    social = await SocialMedia.findById(req.params.id);
    await social.remove();
    res.redirect("/costumers");
  } catch (error) {
    if (social != null) {
      res.render("socials/show", {
        social: social,
        errorMessage: "Could not remove social, reason: " + error
      });
    } else {
      res.redirect("/");
    }
  }
});

function saveSocialImg(social, imgEnconded) {
  if (imgEnconded == null) return;
  const socialImg = JSON.parse(imgEnconded);
  if (socialImg != null && imageMimeTypes.includes(socialImg.type)) {
    social.costumerImage = new Buffer.from(socialImg.data, "base64");
    social.costumerImageType = socialImg.type;
  }
}

module.exports = router;
