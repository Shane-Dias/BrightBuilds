import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  Users,
  FileCheck,
  // LayoutGrid,
  // Trophy,
  Bell,
  FileText,
  Goal,
  Search,
  // Filter,
  Download,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Trash2,
  // Edit,
  // Send,
  BarChart2,
  PieChart,
} from "lucide-react";
import { loadFull } from "tsparticles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import {
//   Pie,
//   Cell,
//   Tooltip,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
import AutoScrollToTop from "../components/AutoScrollToTop";
import Reports from "../components/Reports";
import SdgTracking from "../components/SdgTracking";
// import html2canvas from "html2canvas";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projectModeration");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSDG, setSelectedSDG] = useState("all");
  const [expandedProject, setExpandedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample data initialization

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesLoaded = async (container) => {
    console.log("Particles loaded", container);
  };
  const navigate = useNavigate();
  const viewDetails = (projectId) => {
    navigate(`/details/${projectId}`);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Log the token

      console.log("Making API request to fetch users...");
      const response = await axios.get(
        `http://localhost:5000/api/users/admin/all-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", response.data); // Log the full response

      if (response.data.success) {
        const formattedUsers = response.data.users.map((user) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          role: user.role,
          status: "active",
          projects: "N/A",
        }));

        console.log("Formatted users:", formattedUsers); // Log formatted users
        setUsers(formattedUsers);
      } else {
        console.log("Response success was false:", response.data.message);
      }
    } catch (error) {
      console.error("Error object:", error);
      console.error("Error response:", error.response?.data); // Log detailed error info
      console.error("Failed to fetch users:", error.message);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Delete this user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Tailwind red-500
      cancelButtonColor: "#4b5563", // Tailwind gray-600
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      background: "#1f2937", // Tailwind gray-800
      color: "#ffffff", // White text
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/users/admin/delete-user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted.",
          background: "#1f2937",
          color: "#ffffff",
          confirmButtonColor: "#10b981", // green-500
        });

        toast.success("User deleted successfully");
        setUsers(users.filter((user) => user.id !== userId)); // Make sure it's _id
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete user",
        background: "#1f2937",
        color: "#ffffff",
      });
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/pendingprojects"
        );
        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching pending projects:", error);
      }
    };
    fetchPendingProjects();
  }, []);

  const handleUpdateProjectStatus = async (
    id,
    status,
    teammates,
    projectTitle,
    mentor
  ) => {
    try {
      // 1. Update status first
      await axios.put(`http://localhost:5000/api/admin/update-status/${id}`, {
        status,
      });

      // 2. Send notification to all teammates (by fullName)
      const adminId = localStorage.getItem("userId");
      console.log("Admin id:", adminId);

      const notifyPromises = teammates.map((fullName) =>
        axios.post("http://localhost:5000/api/notifications", {
          sentBy: adminId,
          fullName,
          title: `Project ${status}`,
          message: `Your project "${projectTitle}" has been ${status.toLowerCase()} by the Admin.`,
          type: "projectStatus",
        })
      );

      // Also notify the mentor
      if (mentor) {
        notifyPromises.push(
          axios.post("http://localhost:5000/api/notifications", {
            sentBy: adminId,
            fullName: mentor,
            title: `Project ${status}`,
            message: `Project "${projectTitle}" you are mentoring has been ${status.toLowerCase()} by the Admin.`,
            type: "projectStatus",
          })
        );
      }

      await Promise.all(notifyPromises);

      // 3. Update UI
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      console.error(
        "Error updating project status or sending notifications:",
        error
      );
    }
  };

  const filteredProjects = projects.filter((projects) => {
    const matchesSDG =
      selectedSDG === "all" ||
      projects.sdgs.some((sdg) => Number(sdg) === Number(selectedSDG));

    const matchesSearch = searchTerm
      ? projects.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesSDG && matchesSearch;
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("filtered projects admin", filteredProjects);

  const handleProfileClick = async (userName) => {
    try {
      console.log(userName);
      const response = await fetch(
        `http://localhost:5000/api/users/userDetails/${userName}`
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.error("Error fetching user:", data.message);
        return;
      }

      const userId = data._id; // Assuming the API returns `_id`

      console.log("User ID:", userId);
      navigate(`/userdetails/${userId}`);
    } catch (error) {
      console.error("❌ Error fetching user details:", error);
    }
  };

  //Trends and Pie chart:

  const renderTabContent = () => {
    switch (activeTab) {
      case "projectModeration":
        return (
          <>
            <AutoScrollToTop />
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
              <ToastContainer position="top-right" autoClose={5000} />
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Project Moderation
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative w-full sm:w-64">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-xl p-5 shadow-md border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div>
                          <h4 className="text-lg font-medium text-white">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            by {project.teammates.join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {project.sdgs.map((sdg) => (
                              <span
                                key={sdg}
                                className="px-3 py-2 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold text-white"
                              >
                                {sdg}
                              </span>
                            ))}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : project.status === "approved"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {project.status.charAt(0).toUpperCase() +
                              project.status.slice(1)}
                          </span>
                          <button
                            onClick={() =>
                              setExpandedProject(
                                expandedProject === project._id
                                  ? null
                                  : project._id
                              )
                            }
                            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
                            aria-label={
                              expandedProject === project._id
                                ? "Collapse details"
                                : "Expand details"
                            }
                          >
                            {expandedProject === project._id ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </button>
                        </div>
                      </div>

                      {expandedProject === project._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-gray-700"
                        >
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                            <div className="text-sm text-gray-400">
                              Submitted on:{" "}
                              {new Date(project.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() =>
                                  handleUpdateProjectStatus(
                                    project._id,
                                    "approved",
                                    project.teammates,
                                    project.title,
                                    project.mentor
                                  )
                                }
                                className="px-4 py-2 bg-green-600/30 hover:bg-green-600/50 rounded-lg text-green-400 font-medium flex items-center gap-2 transition-colors"
                              >
                                <CheckCircle2 size={16} /> Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateProjectStatus(
                                    project._id,
                                    "rejected",
                                    project.teammates,
                                    project.title,
                                    project.mentor
                                  )
                                }
                                className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-red-400 font-medium flex items-center gap-2 transition-colors"
                              >
                                <XCircle size={16} /> Reject
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => viewDetails(project._id)}
                            className="bg-black text-lg rounded-lg px-5 py-3 mt-4"
                          >
                            View Details
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <Search className="mx-auto text-gray-500 mb-2" size={32} />
                    <p className="text-gray-400">
                      No projects found matching your criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        );

      case "userManagement":
        return (
          <div className="bg-white/5 rounded-xl p-6 shadow-lg">
            <AutoScrollToTop />
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

            {loading ? (
              <div className="text-center py-8 text-white">
                Loading users...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 text-gray-300">
                    <tr>
                      <th className="py-3 px-4 text-left rounded-tl-lg">
                        Name
                      </th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Role</th>
                      <th className="py-3 px-4 text-left rounded-tr-lg">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-white">
                            <span
                              className="inline-flex items-center gap-1 text-yellow-300 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer font-medium border border-yellow-300/30 hover:border-yellow-300 shadow-sm hover:shadow"
                              onClick={() => handleProfileClick(user.name)}
                            >
                              {user.name}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-400">
                            {user.email}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                user.role === "student"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : user.role === "faculty"
                                  ? "bg-purple-500/20 text-purple-400"
                                  : user.role === "admin"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                className="p-1.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                                onClick={() => deleteUser(user.id)}
                              >
                                <Trash2 size={16} className="text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-8 text-center text-gray-400"
                        >
                          No users found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "reports":
<<<<<<< HEAD
        return (
          <>
          <AutoScrollToTop/>
          <Reports/>
          </>
        );

      case "sdgTracking":
        return (
          <>
          <AutoScrollToTop/>
        <SdgTracking/>
        </>
        );
=======
        return <Reports />;

      case "sdgTracking":
        return <SdgTracking />;
>>>>>>> 47e344a937a097c0ebaa3b38d82b68dbcadb876d

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Dashboard Content */}
      <AutoScrollToTop />
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
