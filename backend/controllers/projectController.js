const Project = require("../models/Project_schema");
const User = require("../models/User_schema");

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
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
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

    // Validate status (allow only approved & rejected)
    if (!["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status update" });
    }

    // Update project status
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: { status } }, // Ensure only the status field updates
      { new: true, runValidators: true } // Return updated project & run schema validations
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: `Project marked as ${status}`,
      data: project,
    });
  } catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getProjectsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    // Find projects where teammates array contains the given username
    const projects = await Project.find({ teammates: username });

    if (!projects.length) {
      return res
        .status(404)
        .json({ message: "No projects found for this user." });
    }

    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMentorProjectsByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    console.log("Fetching projects for mentor:", username);

    // Find projects where mentor field matches the given username/fullName
    const projects = await Project.find({ mentor: username });
    console.log("Found projects:", projects.length);

    res.status(200).json({ 
      success: true, 
      projects: projects || [],
      message: projects.length === 0 ? "No projects found for this mentor" : null
    });
  } catch (error) {
    console.error("❌ Error fetching mentor projects:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.likeProject = async (req, res) => {
  const userId = req.userId;
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You already liked this project" });
    }

    project.likes += 1;
    project.likedBy.push(userId);

    await project.save();

    res
      .status(200)
      .json({ message: "Project liked successfully", likes: project.likes });
  } catch (err) {
    res.status(500).json({ message: "Error liking project", error: err });
  }
};

exports.rateProject = async (req, res) => {
  const userId = req.userId;
  const { projectId } = req.params;
  const { rating } = req.body; // Should be a number (e.g., 1 to 5)

  try {
    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    const alreadyRated = project.ratedBy.find(
      (r) => r.userId.toString() === userId
    );

    if (alreadyRated) {
      return res
        .status(400)
        .json({ message: "You have already rated this project" });
    }

    project.ratedBy.push({ userId, rating });

    // Calculate average rating
    const totalRating = project.ratedBy.reduce(
      (sum, entry) => sum + entry.rating,
      0
    );
    const avgRating = totalRating / project.ratedBy.length;

    project.rating = avgRating;

    await project.save();

    res
      .status(200)
      .json({ message: "Project rated successfully", rating: avgRating });
  } catch (err) {
    res.status(500).json({ message: "Error rating project", error: err });
  }
};

exports.getProjectsGroupedBySDG = async (req, res) => {
  try {
    const projects = await Project.find({ status: "approved" });

    const grouped = {};
    projects.forEach((project) => {
      project.sdgs.forEach((sdg) => {
        if (!grouped[sdg]) grouped[sdg] = [];
        grouped[sdg].push({
          _id: project._id,
          title: project.title,
        });
      });
    });

    res.status(200).json({ success: true, data: grouped });
  } catch (err) {
    console.error("Error grouping by SDG", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const buildMonthlySeries = (startDate, endDate, aggregates) => {
  const result = [];
  const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  while (cursor <= end) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth() + 1;
    const label = cursor.toLocaleString("en-US", { month: "short" });
    const match = aggregates.find(
      (item) => item._id.year === year && item._id.month === month
    );
    result.push({ month: label, count: match ? match.count : 0 });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return result;
};

exports.getDebugInfo = async (req, res) => {
  try {
    console.log("Debug endpoint called");
    console.log("req.userId:", req.userId);

    const user = await User.findById(req.userId);
    console.log("User found:", !!user);
    console.log("User data:", user ? { _id: user._id, email: user.email, role: user.role } : null);

    if (!user) {
      return res.status(200).json({
        success: true,
        auth: { userId: req.userId, userFound: false },
        message: "User not found in database"
      });
    }

    res.status(200).json({
      success: true,
      auth: {
        userId: req.userId,
        userFound: true,
        email: user.email,
        role: user.role,
        isAdmin: user.role === "Admin"
      }
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAdminAnalyticsSummary = async (req, res) => {
  try {
    console.log("Starting getAdminAnalyticsSummary...");
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    console.log("Date range:", start, "to", now);

    const [
      totalProjects,
      totalUsers,
      projectsByStatusRaw,
      usersByRoleRaw,
      projectsByMonthRaw,
    ] = await Promise.all([
      Project.countDocuments(),
      User.countDocuments(),
      Project.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }]),
      Project.aggregate([
        { $match: { createdAt: { $gte: start } } },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);

    console.log("Aggregation results received");
    console.log("Total projects:", totalProjects);
    console.log("Total users:", totalUsers);

    const projectsByStatus = ["pending", "approved", "rejected"].map(
      (status) => {
        const match = projectsByStatusRaw.find((item) => item._id === status);
        return { status, count: match ? match.count : 0 };
      }
    );

    const usersByRole = usersByRoleRaw.map((role) => ({
      role: role._id || "Unknown",
      count: role.count,
    }));

    const projectsByMonth = buildMonthlySeries(start, now, projectsByMonthRaw);

    console.log("Response data prepared successfully");
    res.status(200).json({
      success: true,
      data: {
        totals: {
          projects: totalProjects,
          users: totalUsers,
        },
        projectsByStatus,
        usersByRole,
        projectsByMonth,
      },
    });
  } catch (error) {
    console.error("Error building admin analytics summary:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};