const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserDetails,
  getallUserDetails,
  getUserDetailsByUserName,
  updateUserDetails,
  getAllUsers,
  deleteUser
} = require("../controllers/userController");
const { uploadSingle } = require("../middleware/upload");
const authenticateUser = require("../middleware/authenticateUser");
const isAdmin = require("../middleware/adminMiddleware");
// 🟢 User Registration Route
router.post("/signup", uploadSingle, registerUser);
router.post("/login", loginUser);
router.get("/details/:id", getUserDetails);
router.get("/userDetails/:username", getUserDetailsByUserName);
router.get("/details", authenticateUser, getallUserDetails);
router.put("/update/:id", updateUserDetails);
router.get("/admin/all-users", authenticateUser, isAdmin, getAllUsers);
router.delete("/admin/delete-user/:userId", authenticateUser, isAdmin, deleteUser);

module.exports = router;
