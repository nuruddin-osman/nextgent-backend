// app.js
const express = require("express");
const app = express();
require("./config/database");
const cors = require("cors");
const path = require("path");
const bannerRoute = require("./routes/banner.route");

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("this is right");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/banner", bannerRoute);

// Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something broke!" });
});

module.exports = app;
