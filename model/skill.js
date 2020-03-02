const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  workingWithSince: {
    type: Date,
    required: true
  },
  skillImage: {
    type: Buffer,
    required: false
  },
  skillImageType: {
    type: String,
    required: false
  },
  knowHowLevel: {
    type: Number,
    required: true
  }
});

skillSchema.virtual("skillImagePath").get(function() {
  if (this.skillImage != null && this.skillImageType != null) {
    return `data:${
      this.skillImageType
    };charset=utf-8;base64,${this.skillImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Skill", skillSchema);
