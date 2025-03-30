const Project = require("../models/Project");

// @desc    Create a new project
// @route   POST /api/create
// @access  Public
exports.createProject = async (req, res, next) => {
  try {
    // Handle file uploads
    const mediaPaths = req.files ? req.files.map((file) => file.path) : [];

    // Create new project
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      github: req.body.github,
      hostedLink: req.body.hostedLink,
      media: mediaPaths,
      mentor: req.body.mentor,
      sdgs: JSON.parse(req.body.sdgs),
      teammates: JSON.parse(req.body.teammates),
      techStack: JSON.parse(req.body.techStack),
    });

    await project.save();

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// You can add more controller methods here as needed
