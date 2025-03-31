const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const projectRoutes = require("./routes/projectRoutes");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
// .connect("mongodb://127.0.0.1:27017/brightbuilds") //local server

mongoose
  .connect(process.env.MONGO_URI)   // atlas server
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
