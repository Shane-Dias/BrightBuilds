const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserDetails } = require("../controllers/userController");
const { uploadSingle } = require("../middleware/upload"); 

// 🟢 User Registration Route
router.post("/signup", uploadSingle, registerUser); 
router.post("/login", loginUser);
router.get("/details/:id",getUserDetails)

  module.exports = router;
