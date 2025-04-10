const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const requireAuth = require("../middleware/authenticateUser"); 

// Routes
router.post("/", requireAuth, commentController.addComment);
router.get("/:projectId", commentController.getCommentsByProject);

module.exports = router;
