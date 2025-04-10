const Project = require("../models/Project_schema");
const Comment = require("../models/Comment_schema");
const User = require("../models/User_schema");

// @desc    Add new comment
// @route   POST /api/comments
exports.addComment = async (req, res) => {
  const { projectId, commentText } = req.body;
  const userId = req.userId; // Comes from auth middleware

  if (!commentText)
    return res.status(400).json({ error: "Comment is required" });

  try {
    const comment = await Comment.create({ projectId, userId, commentText });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// @desc    Get comments for a specific project
// @route   GET /api/comments/:projectId
exports.getCommentsByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const comments = await Comment.find({ projectId })
      .populate("userId", "fullName") // commenter
      .populate("replies.userId", "fullName") // replier
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

exports.addReply = async (req, res) => {
  const { replyText } = req.body;
  const { commentId } = req.params;
  const userId = req.userId; // From auth middleware

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({
      replyText,
      userId,
    });

    await comment.save();

    const updatedComment = await Comment.findById(commentId).populate(
      "replies.userId",
      "fullName"
    );
    res.status(201).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add reply", error });
  }
};
