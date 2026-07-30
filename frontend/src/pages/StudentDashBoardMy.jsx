import React, { useState, useEffect } from "react";
import "./StudentDashBoardMy.mobile.css";
import { motion } from "../motionless";
import UserProfile from "../components/UserProfile";
import AutoScrollToTop from "../components/AutoScrollToTop";
import ProjectCard from "../components/ProjectCard";
import useLeaderboardRankings from "../hooks/useLeaderboardRankings";
import { useParams } from "react-router-dom";
import { Briefcase } from "lucide-react";

const StudentDashboard = () => {
  const { id } = useParams();
  const [hoveredProject, setHoveredProject] = useState(null);
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [profilePic, setprofilePic] = useState("");
  const { getProjectRankings } = useLeaderboardRankings();
  const [statusFilter, setStatusFilter] = useState("all");

  const getImageUrl = (mediaPath) => {
    if (!mediaPath) return "";
    if (mediaPath.startsWith("http")) return mediaPath;
    return `${import.meta.env.VITE_BACKEND_URL}/${mediaPath.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/details/${id}`
        );
        const data = await res.json();
        console.log(data);

        if (data) {
          setUsername(data.fullName);
          setprofilePic(data.profileImage);
          fetchProjects(data.fullName);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    const fetchProjects = async (username) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/projects/user/${username}`
        );
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setProjects(data.projects);
          console.log(data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchUsername();
  }, [id]);

  const filteredProjects =
    statusFilter === "all"
      ? projects
      : projects.filter((project) => project.status === statusFilter);

  return (
    <>
      <AutoScrollToTop />
      <UserProfile userProfile={username} profilePic={profilePic} />
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-8 pb-12 px-4 sm:px-8"
        >
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Briefcase size={32} style={{ color: 'var(--accent-primary)' }} />
              <h1 className="text-4xl sm:text-5xl font-bold text-center" style={{ color: 'var(--accent-primary)' }}>
                Your Projects
              </h1>
            </div>
            <p className="text-center text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
              Showing {filteredProjects.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center justify-center mt-6">
              <div className="relative w-full max-w-xs">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 rounded-xl appearance-none border-2 focus:outline-none transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-accent)',
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  ▼
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative min-h-fit p-4 sm:p-8 md:p-12"
        >
          <div className="container mx-auto">
            {filteredProjects.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 student-dashboard-grid"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.2,
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {filteredProjects.map(project => {
                  const rankings = getProjectRankings(project._id);

                  return (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      onHover={setHoveredProject}
                      isHovered={hoveredProject === project._id}
                      getImageUrl={getImageUrl}
                      rankings={rankings}
                      showStatusBadge
                    />
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-24 rounded-2xl border-2"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}
              >
                <Briefcase size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
                <p className="text-xl font-medium text-center" style={{ color: 'var(--text-secondary)' }}>
                  {projects.length > 0 ? "No projects match this status" : "No projects found"}
                </p>
                <p className="text-sm mt-2 text-center" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>
                  {projects.length > 0
                    ? "Try a different filter to see more projects"
                    : "Create your first project to get started!"}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default StudentDashboard;
