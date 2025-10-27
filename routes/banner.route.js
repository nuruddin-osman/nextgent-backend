const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Banner = require("../models/banner.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(__dirname, "../uploads"));

    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

// Only image upload  route
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // Image path send from Frontend
    res.status(200).json({
      success: true,
      imageUrl: `/uploads/${req.file.filename}`,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Create new product
router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const banner = new Banner(req.body);
    await banner.save();

    res.status(201).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Update data
router.put("/:id", async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "item is not found",
      });
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

//get all data
router.get("/", async (req, res) => {
  try {
    const banner = await Banner.find().sort({ createdAt: -1 });

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "item is not found",
      });
    }
    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
//delete data
router.delete("/:id", async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item delete is successfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
