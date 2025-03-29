import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ExternalLink,
  Users,
  Code,
  School,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CommentSection from "../components/CommentSection";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const game = {
    id: id,
    category: "Game",
    title: "Space Exploration Adventure",
    description:
      "Educational space exploration game with scientific challenges that push the boundaries of learning and exploration.",
    github: "https://github.com/JACELL100/FSD/",
    hostedLink: "http://localhost:5173/create",
    mentor: "Prof. Joh",
    sdgs: ["Good Health and Well-being", "Quality Education"],
    teammates: ["Shane", "Serene", "Jacell"],
    techStack: ["React", "Firebase", "Django"],
    views: 20,
    rating: 4.6,
    media: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1718870/capsule_616x353.jpg",
      "https://img.freepik.com/free-vector/spaceship-cockpit-interior-space-planets-view_33099-2159.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXRINsN3Eahv4N08MDVW-tEdAw8xdVp0AIgg&s",
    ],
    comments: [
      {
        id: 1,
        author: "SpaceEnthusiast42",
        text: "This game completely changed how I view space exploration! The physics engine is incredibly accurate.",
        timestamp: "2024-05-15T14:30:00Z",
        likes: 24,
        liked: false,
        replies: [
          {
            id: 101,
            author: "AstroDev",
            text: "Thanks! We worked closely with NASA scientists to get the physics right.",
            timestamp: "2024-05-15T16:45:00Z",
            likes: 8,
            liked: false,
          },
        ],
      },
      {
        id: 2,
        author: "EduTechReviewer",
        text: "Perfect for classroom use. My students are more engaged than ever with astronomy concepts.",
        timestamp: "2024-05-10T09:15:00Z",
        likes: 15,
        liked: false,
        replies: [],
      },
    ],
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const navigateImages = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % game.media.length
        : (currentImageIndex - 1 + game.media.length) % game.media.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white">
      <div className="container mx-auto px-4 py-12 pt-24">
        {/* Header with Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-12 space-x-4"
        >
          <button
            className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            onClick={() => navigate(-1)} // Navigates to the previous page
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {game.title}
          </h1>
        </motion.div>

        {/* Main Content Area */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <motion.img
                key={game.media[currentImageIndex]}
                src={game.media[currentImageIndex]}
                alt={`Game screenshot ${currentImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-[500px] object-cover"
              />

              {/* Image Navigation */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => navigateImages("prev")}
                  className="bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-sm"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={() => navigateImages("next")}
                  className="bg-white/20 hover:bg-white/40 p-3 rounded-full backdrop-blur-sm"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </div>
            </div>

            {/* Image Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {game.media.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentImageIndex ? "bg-blue-500" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Game Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10"
          >
            {/* Rating and Like Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-yellow-400">
                  <Star size={24} fill="currentColor" className="mr-2" />
                  <span className="text-2xl font-bold">
                    {game.rating.toFixed(1)}
                  </span>
                </div>
                <button
                  onClick={toggleLike}
                  className="flex items-center text-pink-500 hover:text-pink-400 transition-colors"
                >
                  <Heart
                    size={24}
                    fill={liked ? "currentColor" : "none"}
                    className="mr-2"
                  />
                  {likeCount}
                </button>
              </div>
              <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                {game.category}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              {game.description}
            </p>

            {/* Game Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <DetailCard
                icon={<Users className="text-blue-400" size={20} />}
                title="Teammates"
                content={game.teammates.join(", ")}
              />
              <DetailCard
                icon={<School className="text-green-400" size={20} />}
                title="Mentor"
                content={game.mentor}
              />
              <DetailCard
                icon={<Code className="text-purple-400" size={20} />}
                title="Tech Stack"
                content={game.techStack.join(", ")}
              />
              <DetailCard
                icon={<Award className="text-yellow-400" size={20} />}
                title="Views"
                content={game.views.toString()}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <a
                href={game.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all flex items-center justify-center"
              >
                <Code className="mr-2" size={18} />
                GitHub
              </a>
              <a
                href={game.hostedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-6 rounded-lg transition-all flex items-center justify-center"
              >
                <ExternalLink className="mr-2" size={18} />
                Live Demo
              </a>
            </div>
          </motion.div>
        </div>

        {/* SDGs and Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 grid md:grid-cols-2 gap-8"
        >
          <div
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10"
            style={{ overflow: "auto" }}
          >
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
              Sustainable Development Goals
            </h2>
            <div className="flex flex-wrap gap-4">
              {game.sdgs.map((sdg, index) => (
                <div
                  key={index}
                  className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-2 rounded-lg"
                >
                  {sdg}
                </div>
              ))}
            </div>
          </div>
          <div
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10"
            style={{ overflow: "auto" }}
          >
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-4">
              {game.techStack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-lg"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <CommentSection comments={game.comments} />
        </motion.div>
      </div>
    </div>
  );
};

// Reusable Detail Card Component
const DetailCard = ({ icon, title, content }) => (
  <div className="bg-white/10 rounded-xl p-4 flex items-center space-x-4 border border-white/10 overflow-auto">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase">{title}</p>
      <p className="text-sm text-white truncate">{content}</p>
    </div>
  </div>
);

export default GameDetails;
