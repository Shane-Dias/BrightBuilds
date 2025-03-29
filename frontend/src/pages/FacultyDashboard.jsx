import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  ExternalLink,
  Globe,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import FacultyProfile from "../components/FacultyProfile";

const gamesData = [
  {
    id: 1,
    title: "Snake Multiplayer",
    description: "A multiplayer snake game built using Pygame",
    ratings: 4.5,
    sdg: "SDG 3: Good Health and Well-being",
    views: 1200,
    createdAt: new Date(2024, 2, 15),
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT1ZrWDH4RlL9gWEah5r401YHw5MEEiuYRIoORMG-zfXod7SGt_9tQODFor7su83yMwDdW7-95eH6GsZFGwZYCVT9h8yjtOwgRLiFvYi-TY",
    githubLink: "https://github.com/username/snake-multiplayer",
    hostedLink: "https://snake-game.example.com",
    likes: 42,
    userHasLiked: false,
    status: "approved"
  },
  {
    id: 2,
    title: "Climate Change Simulator",
    description: "An interactive game exploring environmental challenges",
    ratings: 4.8,
    sdg: "SDG 13: Climate Action",
    views: 2500,
    createdAt: new Date(2024, 3, 1),
    thumbnail:
      "https://uwaterloo.ca/climate-institute/sites/default/files/styles/large/public/uploads/images/illuminate_mitigation_screen.png?itok=68i_tLHY",
    githubLink: "https://github.com/username/climate-simulator",
    hostedLink: "https://climate-sim.example.com",
    likes: 78,
    userRating: null,
    userHasLiked: false,
    status: "pending"
  },
  {
    id: 3,
    title: "Space Exploration Adventure",
    description:
      "Educational space exploration game with scientific challenges",
    ratings: 4.2,
    sdg: "SDG 4: Quality Education",
    views: 1800,
    createdAt: new Date(2024, 1, 10),
    thumbnail:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1718870/capsule_616x353.jpg?t=1721124425",
    githubLink: "https://github.com/username/space-adventure",
    hostedLink: "https://space-game.example.com",
    likes: 35,
    userRating: null,
    userHasLiked: false,
    status: "rejected"
  },
];

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState(gamesData);
  const [hoveredGame, setHoveredGame] = useState(null);

  const handleLike = (gameId) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === gameId
          ? {
              ...game,
              likes: game.userHasLiked ? game.likes - 1 : game.likes + 1,
              userHasLiked: !game.userHasLiked,
            }
          : game
      )
    );
  };

  const viewDetails = (gameId) => {
    navigate(`/details/${gameId}`);
  };

  // Status badge configuration
  const statusConfig = {
    approved: {
      icon: <CheckCircle size={16} className="mr-1" />,
      color: "bg-green-500",
      text: "Approved"
    },
    pending: {
      icon: <Clock size={16} className="mr-1" />,
      color: "bg-yellow-500",
      text: "Pending"
    },
    rejected: {
      icon: <XCircle size={16} className="mr-1" />,
      color: "bg-red-500",
      text: "Rejected"
    }
  };

  return (
    <>
   <FacultyProfile/>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-fit p-8 rounded-lg"
    >
      <div className="relative z-10">
        <h1 className="text-5xl font-bold font-lilita text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-12">
          Your Projects 
        </h1>

        {/* Games Grid */}
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
          {games.map((game) => (
            <motion.div
              key={game.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
              className="relative group perspective-1000"
            >
              <div className="relative bg-gray-800/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center">
                {/* Game Thumbnail with Zoom Effect and Status Badge */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  {/* Status Badge */}
                  <div className={`absolute top-2 left-2 ${statusConfig[game.status].color} text-black font-bold  text-lg px-2 py-1 rounded-full flex items-center`}>
                    {statusConfig[game.status].icon}
                    {statusConfig[game.status].text}
                  </div>
                </div>

                <div className="p-5 flex flex-col h-full">
                  {/* Game Title and Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {game.title}
                    </h3>
                    <div className="flex items-center text-yellow-400">
                      <Star size={20} fill="currentColor" className="mr-1" />
                      <span>{game.ratings.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 flex-grow">
                    {game.description}
                  </p>

                  {/* SDG and Likes */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                      {game.sdg}
                    </span>
                    <button
                      onClick={() => handleLike(game.id)}
                      className="flex items-center text-pink-500 hover:text-pink-400 transition-colors"
                    >
                      <Heart
                        size={18}
                        fill={game.userHasLiked ? "currentColor" : "none"}
                        className="mr-1"
                      />
                      {game.likes}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.button
                      onClick={() => viewDetails(game.id)}
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
                          href={game.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                        >
                          GitHub Repo
                        </a>
                        <a
                          href={game.hostedLink}
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
    </>
  );
};

export default FacultyDashboard;