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

const digitalArtData = [
  {
    id: 1,
    title: "Climate Change Visualization",
    description:
      "Digital art piece depicting global environmental transformation",
    author: "Eco Visual Artists",
    sdg: "SDG 13: Climate Action",
    views: 1600,
    createdAt: new Date(2024, 2, 10),
    ratings: 4.5,
    thumbnail:
      "https://www.noaa.gov/sites/default/files/styles/landscape_width_1275/public/2022-03/PHOTO-Climate-Collage-Diagonal-Design-NOAA-Communications-NO-NOAA-Logo.jpg",
    githubLink: "https://github.com/username/climate-visualization",
    hostedLink: "https://climate-art.example.com",
    likes: 42,
    userHasLiked: false,
  },
  {
    id: 2,
    title: "Interconnected Communities",
    description: "Artistic representation of global social connectivity",
    author: "Global Unity Creators",
    sdg: "SDG 17: Partnerships for the Goals",
    views: 1900,
    createdAt: new Date(2024, 1, 25),
    ratings: 4.7,
    thumbnail:
      "https://www.liverpool.ac.uk/media/livacuk/centre-for-innovation-in-education/staff-guides/learning-communities/people-interconnected-by-lines-banner.jpg",
    githubLink: "https://github.com/username/interconnected-communities",
    hostedLink: "https://global-unity-art.example.com",
    likes: 78,
    userHasLiked: false,
  },
  {
    id: 3,
    title: "Future of Education",
    description: "Innovative visual narrative of learning technologies",
    author: "EdTech Visionaries",
    sdg: "SDG 4: Quality Education",
    views: 1750,
    createdAt: new Date(2024, 3, 5),
    ratings: 4.3,
    thumbnail:
      "https://rahuleducation.org/wp-content/uploads/2022/02/future-education-scaled.jpg",
    githubLink: "https://github.com/username/future-education-art",
    hostedLink: "https://edtech-visualization.example.com",
    likes: 35,
    userHasLiked: false,
  },
];

const DigitalArt = () => {
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });
  const [artworks, setArtworks] = useState(digitalArtData);
  const [hoveredArtwork, setHoveredArtwork] = useState(null);

  const handleLike = (artId) => {
    setArtworks((prevArtworks) =>
      prevArtworks.map((art) =>
        art.id === artId
          ? {
              ...art,
              likes: art.userHasLiked ? art.likes - 1 : art.likes + 1,
              userHasLiked: !art.userHasLiked,
            }
          : art
      )
    );
  };

  const filteredAndSortedArtworks = useMemo(() => {
    let result = [...artworks];

    // Filter and sort logic
    if (filter.sdg) {
      result = result.filter((art) => art.sdg === filter.sdg);
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
  }, [filter, artworks]);

  const viewDetails = (artId) => {
    // Placeholder for navigation or modal
    console.log(`Viewing details for artwork ${artId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-fit p-8 rounded-lg"
    >
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12">
          🎨 Digital Art Innovation Hub
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
                {[...new Set(digitalArtData.map((art) => art.sdg))].map(
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

        {/* Artworks Grid */}
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
          {filteredAndSortedArtworks.map((art) => (
            <motion.div
              key={art.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}
              onMouseEnter={() => setHoveredArtwork(art.id)}
              onMouseLeave={() => setHoveredArtwork(null)}
              className="relative group perspective-1000"
            >
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center">
                {/* Artwork Thumbnail with Zoom Effect */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={art.thumbnail}
                    alt={art.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>

                <div className="p-5 flex flex-col h-full">
                  {/* Artwork Title and Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {art.title}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <Star size={20} fill="currentColor" className="mr-1" />
                      <span>{art.ratings.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 flex-grow">
                    {art.description}
                  </p>

                  {/* SDG and Likes */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      {art.sdg}
                    </span>
                    <button
                      onClick={() => handleLike(art.id)}
                      className="flex items-center text-pink-500 hover:text-pink-400 transition-colors"
                    >
                      <Heart
                        size={18}
                        fill={art.userHasLiked ? "currentColor" : "none"}
                        className="mr-1"
                      />
                      {art.likes}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.button
                      onClick={() => viewDetails(art.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-violet-500 hover:bg-violet-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center"
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
                          href={art.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                        >
                          GitHub Repo
                        </a>
                        <a
                          href={art.hostedLink}
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

export default DigitalArt;
