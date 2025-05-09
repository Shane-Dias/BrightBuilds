const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const projectRoutes = require("./routes/projectRoutes");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const studyRoutes = require("./routes/studyRoutes"); // Add this line

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", projectRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(studyRoutes); // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));