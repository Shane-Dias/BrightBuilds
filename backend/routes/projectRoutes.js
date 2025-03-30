const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

router.route("/create").post(upload, createProject);

router.route("/projects").get(getProjects); 

module.exports = router;
