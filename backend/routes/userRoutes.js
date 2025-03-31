const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { uploadSingle } = require("../middleware/upload"); // Destructure to get the uploadSingle function

// 🟢 User Registration Route
router.post("/signup", uploadSingle, registerUser); // Use uploadSingle directly
router.post("/login", loginUser);

  module.exports = router;
