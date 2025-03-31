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
    const existingUser = await User.findOne({ email });
    if (existingUser)
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
    console.log(req.body)

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email!" });

    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password!" });

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

module.exports = { registerUser, loginUser };

