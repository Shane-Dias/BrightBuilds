import React, { useState, useEffect } from "react";
import "./StudentProjects.mobile.css";
import { motion } from "../motionless";
import AutoScrollToTop from "./AutoScrollToTop";
import ProjectCard from "./ProjectCard";
import useLeaderboardRankings from "../hooks/useLeaderboardRankings";

const StudentProjects = ({ username, userId }) => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const { getProjectRankings } = useLeaderboardRankings();

  const getImageUrl = (mediaPath) => {
    if (!mediaPath) return "";
    if (mediaPath.startsWith("http")) return mediaPath;
    return `${import.meta.env.VITE_BACKEND_URL}/${mediaPath.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/projects/user/${username}`
        );
        const data = await res.json();
        
        if (data.success) {
          const approvedProjects = data.projects.filter(
            project => project.status === "approved"
          );
          setProjects(approvedProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (username) {
      fetchProjects();
    }
  }, [username]);

  return (
    <>
      <AutoScrollToTop />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-fit p-4 sm:p-6 md:p-8 min-w-fit student-projects-mobile"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="relative z-10">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12"
            style={{ color: 'var(--accent-primary)' }}
          >
            {username}'s Projects
          </h1>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 student-projects-grid"
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
            {projects.map(project => {
              const rankings = getProjectRankings(project._id);
              let leaderboardRank = null;
              let leaderboardType = null;

              if (rankings.overall) {
                leaderboardRank = rankings.overall;
                leaderboardType = "overall";
              } else if (rankings.weekly) {
                leaderboardRank = rankings.weekly;
                leaderboardType = "thisWeek";
              }

              return (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onHover={setHoveredProject}
                  isHovered={hoveredProject === project._id}
                  getImageUrl={getImageUrl}
                  leaderboardRank={leaderboardRank}
                  leaderboardType={leaderboardType}
                />
              );
            })}
          </motion.div>

          {projects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                No approved projects found for {username}.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default StudentProjects;
