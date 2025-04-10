import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Filter,
  ArrowUpDown,
  Heart,
  ExternalLink,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Documentaries = ({ projects = [] }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });
  const [documentaries, setDocumentaries] = useState(projects);
  const [hoveredDocumentary, setHoveredDocumentary] = useState(null);

  // Initialize with props
  React.useEffect(() => {
    setDocumentaries(projects);
  }, [projects]);

  const filteredAndSortedDocumentaries = useMemo(() => {
    let result = [...documentaries];

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
        // Add views field to your schema if needed
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "mostLiked":
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
    }

    return result;
  }, [filter, documentaries]);

  const viewDetails = (projectId) => {
    navigate(`/details/${projectId}`);
  };

  // Extract unique SDGs from projects
  const uniqueSdgs = useMemo(() => {
    const allSdgs = documentaries.flatMap((project) => project.sdgs || []);
    return [...new Set(allSdgs)];
  }, [documentaries]);

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No documentary projects found
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
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-12">
          📄 Documentary Innovation Hub
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
                className="w-full bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-white/10 appearance-none pr-10 focus:ring-2 focus:ring-blue-500 transition-all"
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
                className="w-full bg-gray-800/80 text-white px-4 py-3 rounded-xl border border-white/10 appearance-none pr-10 focus:ring-2 focus:ring-purple-500 transition-all"
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

        {/* Documentaries Grid */}
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
          {filteredAndSortedDocumentaries.map((documentary) => (
            <motion.div
              key={documentary._id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}
              onMouseEnter={() => setHoveredDocumentary(documentary._id)}
              onMouseLeave={() => setHoveredDocumentary(null)}
              className="relative group perspective-1000"
            >
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center">
                {/* Documentary Thumbnail with Zoom Effect */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={
                      documentary.media && documentary.media.length > 0
                        ? getImageUrl(documentary.media[0])
                        : "/api/placeholder/400/320"
                    }
                    alt={documentary.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/320";
                    }}
                  />
                </div>

                <div className="p-5 flex flex-col h-full">
                  {/* Documentary Title and Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {documentary.title}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <Star size={20} fill="currentColor" className="mr-1" />
                      <span>{documentary.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 flex-grow line-clamp-2">
                    {documentary.description}
                  </p>

                  {/* SDG and Likes */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      {documentary.sdgs && documentary.sdgs.length > 0
                        ? documentary.sdgs[0]
                        : "No SDG"}
                    </span>
                    <button
                      onClick={() => viewDetails(documentary._id)}
                      className="flex items-center text-pink-500 hover:text-pink-400 transition-colors"
                    >
                      <Heart
                        size={18}
                        fill={
                          documentary.userHasLiked ? "currentColor" : "none"
                        }
                        className="mr-1"
                      />
                      {documentary.likes}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.button
                      onClick={() => viewDetails(documentary._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
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
                          href={documentary.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                        >
                          GitHub Repo
                        </a>
                        <a
                          href={documentary.hostedLink}
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
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Documentaries;
