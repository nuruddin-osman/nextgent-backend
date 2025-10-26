const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "the title is required"],
    trim: true,
  },
  subtitle: {
    type: String,
    required: [true, "the subtitle is required"],
    trim: true,
  },
  desc: {
    type: String,
  },
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
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
