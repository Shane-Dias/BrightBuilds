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

const documentariesData = [
  {
    id: 1,
    title: "Urban Renewable Energy Revolution",
    description: "Exploring sustainable energy solutions in urban environments",
    author: "Green City Innovators",
    sdg: "SDG 7: Affordable and Clean Energy",
    views: 1750,
    createdAt: new Date(2024, 2, 15),
    ratings: 4.6,
    thumbnail:
      "https://i0.wp.com/indianinfrastructure.com/wp-content/uploads/2019/10/24-1.jpg?resize=678%2C381&ssl=1",
    githubLink: "https://github.com/username/renewable-energy-doc",
    hostedLink: "https://energy-documentary.example.com",
    likes: 42,
    userHasLiked: false,
  },
  {
    id: 2,
    title: "Digital Inclusion Across Generations",
    description: "Bridging the digital divide for elderly populations",
    author: "Tech Equity Project",
    sdg: "SDG 10: Reduced Inequalities",
    views: 2100,
    createdAt: new Date(2024, 1, 20),
    ratings: 4.8,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtevc09xcISrDaDeR4qhtWp8vkKRuvyCgQrA&s",
    githubLink: "https://github.com/username/digital-inclusion-doc",
    hostedLink: "https://digital-inclusion.example.com",
    likes: 78,
    userHasLiked: false,
  },
  {
    id: 3,
    title: "Water Security in Changing Climates",
    description: "Investigating water resource management challenges",
    author: "Global Water Research Team",
    sdg: "SDG 6: Clean Water and Sanitation",
    views: 1900,
    createdAt: new Date(2024, 3, 1),
    ratings: 4.4,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMBD3C0fBoTxcjlHJy-6_VgO9_ejKRGzsVCA&s",
    githubLink: "https://github.com/username/water-security-doc",
    hostedLink: "https://water-security.example.com",
    likes: 35,
    userHasLiked: false,
  },
];

const Documentaries = () => {
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });
  const [documentaries, setDocumentaries] = useState(documentariesData);
  const [hoveredDocumentary, setHoveredDocumentary] = useState(null);

  const handleLike = (docId) => {
    setDocumentaries((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              likes: doc.userHasLiked ? doc.likes - 1 : doc.likes + 1,
              userHasLiked: !doc.userHasLiked,
            }
          : doc
      )
    );
  };

  const filteredAndSortedDocumentaries = useMemo(() => {
    let result = [...documentaries];

    // Filter and sort logic
    if (filter.sdg) {
      result = result.filter((doc) => doc.sdg === filter.sdg);
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
  }, [filter, documentaries]);

  const viewDetails = (docId) => {
    // Placeholder for navigation or modal
    console.log(`Viewing details for documentary ${docId}`);
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
                {[...new Set(documentariesData.map((doc) => doc.sdg))].map(
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
          {filteredAndSortedDocumentaries.map((doc) => (
            <motion.div
              key={doc.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}
              onMouseEnter={() => setHoveredDocumentary(doc.id)}
              onMouseLeave={() => setHoveredDocumentary(null)}
              className="relative group perspective-1000"
            >
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center">
                {/* Documentary Thumbnail with Zoom Effect */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={doc.thumbnail}
                    alt={doc.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>

                <div className="p-5 flex flex-col h-full">
                  {/* Documentary Title and Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {doc.title}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <Star size={20} fill="currentColor" className="mr-1" />
                      <span>{doc.ratings.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 flex-grow">
                    {doc.description}
                  </p>

                  {/* SDG and Likes */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      {doc.sdg}
                    </span>
                    <button
                      onClick={() => handleLike(doc.id)}
                      className="flex items-center text-pink-500 hover:text-pink-400 transition-colors"
                    >
                      <Heart
                        size={18}
                        fill={doc.userHasLiked ? "currentColor" : "none"}
                        className="mr-1"
                      />
                      {doc.likes}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.button
                      onClick={() => viewDetails(doc.id)}
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
                          href={doc.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                        >
                          GitHub Repo
                        </a>
                        <a
                          href={doc.hostedLink}
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
