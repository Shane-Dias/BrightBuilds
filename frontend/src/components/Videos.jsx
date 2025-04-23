import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Filter,
  ArrowUpDown,
  Heart,
  ExternalLink,
  Film,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Videos = ({ projects = [] }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });
  const [videos, setVideos] = useState(projects);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
  const [overallLeaderboard, setOverallLeaderboard] = useState([]);

  // Initialize with props and update when props change
  useEffect(() => {
    setVideos(projects);
  }, [projects]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        const allProjects = response.data.data || [];

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

    fetchLeaderboards();
  }, []);

  const filteredAndSortedVideos = useMemo(() => {
    let result = [...videos];

    if (filter.sdg) {
      result = result.filter((project) => project.sdgs.includes(filter.sdg));
    }

    switch (filter.sortBy) {
      case "ratings":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "mostViewed":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "mostLiked":
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
    }

    return result;
  }, [filter, videos]);

  // Function to find a project's ranking in leaderboards
  const getProjectRankings = (projectId) => {
    const weeklyRank =
      weeklyLeaderboard.findIndex((p) => p._id === projectId) + 1;
    const overallRank =
      overallLeaderboard.findIndex((p) => p._id === projectId) + 1;

    return {
      weekly: weeklyRank > 0 ? weeklyRank : null,
      overall: overallRank > 0 ? overallRank : null,
    };
  };

  const viewDetails = (projectId) => {
    navigate(`/details/${projectId}`);
  };

  // Extract unique SDGs from projects
  const uniqueSdgs = useMemo(() => {
    const allSdgs = videos.flatMap((project) => project.sdgs || []);
    return [...new Set(allSdgs)];
  }, [videos]);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No video projects found
      </div>
    );
  }

  // Function to get proper image URL
  const getImageUrl = (mediaPath) => {
    if (!mediaPath) return null;

    // Replace backslashes with forward slashes
    mediaPath = mediaPath.replace(/\\/g, "/");

    // Return full URL (adjust if backend URL is different)
    return `http://localhost:5000/${mediaPath}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-fit p-8 rounded-lg"
    >
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-600 mb-12">
          🎬 Video Innovation Hub
        </h1>

        {/* Filters Section */}
        <div className="flex justify-between items-center mb-12 space-x-4">
          <div className="flex items-center space-x-4 w-full">
            {/* SDG Filter */}
            <div className="relative flex-1">
              <select
                value={filter.sdg}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, sdg: e.target.value }))
                }
                className="w-full bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-white/10 appearance-none pr-10 focus:ring-2 focus:ring-red-500 transition-all"
              >
                <option value="">All Sustainable Development Goals</option>
                {uniqueSdgs.map((sdg) => (
                  <option key={sdg} value={sdg}>
                    {sdg}
                  </option>
                ))}
              </select>
              <Filter
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                size={24}
              />
            </div>

            {/* Sort Filter */}
            <div className="relative flex-1">
              <select
                value={filter.sortBy}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, sortBy: e.target.value }))
                }
                className="w-full bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-white/10 appearance-none pr-10 focus:ring-2 focus:ring-orange-500 transition-all"
              >
                <option value="ratings">Top Rated</option>
                <option value="newest">Newest</option>
                <option value="mostViewed">Most Viewed</option>
                <option value="mostLiked">Most Liked</option>
              </select>
              <ArrowUpDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                size={24}
              />
            </div>
          </div>
        </div>

        {/* Videos Grid */}
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
          {filteredAndSortedVideos.map((video) => {
            // Get video rankings
            const rankings = getProjectRankings(video._id);

            return (
              <motion.div
                key={video._id}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300 },
                  },
                }}
                onMouseEnter={() => setHoveredVideo(video._id)}
                onMouseLeave={() => setHoveredVideo(null)}
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
                            <span className="font-extrabold mr-1">
                              #{rankings.weekly}
                            </span>{" "}
                            Weekly
                          </span>
                        </div>
                      )}
                      {rankings.overall && (
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-filter backdrop-blur-sm">
                          <div className="bg-white/20 p-1.5 rounded-full flex items-center justify-center">
                            <Trophy size={16} className="text-white" />
                          </div>
                          <span className="flex items-center">
                            <span className="font-extrabold mr-1">
                              #{rankings.overall}
                            </span>{" "}
                            Overall
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Video Thumbnail with Zoom Effect */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={
                        video.media && video.media.length > 0
                          ? getImageUrl(video.media[0])
                          : "/api/placeholder/400/320"
                      }
                      alt={video.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/320";
                      }}
                    />
                  </div>

                  <div className="p-5 flex flex-col h-full">
                    {/* Video Title and Rating */}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold text-white">
                        {video.title}
                      </h3>
                      <div className="flex items-center text-yellow-400">
                        <Star size={20} fill="currentColor" className="mr-1" />
                        <span>{video.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-4 flex-grow line-clamp-2">
                      {video.description}
                    </p>

                    {/* SDG and Likes */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                        {video.sdgs && video.sdgs.length > 0
                          ? video.sdgs[0]
                          : "No SDG"}
                      </span>
                      <button
                        onClick={() => viewDetails(video._id)}
                        className="flex items-center text-pink-500 hover:text-pink-400 transition-colors"
                      >
                        <Heart
                          size={18}
                          fill={video.userHasLiked ? "currentColor" : "none"}
                          className="mr-1"
                        />
                        {video.likes}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-auto">
                      <motion.button
                        onClick={() => viewDetails(video._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
                      >
                        View Details
                        <Film size={16} className="ml-2" />
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
                            href={video.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                          >
                            GitHub Repo
                          </a>
                          <a
                            href={video.hostedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
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
      </div>
    </motion.div>
  );
};

export default Videos;
