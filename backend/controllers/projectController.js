const Project = require("../models/Project_schema");

// 🟢 Create Project (Initially Marked as "Pending")
exports.createProject = async (req, res, next) => {
  try {
    // Handle file uploads
    const mediaPaths = req.files ? req.files.map((file) => file.path) : [];

    // Create new project (Status: "pending")
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      github: req.body.github,
      hostedLink: req.body.hostedLink,
      media: mediaPaths,
      mentor: req.body.mentor,
      category: req.body.category,
      sdgs: JSON.parse(req.body.sdgs),
      teammates: JSON.parse(req.body.teammates),
      techStack: JSON.parse(req.body.techStack),
      status: "pending", // 🟢 All new projects are pending approval
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: "Project submitted for approval!",
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

// 🟢 Get All Approved Projects (For Display on Projects Page)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "approved" }); // Only approved projects
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getPendingProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "pending" }); // Only pending projects
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};




// 🟢 Get Project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// 🟢 Admin: Update Project Status (Approve/Reject)
exports.updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body; // Get the new status from the request body

    // Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Find project by ID and update its status
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, message: `Project marked as ${status}`, data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
