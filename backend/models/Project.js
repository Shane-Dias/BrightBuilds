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
  media: [String], // We'll store file paths or URLs here
  mentor: {
    type: String,
    required: false,
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
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
