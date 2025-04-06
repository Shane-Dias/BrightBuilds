const User = require("../models/User_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 🟢 Register User
const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      age,
      gender,
      mobile,
      currentPursuit,
      institution,
      role,
      city,
      state,
      instagram,
      twitter,
      youtube,
      linkedin,
    } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email, fullName });
    if (existingUser)
      return res.status(400).json({ message: "Email already used!" });

    const existingUserName = await User.findOne({ fullName });
    if (existingUserName)
      return res.status(400).json({ message: "User already exists!" });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Profile Image (if uploaded)
    const profileImage = req.file ? req.file.path : "";

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      age,
      gender,
      mobile,
      currentPursuit,
      institution,
      role,
      city,
      state,
      profileImage,
      instagram,
      twitter,
      youtube,
      linkedin,
    });

    // Save user to DB
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email!" });

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password!" });

    // Generate JWT Token (valid for 7 days)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from URL

    // Find user by ID (or change to email if needed)
    const user = await User.findById(id).select("-password"); // Exclude password

    if (!user) return res.status(404).json({ message: "User not found!" });

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error in getUserDetails:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getallUserDetails = async (req, res) => {
  try {
    console.log("User ID from token:", req.userId); // Debugging log

    const user = await User.findById(req.userId).select("-password"); // Exclude password

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ Error in getallUserDetails:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserDetailsByUserName = async (req, res) => {
  try {
    const {username} = req.params; // Extract userName from URL
    console.log(username)

    // Find user by userName instead of _id
    const user = await User.findOne({ fullName: username }).select("-password"); // Exclude password

    if (!user) return res.status(404).json({ message: "User not found!" });

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error in getUserDetailsByUserName:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Add this function to userController.js
const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Remove fields that shouldn't be updated directly
    const { password, ...safeUpdateData } = updateData;
    
    // If there's a new password, hash it before updating
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      safeUpdateData.password = hashedPassword;
    }
    
    // Update user with new data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: safeUpdateData },
      { new: true, runValidators: true }
    ).select("-password");
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    
    res.status(200).json({
      success: true,
      message: "User details updated successfully!",
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Error in updateUserDetails:", error);
    
    // Handle duplicate key errors (email or fullName)
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: `${Object.keys(error.keyPattern)[0]} already exists!` 
      });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

// Don't forget to export the new function
module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  getallUserDetails,
  getUserDetailsByUserName,
  updateUserDetails  // Add this line
};


