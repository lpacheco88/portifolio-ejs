const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    required: true
  },
  socialImage: {
    type: Buffer,
    required: false
  },
  socialImageType: {
    type: String,
    required: false
  }
});

socialMediaSchema.virtual("socialMediaImagePath").get(function() {
  if (this.socialImage != null && this.socialImageType != null) {
    return `data:${
      this.socialImageType
    };charset=utf-8;base64,${this.socialImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
