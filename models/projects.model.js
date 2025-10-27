const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "the title is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    area: {
      type: String,
    },
    list: [
      {
        type: String,
        trim: true,
      },
    ],
    image: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
