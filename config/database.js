require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECT_DB)
  .then(() => console.log("Database is Connected!"))
  .catch((error) => {
    console.log("Database is not connected");
    console.log(error);
  });
