const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    age: { type: Number, required: true, min: 13 }, // Assuming minimum age requirement
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    mobile: { type: String, required: true, trim: true },
    currentPursuit: { type: String, required: true },
    institution: { type: String, required: true },
    role: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    profileImage: { type: String, default: "" }, // Default empty string to avoid `undefined`
    instagram: { type: String, default: null },
    twitter: { type: String, default: null },
    github: { type: String, default: null },
    linkedin: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
