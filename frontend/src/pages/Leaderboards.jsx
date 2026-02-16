import React, { useState, useEffect } from "react";
import "./Leaderboards.mobile.css";
import { motion, AnimatePresence } from "../motionless";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AutoScrollToTop from "../components/AutoScrollToTop";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trophy, Medal, Star } from "lucide-react";

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
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects`);

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
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`, {
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
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`, {
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

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <AutoScrollToTop />
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10" style={{ color: 'var(--amber-primary)' }} />
            <h1 
              className="text-5xl md:text-6xl font-bold"
              style={{
                color: '#FFD700'
              }}
            >
              Project Leaderboards
            </h1>
            <Trophy className="w-10 h-10" style={{ color: 'var(--accent-primary)' }} />
          </div>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Celebrating the most impactful and highly-rated projects
          </p>
        </motion.div>
        {role === "Admin" && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full py-6 mb-4">
            <motion.button
              onClick={notifyTopOverallProjects}
              className="px-6 py-3 text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 flex-1 sm:flex-none font-medium"
              style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-hover)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary)'}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Trophy className="w-5 h-5" />
              Notify Top 10 Overall
            </motion.button>

            <motion.button
              onClick={notifyTop5Projects}
              className="px-6 py-3 text-white rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 flex-1 sm:flex-none font-medium"
              style={{ backgroundColor: 'var(--amber-primary)', borderColor: 'var(--amber-hover)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--amber-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--amber-primary)'}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Star className="w-5 h-5" />
              Notify Top 5 This Week
            </motion.button>
          </div>
        )}
        {/* Competitive Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/20 rounded-full p-2 flex gap-2 border-2" style={{ borderColor: 'var(--border-accent)' }}>
            <motion.button
              onClick={() => setActiveTab("thisWeek")}
              className={`px-8 py-3 rounded-full transition-all duration-300 relative font-semibold ${
                activeTab === "thisWeek"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {activeTab === "thisWeek" && (
                <motion.span
                  layoutId="tabIndicator"
                  className="absolute inset-0 rounded-full z-0"
                  style={{ backgroundColor: 'var(--amber-primary)' }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Star className="w-4 h-4" />
                This Week
              </span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("overall")}
              className={`px-8 py-3 rounded-full transition-all duration-300 relative font-semibold ${
                activeTab === "overall"
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {activeTab === "overall" && (
                <motion.span
                  layoutId="tabIndicator"
                  className="absolute inset-0 rounded-full z-0"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Overall
              </span>
            </motion.button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : error ? (
          <div className="border text-red-100 p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(239, 83, 80, 0.2)', borderColor: 'var(--error)' }}>
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
      <h2 
        className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3"
        style={{ color: 'var(--accent-primary)' }}
      >
        <Star className="w-6 h-6" />
        {title}
        <Star className="w-6 h-6" />
      </h2>

      {projects.length === 0 ? (
        <div className="text-center p-12 rounded-2xl border-2" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}>
          <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: 'var(--accent-light)' }} />
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-6">
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

  // Get media URL (first image in the array)
  const getMediaUrl = () => {
    if (project.media && project.media.length > 0) {
      // Convert relative path to absolute URL
      const mediaPath = project.media[0];
      return mediaPath.startsWith("http")
        ? mediaPath
        : `${import.meta.env.VITE_BACKEND_URL}/${mediaPath.replace(/\\/g, "/")}`;
    }
    // Fallback image
    return "https://via.placeholder.com/300x200?text=No+Image";
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return { icon: "🥇", color: "#FFD700", label: "1st Place" };
    if (rank === 2) return { icon: "🥈", color: "#C0C0C0", label: "2nd Place" };
    if (rank === 3) return { icon: "🥉", color: "#CD7F32", label: "3rd Place" };
    return { icon: rank, color: 'var(--accent-primary)', label: `#${rank}` };
  };

  const badge = getRankBadge(rank);

  return (
    <motion.div
      className="relative rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-xl border-2 overflow-hidden"
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : 'var(--border-accent)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: rank <= 3 ? '0 20px 40px rgba(47, 167, 111, 0.2)' : '0 15px 30px rgba(47, 167, 111, 0.1)'
      }}
    >
      {/* Decorative gradient border for top 3 */}
      {rank <= 3 && (
        <div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
          style={{ 
            background: rank === 1 
              ? 'linear-gradient(90deg, #FFD700, #FFA500)' 
              : rank === 2 
              ? 'linear-gradient(90deg, #C0C0C0, #A9A9A9)'
              : 'linear-gradient(90deg, #CD7F32, #B87333)'
          }}
        ></div>
      )}

      {/* Rank Badge */}
      <div
        className="absolute -top-4 -left-4 w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-xl z-10 border-4"
        style={{ 
          backgroundColor: rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : 'var(--accent-primary)',
          borderColor: 'var(--bg-secondary)',
          color: rank <= 3 ? '#000' : '#fff'
        }}
      >
        <span>{badge.icon}</span>
      </div>

      {/* Project Image */}
      <div className="flex-shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden shadow-lg relative leaderboard-project-image">
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

      <div className="flex-1 flex flex-col gap-4">
        {/* Title and Category */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white truncate mb-2 leading-tight">
              {project.title}
            </h3>
            {/* Star Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(project.rating) ? "fill-current" : ""}
                    style={{ 
                      color: i < Math.floor(project.rating) ? 'var(--amber-primary)' : 'var(--accent-light)'
                    }}
                  />
                ))}
              </div>
              <span className="text-lg font-bold ml-1" style={{ color: 'var(--amber-primary)' }}>
                {project.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <motion.span
            className="px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap"
            style={{ 
              backgroundColor: 'var(--accent-primary)', 
              color: 'white',
            }}
            whileHover={{ scale: 1.05 }}
          >
            {project.category}
          </motion.span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
          {project.description.length > 120
            ? project.description.slice(0, 120) + "..."
            : project.description}
        </p>

        {/* Stats Row */}
        <div className="flex gap-6 items-center text-sm">
          <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
            <Medal className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
            <span><strong className="text-white">{project.likes}</strong> likes</span>
          </div>
          {project.sdgs && project.sdgs.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(47, 167, 111, 0.1)', borderLeft: '2px solid var(--accent-primary)' }}>
              <span style={{ color: 'var(--accent-primary)' }} className="text-xs font-semibold">{project.sdgs[0]}</span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <motion.button
          onClick={() => navigate(`/details/${project._id}`)}
          className="px-6 py-2 rounded-lg transition-all shadow-md flex items-center gap-2 font-medium text-white self-start mt-2"
          style={{ 
            backgroundColor: 'var(--accent-primary)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary)'}
          whileHover={{ scale: 1.05 }}
        >
          View Project
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Leaderboards;

