// middleware/adminMiddleware.js
const User = require("../models/User_schema");

const isAdmin = async (req, res, next) => {
  try {
    // The userId should come from the authentication middleware
    const user = await User.findById(req.userId);

    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin privileges required",
      });
    }
    next();
  } catch (error) {
    console.error("❌ Error in admin verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = isAdmin;
