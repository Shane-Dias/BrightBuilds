import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Filter,
  ArrowUpDown,
  Heart,
  ExternalLink,
  Film,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const videosData = [
  {
    id: 1,
    title: "Ocean Conservation Journey",
    description: "Documentary exploring marine ecosystem preservation",
    author: "Blue Planet Collective",
    sdg: "SDG 14: Life Below Water",
    views: 1600,
    createdAt: new Date(2024, 2, 15),
    ratings: 4.7,
    thumbnail:
      "https://almarwater.com/wp-content/uploads/2023/08/tecnolog-as-sotenibles-cabecera.jpg",
    githubLink: "https://github.com/username/ocean-conservation",
    hostedLink: "https://ocean-documentary.example.com",
    likes: 42,
    userHasLiked: false,
  },
  {
    id: 2,
    title: "Women in STEM Narratives",
    description: "Inspiring stories of women breaking barriers in science",
    author: "Empowerment Documentarians",
    sdg: "SDG 5: Gender Equality",
    views: 2300,
    createdAt: new Date(2024, 1, 20),
    ratings: 4.9,
    thumbnail:
      "https://d117h1jjiq768j.cloudfront.net/images/default-source/blogs/2021/2021-03/webinar-promo-fb-tw-li-1200x628-1-text-smaller.png?sfvrsn=d99c8ea9_0",
    githubLink: "https://github.com/username/women-in-stem",
    hostedLink: "https://stem-narratives.example.com",
    likes: 78,
    userHasLiked: false,
  },
  {
    id: 3,
    title: "Sustainable Agriculture Insights",
    description: "Exploring innovative farming techniques",
    author: "AgriTech Storytellers",
    sdg: "SDG 2: Zero Hunger",
    views: 1900,
    createdAt: new Date(2024, 3, 1),
    ratings: 4.5,
    thumbnail:
      "https://enterprisewired.com/wp-content/uploads/2024/08/1-Sustainable-Farming-Practices.jpg",
    githubLink: "https://github.com/username/agriculture-insights",
    hostedLink: "https://agriculture-video.example.com",
    likes: 35,
    userHasLiked: false,
  },
];

const Videos = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });
  const [videos, setVideos] = useState(videosData);
  const [hoveredVideo, setHoveredVideo] = useState(null);

  const handleLike = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId
          ? {
              ...video,
              likes: video.userHasLiked ? video.likes - 1 : video.likes + 1,
              userHasLiked: !video.userHasLiked,
            }
          : video
      )
    );
  };

  const filteredAndSortedVideos = useMemo(() => {
    let result = [...videos];

    // Filter and sort logic
    if (filter.sdg) {
      result = result.filter((video) => video.sdg === filter.sdg);
    }

    switch (filter.sortBy) {
      case "ratings":
        result.sort((a, b) => b.ratings - a.ratings);
        break;
      case "newest":
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "mostViewed":
        result.sort((a, b) => b.views - a.views);
        break;
      case "mostLiked":
        result.sort((a, b) => b.likes - a.likes);
        break;
    }

    return result;
  }, [filter, videos]);

  const viewDetails = (videoId) => {
    navigate(`/details/${videoId}`);
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
                {[...new Set(videosData.map((video) => video.sdg))].map(
                  (sdg) => (
                    <option key={sdg} value={sdg}>
                      {sdg}
                    </option>
                  )
                )}
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
          {filteredAndSortedVideos.map((video) => (
            <motion.div
              key={video.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
              className="relative group perspective-1000"
            >
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center">
                {/* Video Thumbnail with Zoom Effect */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
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
                      <span>{video.ratings.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 flex-grow">
                    {video.description}
                  </p>

                  {/* SDG and Likes */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      {video.sdg}
                    </span>
                    <button
                      onClick={() => handleLike(video.id)}
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
                      onClick={() => viewDetails(video.id)}
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
                          href={video.githubLink}
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
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Videos;
