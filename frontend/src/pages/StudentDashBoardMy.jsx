import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ExternalLink,
  Globe,
  CheckCircle,
  Clock,
  XCircle,
  Trophy
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import AutoScrollToTop from "../components/AutoScrollToTop";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [hoveredGame, setHoveredGame] = useState(null);
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [userLikes, setUserLikes] = useState({});
  const [profilePic, setprofilePic] = useState("");
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
  const [overallLeaderboard, setOverallLeaderboard] = useState([]);

  // Function to get proper image URL
  const getImageUrl = (mediaPath) => {
    if (!mediaPath) return null;
    mediaPath = mediaPath.replace(/\\/g, "/");
    return `http://localhost:5000/${mediaPath}`;
  };

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        const data = await response.json();
        const allProjects = data.data || [];
        
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const weeklyProjects = allProjects
          .filter(
            (project) =>
              new Date(project.createdAt) >= sevenDaysAgo &&
              project.status === "approved"
          )
          .sort((a, b) => b.rating - a.rating || b.likes - a.likes)
          .slice(0, 5);
        
        const overallProjects = allProjects
          .filter((project) => project.status === "approved")
          .sort((a, b) => b.rating - a.rating || b.likes - a.likes)
          .slice(0, 10);
        
        setWeeklyLeaderboard(weeklyProjects);
        setOverallLeaderboard(overallProjects);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    const fetchUsername = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/details/${id}`
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
          `http://localhost:5000/api/projects/user/${username}`
        );
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setProjects(data.projects);
          console.log(data.projects);

          // Initialize user likes state for each project
          const likesState = {};
          data.projects.forEach((project) => {
            likesState[project._id] = false;
          });
          setUserLikes(likesState);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchUsername();
    fetchLeaderboards();
  }, [id]);

  // Function to find a project's ranking in leaderboards
  const getProjectRankings = (projectId) => {
    const weeklyRank = weeklyLeaderboard.findIndex(p => p._id === projectId) + 1;
    const overallRank = overallLeaderboard.findIndex(p => p._id === projectId) + 1;
    
    return {
      weekly: weeklyRank > 0 ? weeklyRank : null,
      overall: overallRank > 0 ? overallRank : null
    };
  };

  const viewDetails = (projectId) => {
    navigate(`/details/${projectId}`);
  };

  // Status badge configuration
  const statusConfig = {
    approved: {
      icon: <CheckCircle size={16} className="mr-1" />,
      color: "bg-green-500",
      text: "Approved",
    },
    pending: {
      icon: <Clock size={16} className="mr-1" />,
      color: "bg-yellow-500",
      text: "Pending",
    },
    rejected: {
      icon: <XCircle size={16} className="mr-1" />,
      color: "bg-red-500",
      text: "Rejected",
    },
  };

  return (
    <>
      <AutoScrollToTop />
      <UserProfile userProfile={username} profilePic={profilePic} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-fit p-8 min-w-fit"
      >
        <div className="relative z-10">
          <h1 className="text-5xl font-bold font-lilita text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-12">
            Your Projects
          </h1>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-8"
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
            {projects.map((project) => {
              const rankings = getProjectRankings(project._id);
              
              return (
                <motion.div
                  key={project._id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { type: "spring", stiffness: 300 },
                    },
                  }}
                  onMouseEnter={() => setHoveredGame(project._id)}
                  onMouseLeave={() => setHoveredGame(null)}
                  className="relative group perspective-1000"
                >
                  <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center">
                    {/* Leaderboard Rank Badges - Only show if ranked */}
                    {(rankings.weekly || rankings.overall) && (
                      <div className="absolute top-2 right-2 z-30 flex flex-col gap-2">
                        {rankings.weekly && (
                         <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-black/10 backdrop-filter backdrop-blur-sm">
                                                                                                 <div className="bg-black/10 p-1.5 rounded-full flex items-center justify-center">
                                                                                                   <Trophy size={16} className="text-black" />
                                                                                                 </div>
                                                                                                 <span className="flex items-center">
                                                                                                   <span className="font-extrabold mr-1">#{rankings.weekly}</span> Weekly
                                                                                                 </span>
                                                                                               </div>
                        )}
                        {rankings.overall && (
                          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-filter backdrop-blur-sm">
                                                                                                                         <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
                                                                                                                           <Trophy size={16} className="text-white" />
                                                                                                                         </div>
                                                                                                                         <span className="flex items-center">
                                                                                                                           <span className="font-extrabold mr-1">#{rankings.overall}</span> Overall
                                                                                                                         </span>
                                                                                                                       </div>
                        )}
                      </div>
                    )}

                    {/* Project Thumbnail with Zoom Effect and Status Badge */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={
                          project.media && project.media.length > 0
                            ? getImageUrl(project.media[0])
                            : "https://placehold.co/600x400/gray/white?text=No+Image"
                        }
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                      />
                      {/* Status Badge */}
                      <div
                        className={`absolute top-2 left-2 ${
                          statusConfig[project.status]?.color || "bg-gray-500"
                        } text-black font-bold text-lg px-2 py-1 rounded-full flex items-center`}
                      >
                        {statusConfig[project.status]?.icon || (
                          <Clock size={16} className="mr-1" />
                        )}
                        {statusConfig[project.status]?.text || "Unknown"}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col h-full">
                      {/* Project Title and Rating */}
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-2xl font-bold text-white truncate">
                          {project.title}
                        </h3>
                        <div className="flex items-center text-yellow-400">
                          <Star size={20} fill="currentColor" className="mr-1" />
                          <span>{project.rating?.toFixed(1) || "0.0"}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 mb-4 flex-grow line-clamp-2">
                        {project.description}
                      </p>

                      {/* SDGs - Only showing first 2 */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.sdgs &&
                          project.sdgs.slice(0, 2).map((sdg, index) => (
                            <span
                              key={index}
                              className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full"
                            >
                              {sdg}
                            </span>
                          ))}
                        {project.sdgs && project.sdgs.length > 2 && (
                          <span className="text-xs text-gray-400 px-2 py-1">
                            +{project.sdgs.length - 2} more
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.techStack &&
                          project.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      {/* Likes and Team */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-xs text-gray-400">
                          Team: {project.teammates?.length || 0} members
                        </div>
                        <button
                          onClick={() => viewDetails(project._id)}
                          className="flex items-center text-pink-500 hover:text-pink-400 transition-colors"
                        >
                          <Heart
                            size={18}
                            fill={
                              userLikes[project._id] ? "currentColor" : "none"
                            }
                            className="mr-1"
                          />
                          {project.likes || 0}
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-auto">
                        <motion.button
                          onClick={() => viewDetails(project._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
                        >
                          View Details
                          <Globe size={16} className="ml-2" />
                        </motion.button>

                        <div className="relative group/project">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
                          >
                            View Project
                            <ExternalLink size={16} className="ml-2" />
                          </motion.button>
                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover/project:flex flex-col bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 w-full">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                            >
                              GitHub Repo
                            </a>
                            <a
                              href={project.hostedLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                            >
                              Live Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {projects.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-xl">
                No projects found. Create your first project to get started!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default StudentDashboard;