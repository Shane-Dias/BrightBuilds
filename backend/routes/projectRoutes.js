const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createProject,
  getProjects,
  getProjectById,
} = require("../controllers/projectController");

router.route("/create").post(upload, createProject);

router.route("/projects").get(getProjects);

router.route("/details/:id").get(getProjectById);

module.exports = router;
