const User = require("../models/User_schema");
const bcrypt = require("bcrypt");

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

module.exports = { registerUser };
