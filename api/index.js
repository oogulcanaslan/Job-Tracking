const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");

var cors = require('cors')

dotenv.config();
app.use(express.json());
app.use(cors())


mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

  app.use("/api/posts", postRoute);

  app.listen("5000", () => {
    console.log("Backend is running.");
  });