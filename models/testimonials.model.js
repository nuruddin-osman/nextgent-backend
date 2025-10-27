const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, "the title is required"],
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
