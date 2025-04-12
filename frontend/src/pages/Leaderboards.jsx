import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import axios from "axios";
import AutoScrollToTop from "../components/AutoScrollToTop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLeaderboardRankings from "../hooks/useLeaderboardRankings";
import RankingBadge from "../components/RankingBadge";

const Leaderboards = () => {
  const [activeTab, setActiveTab] = useState("thisWeek");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const { weeklyLeaderboard, overallLeaderboard } = useLeaderboardRankings();

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");

        // Ensure projects are correctly extracted
        setProjects(
          Array.isArray(response.data.data) ? response.data.data : []
        );

        console.log("Fetched Projects:", response.data.data); // Debugging log
      } catch (err) {
        setError(err);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles container loaded", container);
  }, []);

  // Get this week's projects (last 7 days)
  const getThisWeekProjects = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return projects
      .filter(
        (project) =>
          new Date(project.createdAt) >= sevenDaysAgo &&
          project.status === "approved"
      )
      .sort((a, b) => b.rating - a.rating || b.likes - a.likes)
      .slice(0, 5); // Top 5 for this week
  };

  const notifyTop5Projects = async () => {
    const top5 = getThisWeekProjects();
    const systemSenderId = "67fa06c5154775df966e6942";

    const notifyPromises = top5.flatMap((project) => {
      const recipients = [...project.teammates, project.mentor];
      return recipients.map((fullName) =>
        axios.post("http://localhost:5000/api/notifications", {
          sentBy: systemSenderId,
          fullName,
          title: "🎉 Your project is in the Top 5 this week!",
          message: `Congrats! Your project "${project.title}" is among the top-rated projects this week.`,
          type: "achievement",
        })
      );
    });

    await Promise.all(notifyPromises);
    toast.success("Top 5 projects notified successfully!");
  };

  // Get overall top projects
  const getOverallProjects = () => {
    return projects
      .filter((project) => project.status === "approved")
      .sort((a, b) => b.rating - a.rating || b.likes - a.likes)
      .slice(0, 10); // Top 10 overall
  };

  const notifyTopOverallProjects = async () => {
    const top10 = getOverallProjects();
    console.log(top10);
    const systemSenderId = "67fa06c5154775df966e6942";

    const notifyPromises = top10.flatMap((project) => {
      const recipients = [...project.teammates, project.mentor];
      return recipients.map((fullName) =>
        axios.post("http://localhost:5000/api/notifications", {
          sentBy: systemSenderId,
          fullName,
          title: "🏆 Top 10 Project!",
          message: `Your project "${project.title}" is ranked in the Top 10 overall projects! Great job!`,
          type: "achievement",
        })
      );
    });

    await Promise.all(notifyPromises);
    toast.success("Top 5 projects notified successfully!");
  };

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black min-h-screen overflow-hidden">
      <AutoScrollToTop />
      <ToastContainer position="top-right" autoClose={5000} />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "pull",
              },
              onHover: {
                enable: true,
                mode: "attract",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: false,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "bottom",
              enable: true,
              outModes: {
                default: "out",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "polygon",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-5xl font-lilita mt-10 md:text-6xl font-bold text-center mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Project Leaderboards
        </motion.h1>
        {role === "Admin" && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full py-4">
            <button
              onClick={notifyTopOverallProjects}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 w-full sm:w-auto"
              aria-label="Notify top 10 projects overall"
            >
              Notify Top 10 Projects Overall
            </button>

            <button
              onClick={notifyTop5Projects}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 w-full sm:w-auto"
              aria-label="Notify Top 5 Projects This Week"
            >
              Notify Top 5 Projects This Week
            </button>
          </div>
        )}
        {/* Competitive Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-full p-1 flex space-x-1 shadow-lg">
            <motion.button
              onClick={() => setActiveTab("thisWeek")}
              className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                activeTab === "thisWeek"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {activeTab === "thisWeek" && (
                <motion.span
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-medium">This Week</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("overall")}
              className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                activeTab === "overall"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {activeTab === "overall" && (
                <motion.span
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-medium">Overall</span>
            </motion.button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 p-4 rounded-lg text-center">
            Error loading projects. Please try again later.
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "thisWeek" && (
              <ProjectList
                key="thisWeek"
                projects={getThisWeekProjects()}
                title="Top Projects This Week"
                emptyMessage="No projects from this week. Check back soon!"
              />
            )}
            {activeTab === "overall" && (
              <ProjectList
                key="overall"
                projects={getOverallProjects()}
                title="Top Overall Projects"
                emptyMessage="No projects available yet."
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

const ProjectList = ({ projects, title, emptyMessage }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-white mb-6 text-center">{title}</h2>

      {projects.length === 0 ? (
        <div className="text-center text-gray-400 p-8 bg-gray-800 bg-opacity-50 rounded-lg">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id || index}
              project={project}
              rank={index + 1}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
};

// In your Leaderboards.js file
const ProjectCard = ({ project, rank }) => {
  const navigate = useNavigate();

  // Map backend category to the frontend category format
  const getCategoryKey = (category) => {
    const map = {
      Website: "website",
      Game: "game",
      Video: "video",
      Documentary: "documentary",
      "Digital Art": "digitalart",
    };
    return map[category] || "website"; // Default to website if not found
  };

  const categoryColors = {
    game: "from-blue-500 to-indigo-600",
    website: "from-green-500 to-teal-600",
    video: "from-purple-500 to-pink-600",
    documentary: "from-yellow-500 to-orange-600",
    digitalart: "from-red-500 to-pink-600",
  };

  // Map SDG names to numbers for the color mapping
  const getSdgNumber = (sdgName) => {
    const sdgMap = {
      "No Poverty": 1,
      "Zero Hunger": 2,
      "Good Health and Well-being": 3,
      "Quality Education": 4,
      "Gender Equality": 5,
      "Clean Water and Sanitation": 6,
      "Affordable and Clean Energy": 7,
      "Decent Work and Economic Growth": 8,
      "Industry, Innovation, and Infrastructure": 9,
      "Reduced Inequality": 10,
      "Sustainable Cities and Communities": 11,
      "Responsible Consumption and Production": 12,
      "Climate Action": 13,
      "Life Below Water": 14,
      "Life on Land": 15,
      "Peace, Justice and Strong Institutions": 16,
      "Partnerships for the Goals": 17,
    };
    return sdgMap[sdgName] || 1;
  };

  const sdgInfo = {
    1: { name: "No Poverty", color: "bg-red-500" },
    2: { name: "Zero Hunger", color: "bg-orange-500" },
    3: { name: "Good Health", color: "bg-green-500" },
    4: { name: "Quality Education", color: "bg-blue-500" },
    5: { name: "Gender Equality", color: "bg-yellow-500" },
    6: { name: "Clean Water", color: "bg-teal-500" },
    7: { name: "Clean Energy", color: "bg-indigo-500" },
    8: { name: "Economic Growth", color: "bg-purple-500" },
    9: { name: "Innovation", color: "bg-pink-500" },
    10: { name: "Reduced Inequalities", color: "bg-gray-500" },
    11: { name: "Sustainable Cities", color: "bg-lime-500" },
    12: { name: "Responsible Consumption", color: "bg-emerald-500" },
    13: { name: "Climate Action", color: "bg-cyan-500" },
    14: { name: "Life Below Water", color: "bg-sky-500" },
    15: { name: "Life on Land", color: "bg-fuchsia-500" },
    16: { name: "Peace & Justice", color: "bg-violet-500" },
    17: { name: "Partnerships", color: "bg-rose-500" },
  };

  // Get the primary SDG for display (first one in the array)
  const primarySdg =
    project.sdgs && project.sdgs.length > 0 ? getSdgNumber(project.sdgs[0]) : 1;

  // Get media URL (first image in the array)
  const getMediaUrl = () => {
    if (project.media && project.media.length > 0) {
      // Convert relative path to absolute URL
      const mediaPath = project.media[0];
      return mediaPath.startsWith("http")
        ? mediaPath
        : `http://localhost:5000/${mediaPath.replace(/\\/g, "/")}`;
    }
    // Fallback image
    return "https://via.placeholder.com/300x200?text=No+Image";
  };

  const categoryKey = getCategoryKey(project.category);

  return (
    <motion.div
      className="relative bg-gray-800 bg-opacity-80 rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-2xl border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Rank Badge with Gradient */}
      <div
        className={`absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br ${categoryColors[categoryKey]} flex items-center justify-center text-2xl font-bold text-white shadow-lg z-10`}
      >
        {rank}
      </div>

      {/* Leaderboard Badge */}
      {/* <div className="absolute top-4 right-4 z-20">
        <RankingBadge type={leaderboardType} rank={rank} />
      </div> */}

      {/* Project Image */}
      <div className="flex-shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
        <img
          src={getMediaUrl()}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/300x200?text=Error+Loading+Image";
          }}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl max-w-52 font-bold text-white truncate ">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(project.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-400 fill-current"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xl font-bold text-yellow-400">
                {project.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <span
            className={`bg-gradient-to-r ${categoryColors[categoryKey]} text-white text-base px-6 py-2 rounded-full`}
          >
            {project.category}
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed line-clamp-2 max-h-12 overflow-hidden">
          {project.description.length > 100
            ? project.description.slice(0, 100) + "..."
            : project.description}
        </p>

        <div className="flex flex-col items-start">
          <motion.button
            onClick={() => navigate(`/details/${project._id}`)}
            className="px-6 -ml-1 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full hover:from-red-600 hover:to-yellow-600 transition-all shadow-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            View Details
          </motion.button>

          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-1 mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white font-medium">{project.likes}</span>
            </div>

            <div className="text-sm text-gray-400">
              <span className="font-medium text-white">SDG:</span>{" "}
              {project.sdgs && project.sdgs.length > 0 ? (
                <span className="inline-block bg-green-500/10 px-2 py-1 rounded-full text-green-300">
                  {project.sdgs[0]}
                </span>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Leaderboards;
