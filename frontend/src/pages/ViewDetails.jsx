import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { useState, useEffect } from "react";
import CommentSection from "../components/CommentSection";
import { FaRegKeyboard } from "react-icons/fa";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/details/${id}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch project details: ${response.status}`
          );
        }

        const responseData = await response.json();

        // Extract project data from the nested structure
        if (responseData.success && responseData.data) {
          setGame(responseData.data);
          console.log(responseData.data);
          setLikeCount(responseData.data.likes || 0);
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching project details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    // Optional: Send like update to backend
    // fetch(`http://localhost:5000/api/details/${id}/like`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ liked: !liked })
    // });
  };

  const navigateImages = (direction) => {
    if (!game || !game.media || game.media.length === 0) return;

    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % game.media.length
        : (currentImageIndex - 1 + game.media.length) % game.media.length;

    setCurrentImageIndex(newIndex);
  };

  // Handle media paths - convert relative paths to full URLs if needed
  const getMediaUrl = (mediaPath) => {
    if (!mediaPath) return "";

    // If the path is already a full URL, return it as is
    if (mediaPath.startsWith("http")) {
      return mediaPath;
    }

    // Replace backslashes with forward slashes for web URLs
    const formattedPath = mediaPath.replace(/\\/g, "/");

    // Construct the full URL - adjust the base URL as needed
    return `http://localhost:5000/${formattedPath}`;
  };

  const handleProfileClick = async (userName) => {
    try {
      console.log(userName)
      const response = await fetch(
        `http://localhost:5000/api/users/userDetails/${userName}`
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.error("Error fetching user:", data.message);
        return;
      }

      const userId = data._id; // Assuming the API returns `_id`

      console.log("User ID:", userId);
      navigate(`/userdetails/${userId}`);
    } catch (error) {
      console.error("❌ Error fetching user details:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading project details...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white flex items-center justify-center">
        <div className="text-2xl text-red-400">
          {error || "Failed to load project details"}
        </div>
      </div>
    );
  }

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
            onClick={() => navigate(-1)}
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
            {game.media && game.media.length > 0 ? (
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <motion.img
                  key={game.media[currentImageIndex]}
                  src={getMediaUrl(game.media[currentImageIndex])}
                  alt={`Project screenshot ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-[500px] object-cover"
                />

                {/* Image Navigation */}
                {game.media.length > 1 && (
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
                )}
              </div>
            ) : (
              <div className="rounded-3xl h-[500px] bg-white/5 flex items-center justify-center">
                <p className="text-white/50">No media available</p>
              </div>
            )}

            {/* Image Indicators */}
            {game.media && game.media.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {game.media.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex
                        ? "bg-blue-500"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
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
                    {typeof game.rating === "number"
                      ? game.rating.toFixed(1)
                      : "0.0"}
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
                {game.category || "Project"}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              {game.description || "No description available"}
            </p>

            {/* Game Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <DetailCard
                icon={<Users className="text-blue-400" size={20} />}
                title="Contributors"
                content={
                  game.teammates && game.teammates.length > 0
                    ? game.teammates.map((teammate, index) => (
                        <React.Fragment key={teammate}>
                          <span
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={() => handleProfileClick(teammate)}
                          >
                            {teammate}
                          </span>
                          {index < game.teammates.length - 1 ? ", " : ""}
                        </React.Fragment>
                      ))
                    : "None"
                }
              />
              <DetailCard
                icon={<School className="text-green-400" size={20} />}
                title="Mentor"
                content={game.mentor || "N/A"}
              />
              <DetailCard
                icon={<Code className="text-purple-400" size={20} />}
                title="Tech Stack"
                content={
                  game.techStack && game.techStack.length > 0
                    ? game.techStack.join(", ")
                    : "N/A"
                }
              />
              <DetailCard
                icon={<Award className="text-yellow-400" size={20} />}
                title="Created On"
                content={new Date(game.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {game.github && (
                <a
                  href={game.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                >
                  <Code className="mr-2" size={18} />
                  GitHub
                </a>
              )}
              {game.hostedLink && (
                <a
                  href={game.hostedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                >
                  <ExternalLink className="mr-2" size={18} />
                  Live Demo
                </a>
              )}
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
              {game.sdgs && game.sdgs.length > 0 ? (
                game.sdgs.map((sdg, index) => (
                  <div
                    key={index}
                    className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-2 rounded-lg"
                  >
                    {sdg}
                  </div>
                ))
              ) : (
                <div className="text-gray-400">No SDGs specified</div>
              )}
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
              {game.techStack && game.techStack.length > 0 ? (
                game.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-lg"
                  >
                    {tech}
                  </div>
                ))
              ) : (
                <div className="text-gray-400">No tech stack specified</div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          {game.comments && game.comments.length > 0 ? (
            <CommentSection comments={game.comments} />
          ) : (
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center">
              <p className="text-gray-400">No comments available</p>
            </div>
          )}
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

export default ProjectDetails;
