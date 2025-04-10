const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const requireAuth = require("../middleware/authenticateUser");

// Routes
router.post("/:projectId", requireAuth, commentController.addComment);
router.get("/:projectId", commentController.getCommentsByProject);
router.post("/:commentId/replies", requireAuth, commentController.addReply);

module.exports = router;
