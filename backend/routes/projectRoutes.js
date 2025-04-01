const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createProject,
  getProjects,
  getProjectById,
  getPendingProjects,
  updateProjectStatus, 
  getProjectsByUsername,
} = require("../controllers/projectController");

router.route("/create").post(upload.uploadMultiple, createProject);
router.route("/projects").get(getProjects);
router.route("/details/:id").get(getProjectById);
router.route('/pendingprojects').get(getPendingProjects);
// ✅ New Admin Route to Approve/Reject Projects
router.route("/update-status/:id").put(updateProjectStatus);
router.route("/projects/user/:username").get(getProjectsByUsername);

module.exports = router;
