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

const websitesData = [
  {
    id: 1,
    title: "Community Health Tracker",
    description: "A web platform for tracking local health initiatives",
    author: "HealthTech Innovators",
    sdg: "SDG 3: Good Health and Well-being",
    views: 1500,
    createdAt: new Date(2024, 2, 15),
    ratings: 4.5,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQybg9t16UiNiIas-dOsV8ci8UOMEPb1uAaA&s",
    githubLink: "https://github.com/username/health-tracker",
    hostedLink: "https://health-tracker.example.com",
    likes: 42,
    userHasLiked: false,
  },
  {
    id: 2,
    title: "Urban Green Spaces Mapper",
    description:
      "Interactive map of urban green spaces and environmental resources",
    author: "Urban Sustainability Team",
    sdg: "SDG 11: Sustainable Cities and Communities",
    views: 2200,
    createdAt: new Date(2024, 1, 20),
    ratings: 4.7,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYUWTtlUCnJlj5-sLhMmNzpS63mLakdC_I3A&s",
    githubLink: "https://github.com/username/green-spaces",
    hostedLink: "https://green-spaces.example.com",
    likes: 78,
    userHasLiked: false,
  },
  {
    id: 3,
    title: "Education Resource Portal",
    description: "Platform connecting students with learning resources",
    author: "EdTech Collective",
    sdg: "SDG 4: Quality Education",
    views: 1800,
    createdAt: new Date(2024, 3, 1),
    ratings: 4.3,
    thumbnail:
      "https://i.pinimg.com/736x/76/0c/84/760c84b81b3cf4e4bcb4579e15275c76.jpg",
    githubLink: "https://github.com/username/education-portal",
    hostedLink: "https://education-portal.example.com",
    likes: 35,
    userHasLiked: false,
  },
];

const Websites = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });
  const [websites, setWebsites] = useState(websitesData);
  const [hoveredWebsite, setHoveredWebsite] = useState(null);

  const handleLike = (websiteId) => {
    setWebsites((prevWebsites) =>
      prevWebsites.map((website) =>
        website.id === websiteId
          ? {
              ...website,
              likes: website.userHasLiked ? website.likes - 1 : website.likes + 1,
              userHasLiked: !website.userHasLiked,
            }
          : website
      )
    );
  };

  const filteredAndSortedWebsites = useMemo(() => {
    let result = [...websites];

    // Filter and sort logic
    if (filter.sdg) {
      result = result.filter((website) => website.sdg === filter.sdg);
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
  }, [filter, websites]);

  const viewDetails = (websiteId) => {
    navigate(`/details/${websiteId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-fit p-8 rounded-lg"
    >
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500 mb-12">
          🌐 Website Innovation Hub
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
                {[...new Set(websitesData.map((website) => website.sdg))].map(
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

        {/* Websites Grid */}
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
          {filteredAndSortedWebsites.map((website) => (
            <motion.div
              key={website.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}
              onMouseEnter={() => setHoveredWebsite(website.id)}
              onMouseLeave={() => setHoveredWebsite(null)}
              className="relative group perspective-1000"
            >
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center">
                {/* Website Thumbnail with Zoom Effect */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={website.thumbnail}
                    alt={website.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>

                <div className="p-5 flex flex-col h-full">
                  {/* Website Title and Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {website.title}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <Star size={20} fill="currentColor" className="mr-1" />
                      <span>{website.ratings.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 flex-grow">
                    {website.description}
                  </p>

                  {/* SDG and Likes */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      {website.sdg}
                    </span>
                    <button
                      onClick={() => handleLike(website.id)}
                      className="flex items-center text-pink-500 hover:text-pink-400 transition-colors"
                    >
                      <Heart
                        size={18}
                        fill={website.userHasLiked ? "currentColor" : "none"} 
                        className="mr-1"
                      />
                      {website.likes}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.button
                      onClick={() => viewDetails(website.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
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
                          href={website.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                        >
                          GitHub Repo
                        </a>
                        <a
                          href={website.hostedLink}
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

export default Websites;
