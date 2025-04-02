const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserDetails,
  getallUserDetails,
  getUserDetailsByUserName,
} = require("../controllers/userController");
const { uploadSingle } = require("../middleware/upload");
const authenticateUser = require("../middleware/authenticateUser");

// 🟢 User Registration Route
router.post("/signup", uploadSingle, registerUser);
router.post("/login", loginUser);
router.get("/details/:id", getUserDetails);
router.get("/userDetails/:username", getUserDetailsByUserName);
router.get("/details", authenticateUser, getallUserDetails);

module.exports = router;
