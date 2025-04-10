const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    replyText: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const commentSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    replies: [replySchema], // <-- Nested replies array
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
