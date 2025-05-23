const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authenticateUser");

const {
  createProject,
  getProjects,
  getProjectById,
  getPendingProjects,
  updateProjectStatus,
  getProjectsByUsername,
  getMentorProjectsByUsername,
  likeProject,
  rateProject,
  getProjectsGroupedBySDG
} = require("../controllers/projectController");

router.route("/create").post(upload.uploadMultiple, createProject);
router.route("/projects").get(getProjects);
router.route("/details/:id").get(getProjectById);
router.route("/pendingprojects").get(getPendingProjects);
// ✅ New Admin Route to Approve/Reject Projects
router.route("/update-status/:id").put(updateProjectStatus);
router.route("/projects/user/:username").get(getProjectsByUsername);
router.route("/projects/mentor/:username").get(getMentorProjectsByUsername);
router.post("/:projectId/like", auth, likeProject);
router.post("/:projectId/rate", auth, rateProject);
router.get("/sdg-summary", getProjectsGroupedBySDG);

module.exports = router;
