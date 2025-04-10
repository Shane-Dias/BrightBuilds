const Comment = require("../models/Comment_schema");

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
      .populate("userId", "fullName") // get user name
      .sort({ createdAt: -1 }); 

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
