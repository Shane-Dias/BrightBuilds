import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileCheck,
  LayoutGrid,
  Trophy,
  Bell,
  FileText,
  Goal,
  Search,
  Filter,
  Download,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Trash2,
  Edit,
  Send,
  BarChart2,
  PieChart,
} from "lucide-react";
import { loadFull } from "tsparticles";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("userManagement");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSDG, setSelectedSDG] = useState("all");
  const [expandedProject, setExpandedProject] = useState(null);

  // Sample data initialization
  useEffect(() => {
    // Mock data for projects
    setProjects([
      {
        id: 1,
        title: "Eco-Friendly App",
        author: "Jane Doe",
        type: "Mobile App",
        sdgs: [7, 11, 13],
        status: "pending",
        description:
          "An app that helps users track their carbon footprint and suggests eco-friendly alternatives.",
        ratings: 4.5,
        date: "2023-10-15",
      },
      {
        id: 2,
        title: "Clean Water Initiative",
        author: "John Smith",
        type: "Research",
        sdgs: [6],
        status: "approved",
        description:
          "A research project on improving water filtration systems in rural areas.",
        ratings: 4.8,
        date: "2023-09-22",
      },
      // Add more projects as needed
    ]);

    // Mock data for users
    setUsers([
      {
        id: 1,
        name: "Alex Johnson",
        email: "alex@university.edu",
        role: "student",
        status: "active",
        projects: 3,
      },
      {
        id: 2,
        name: "Dr. Sarah Williams",
        email: "s.williams@university.edu",
        role: "faculty",
        status: "active",
        projects: 5,
      },
      // Add more users as needed
    ]);
  }, []);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesLoaded = async (container) => {
    console.log("Particles loaded", container);
  };

  const handleApproveProject = (projectId) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, status: "approved" } : project
      )
    );
  };

  const handleRejectProject = (projectId) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, status: "rejected" } : project
      )
    );
  };


  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSDG =
      selectedSDG === "all" || project.sdgs.includes(Number(selectedSDG));
    return matchesSearch && matchesSDG;
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "userManagement":
        return (
          <div className="bg-white/5 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                User Management
              </h3>
              <div className="relative w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 text-gray-300">
                  <tr>
                    <th className="py-3 px-4 text-left rounded-tl-lg">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Projects</th>
                    <th className="py-3 px-4 text-left rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-white">{user.name}</td>
                      <td className="py-3 px-4 text-gray-400">{user.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.role === "student"
                              ? "bg-blue-500/20 text-blue-400"
                              : user.role === "faculty"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {user.projects}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="p-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                            <Edit size={16} className="text-blue-400" />
                          </button>
                          <button className="p-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                            <Trash2 size={16} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "projectModeration":
        return (
          <div className="bg-white/5 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Project Moderation
              </h3>
              <div className="flex space-x-4">
                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <select
                    className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                    value={selectedSDG}
                    onChange={(e) => setSelectedSDG(e.target.value)}
                  >
                    <option value="all">All SDGs</option>
                    {[
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    ].map((sdg) => (
                      <option key={sdg} value={sdg}>
                        SDG {sdg}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative w-64">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 rounded-xl p-4 shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-medium text-white">
                        {project.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        by {project.author} • {project.type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-1">
                        {project.sdgs.map((sdg) => (
                          <span
                            key={sdg}
                            className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold"
                          >
                            {sdg}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          project.status === "approved"
                            ? "bg-green-500/20 text-green-400"
                            : project.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>
                      <button
                        onClick={() =>
                          setExpandedProject(
                            expandedProject === project.id ? null : project.id
                          )
                        }
                        className="text-gray-400 hover:text-white"
                      >
                        {expandedProject === project.id ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-700"
                    >
                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          Submitted on: {project.date} • Rating:{" "}
                          {project.ratings}/5
                        </div>
                        {project.status === "pending" && (
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleApproveProject(project.id)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-green-600/30 hover:bg-green-600/40 rounded-lg text-green-400 transition-colors"
                            >
                              <CheckCircle2 size={16} />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleRejectProject(project.id)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-red-600/30 hover:bg-red-600/40 rounded-lg text-red-400 transition-colors"
                            >
                              <XCircle size={16} />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="bg-white/5 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-6">
              Reports & Insights
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Project Trends */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">
                    Project Trends
                  </h4>
                  <button className="p-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Download size={16} className="text-gray-400" />
                  </button>
                </div>
                <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
                  <BarChart2 size={48} className="text-gray-600" />
                </div>
              </div>

              {/* SDG Distribution */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">
                    SDG Distribution
                  </h4>
                  <button className="p-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Download size={16} className="text-gray-400" />
                  </button>
                </div>
                <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
                  <PieChart size={48} className="text-gray-600" />
                </div>
              </div>
            </div>

            {/* Data Export */}
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h4 className="text-lg font-medium text-white mb-4">
                Export Data
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <FileText size={24} className="text-blue-400 mb-2" />
                  <span className="text-white">Projects</span>
                  <span className="text-xs text-gray-400">CSV, JSON</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <Users size={24} className="text-purple-400 mb-2" />
                  <span className="text-white">Users</span>
                  <span className="text-xs text-gray-400">CSV, JSON</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <Trophy size={24} className="text-yellow-400 mb-2" />
                  <span className="text-white">Ratings</span>
                  <span className="text-xs text-gray-400">CSV, JSON</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <Goal size={24} className="text-green-400 mb-2" />
                  <span className="text-white">SDGs</span>
                  <span className="text-xs text-gray-400">CSV, JSON</span>
                </button>
              </div>
            </div>
          </div>
        );

      case "sdgTracking":
        return (
          <div className="bg-white/5 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-6">
              SDG Tracking
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
                (sdg) => (
                  <motion.div
                    key={sdg}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="bg-gray-800/50 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-white font-bold mb-2">
                      {sdg}
                    </div>
                    <span className="text-sm text-center text-gray-300">
                      SDG {sdg}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {Math.floor(Math.random() * 20) + 5} projects
                    </span>
                  </motion.div>
                )
              )}
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6">
              <h4 className="text-lg font-medium text-white mb-4">
                SDG Impact Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    17
                  </div>
                  <div className="text-gray-400">SDGs Addressed</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">89%</div>
                  <div className="text-gray-400">Projects Mapped</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-400">142</div>
                  <div className="text-gray-400">Total Contributions</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Dashboard Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("userManagement")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeTab === "userManagement"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <Users size={18} />
                <span>User Management</span>
              </button>

              <button
                onClick={() => setActiveTab("projectModeration")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeTab === "projectModeration"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <FileCheck size={18} />
                <span>Project Moderation</span>
              </button>

              <button
                onClick={() => setActiveTab("reports")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeTab === "reports"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <FileText size={18} />
                <span>Reports</span>
              </button>

              <button
                onClick={() => setActiveTab("sdgTracking")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeTab === "sdgTracking"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <Goal size={18} />
                <span>SDG Tracking</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
