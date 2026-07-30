import React, { useState, useEffect } from "react";
import "./FacultyDashboard.mobile.css";
import { motion } from "../motionless";
import { useParams } from "react-router-dom";
import FacultyProfile from "../components/FacultyProfile";
import AutoScrollToTop from "../components/AutoScrollToTop";
import ProjectCard from "../components/ProjectCard";
import useLeaderboardRankings from "../hooks/useLeaderboardRankings";
import { GraduationCap } from "lucide-react";

const FacultyDashboard = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState({});
  const [mentorProjects, setMentorProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const { getProjectRankings } = useLeaderboardRankings();
  const [statusFilter, setStatusFilter] = useState("all");

  // Function to get proper image URL
  const getImageUrl = (mediaPath) => {
    if (!mediaPath) return null;
    if (mediaPath.startsWith("http")) {
      return mediaPath;
    }
    
    mediaPath = mediaPath.replace(/\\/g, "/");
    return `${import.meta.env.VITE_BACKEND_URL}/${mediaPath}`;
  };

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/details/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch faculty details");

        const data = await res.json();
        console.log("Faculty details:", data);

        if (data && data.fullName) {
          console.log("mentor name", data.fullName);
          setFaculty(data);

          // Fetch mentor projects after setting faculty
          try {
            const projectRes = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/projects/mentor/${data.fullName}`
            );
            
            const projectData = await projectRes.json();
            console.log("Mentor projects response:", projectData);

            if (projectData.success && Array.isArray(projectData.projects)) {
              setMentorProjects(projectData.projects);
              console.log("Mentor projects fetched:", projectData.projects.length);
            } else {
              console.warn("Unexpected response format:", projectData);
              setMentorProjects([]);
            }
          } catch (error) {
            console.error("Error fetching mentor projects:", error);
            setMentorProjects([]);
          }
        }
      } catch (error) {
        console.error("Error fetching faculty details:", error);
      }
    };

    if (id) {
      fetchFacultyDetails();
    }
  }, [id]);

  const filteredProjects =
    statusFilter === "all"
      ? mentorProjects
      : mentorProjects.filter((project) => project.status === statusFilter);

  return (
    <>
      <AutoScrollToTop />
      <FacultyProfile faculty={faculty} />
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
              <GraduationCap size={32} style={{ color: 'var(--accent-primary)' }} />
              <h1 className="text-4xl sm:text-5xl font-bold text-center" style={{ color: 'var(--accent-primary)' }}>
                Your Mentored Projects
              </h1>
            </div>
            <p className="text-center text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
              Showing {filteredProjects.length} of {mentorProjects.length} project{mentorProjects.length !== 1 ? 's' : ''} under your mentorship
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
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 faculty-dashboard-grid"
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
                <GraduationCap size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
                <p className="text-xl font-medium text-center" style={{ color: 'var(--text-secondary)' }}>
                  {mentorProjects.length > 0 ? "No projects match this status" : "No mentored projects found"}
                </p>
                <p className="text-sm mt-2 text-center" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>
                  {mentorProjects.length > 0
                    ? "Try a different filter to see more projects"
                    : "You'll see projects here when students add you as a mentor"}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default FacultyDashboard;
