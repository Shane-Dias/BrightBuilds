const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  hostedLink: {
    type: String,
    required: true,
  },
  media: [String], // We'll store file paths 
  mentor: {
    type: String,
    required: true,
  },
  sdgs: {
    type: [String],
    required: true,
  },
  teammates: {
    type: [String],
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  category: {
    // Add this new field
    type: String,
    required: true,
    enum: ["Game", "Website", "Video", "Documentary", "Digital Art"], // Optional: restricts to specific values
  },
  likes: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "approved",  //change this to pending later when admin page is ready
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
