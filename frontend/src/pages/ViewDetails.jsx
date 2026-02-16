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
import { motion, AnimatePresence } from "../motionless";
import { useState, useEffect } from "react";
import axios from "axios"; // Add axios import
import CommentSection from "../components/CommentSection";
import AutoScrollToTop from "../components/AutoScrollToTop";
import { FaRegKeyboard } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDateRange } from "react-icons/md";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [token, setToken] = useState(""); // Add token state
  const [userRating, setUserRating] = useState(0); // Add state for user's rating
  const [hoveredRating, setHoveredRating] = useState(0); // Add state for hover effect
  const [popupUrl, setPopupUrl] = useState(null);

  useEffect(() => {
    // Get token from localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/details/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch project details: ${response.status}`);
      }

      const responseData = await response.json();

      // Extract project data from the nested structure
      if (responseData.success && responseData.data) {
        setGame(responseData.data);
        console.log(responseData.data);
        setLikeCount(responseData.data.likes || 0);

        // Check if user has already liked the project
        if (responseData.data.userHasLiked) {
          setLiked(true);
        }

        // Set user's rating if available
        if (responseData.data.userRating) {
          setUserRating(responseData.data.userRating);
        }
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

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  // Updated handleLike function that accepts projectId parameter
  const handleLike = async (projectId) => {
    const teammates = game?.teammates;
    const mentor = game.mentor;
    const title = game.title;
    const userId = localStorage.getItem("userId");

    try {
      // 1. Like the project
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/${projectId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2. Send notification to teammates and mentor
      const recipients = [...teammates, mentor];
      const notifyPromises = recipients.map((fullName) =>
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`, {
          sentBy: userId,
          fullName,
          title: `New Like on Project`,
          message: `Your project "${title}" was liked by someone.`,
          type: "like",
        })
      );

      await Promise.all(notifyPromises);

      // 3. Refresh UI
      fetchProjectDetails();
    } catch (err) {
      console.error(
        "Error liking project:",
        err.response?.data?.message || err.message
      );
      // alert(err.response?.data?.message || "Failed to like project");
      toast.info(err.response?.data?.message || "Failed to like project");
    }
  };

  // Add handleRate function for rating projects
  const handleRate = async (projectId, ratingValue) => {
    const userId = localStorage.getItem("userId");
    const teammates = game?.teammates;
    const mentor = game.mentor;
    const title = game.title;

    try {
      // 1. Submit rating
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/${projectId}/rate`,
        { rating: ratingValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2. Notify mentor and teammates
      const recipients = [...teammates, mentor]; // array of fullNames
      const notifyPromises = recipients.map((fullName) =>
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`, {
          sentBy: userId,
          fullName,
          title: `Project Rated`,
          message: `Your project "${title}" was rated ${ratingValue} ⭐ by someone.`,
          type: "rating",
        })
      );

      await Promise.all(notifyPromises);

      // 3. Update UI
      setUserRating(ratingValue);
      fetchProjectDetails();
    } catch (err) {
      console.error(
        "Error rating project:",
        err.response?.data?.message || err.message
      );
      // alert(err.response?.data?.message || "Failed to rate project");
      toast.info(err.response?.data?.message || "Failed to rate project");
    }
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
    return `${import.meta.env.VITE_BACKEND_URL}/${formattedPath}`;
  };

  const handleProfileClick = async (userName) => {
    try {
      console.log(userName);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/userDetails/${userName}`
      );
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        console.error("Error fetching user:", data.message);
        toast.error(data.message || "Failed to fetch user details");
        return;
      }

      const userId = data._id; // Assuming the API returns `_id`

      console.log("User ID:", userId);
      navigate(`/userdetails/${userId}`);
    } catch (error) {
      console.error("❌ Error fetching user details:", error);
      toast.error("❌ Error fetching user details:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-2xl" style={{ color: 'var(--text-secondary)' }}>Loading project details...</div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-2xl" style={{ color: '#ff6b6b' }}>
          {error || "Failed to load project details"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ToastContainer position="top-right" autoClose={5000} />
      {popupUrl && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-[90%] max-w-5xl h-[80%] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b bg-gray-100">
              <span className="font-semibold text-gray-700">
                Live Demo Preview
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(popupUrl, "_blank")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Open in New Tab
                </button>
                <button
                  onClick={() => setPopupUrl(null)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              src={popupUrl}
              title="Live Demo"
              className="flex-1 w-full"
            ></iframe>
          </div>
        </div>
      )}

      <AutoScrollToTop />
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
          <h1 className="text-4xl font-extrabold" style={{ color: 'var(--accent-primary)' }}>
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
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: index === currentImageIndex ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.3)',
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Game Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 rounded-3xl p-8 border"
            style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-accent)' }}
          >
            {/* Rating and Like Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center" style={{ color: 'var(--amber-primary)' }}>
                  <Star size={24} fill="currentColor" className="mr-2" />
                  <span className="text-2xl font-bold">
                    {typeof game.rating === "number"
                      ? game.rating.toFixed(1)
                      : "0.0"}
                  </span>
                </div>
                <button
                  onClick={() => handleLike(id)}
                  className="flex items-center transition-colors"
                  style={{
                    color: liked ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                >
                  <Heart
                    size={24}
                    fill={liked ? "currentColor" : "none"}
                    className="mr-2"
                  />
                  {likeCount}
                </button>
              </div>
              <div className="px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--bg-primary)' }}>
                {game.category || "Project"}
              </div>
            </div>

            {/* Rate This Project */}
            <div className="mt-4 rounded-xl p-4 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Rate This Project</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleRate(id, val)}
                    onMouseEnter={() => setHoveredRating(val)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-2xl transition-transform hover:scale-110"
                    style={{
                      color: val <= (hoveredRating || userRating) ? 'var(--amber-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-2" style={{ color: 'var(--text-secondary)' }}>
                  {userRating > 0 ? `Your rating: ${userRating}/5` : ""}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">
              {game.description || "No description available"}
            </p>

            {/* Game Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <DetailCard
                icon={<Users style={{ color: 'var(--accent-primary)' }} size={20} />}
                title="Contributors"
                content={
                  game.teammates && game.teammates.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {game.teammates.map((teammate) => (
                        <span
                          key={teammate}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer font-medium border shadow-sm hover:shadow"
                          onClick={() => handleProfileClick(teammate)}
                          style={{
                            color: 'var(--accent-primary)',
                            backgroundColor: 'var(--bg-secondary)',
                            borderColor: 'var(--accent-primary)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                            e.currentTarget.style.borderColor = 'var(--accent-light)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                          }}
                        >
                          {teammate}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "None"
                  )
                }
              />
              <DetailCard
                icon={<School style={{ color: 'var(--amber-primary)' }} size={20} />}
                title="Mentor"
                content={
                  game.mentor ? (
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer font-medium border shadow-sm hover:shadow"
                      onClick={() => handleProfileClick(game.mentor)}
                      style={{
                        color: 'var(--amber-primary)',
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--amber-primary)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                        e.currentTarget.style.borderColor = 'var(--amber-light)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        e.currentTarget.style.borderColor = 'var(--amber-primary)';
                      }}
                    >
                      {game.mentor}
                    </span>
                  ) : (
                    "N/A"
                  )
                }
              />
              <DetailCard
                icon={<MdDateRange style={{ color: 'var(--amber-primary)' }} size={20} />}
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
                  className="flex-1 text-white py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary)'}
                >
                  <Code className="mr-2" size={18} />
                  GitHub
                </a>
              )}
              {game.hostedLink && (
                <button
                  onClick={() => setPopupUrl(game.hostedLink)}
                  className="flex-1 text-white py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                  style={{ backgroundColor: 'var(--amber-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--amber-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--amber-primary)'}
                >
                  <ExternalLink className="mr-2" size={18} />
                  Live Demo
                </button>
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
            className="rounded-3xl p-8 border"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)', overflow: "auto" }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--accent-primary)' }}>
              Sustainable Development Goals
            </h2>
            <div className="flex flex-wrap gap-4">
              {game.sdgs && game.sdgs.length > 0 ? (
                game.sdgs.map((sdg, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      borderColor: 'var(--accent-light)',
                      color: 'var(--accent-light)',
                    }}
                  >
                    {sdg}
                  </div>
                ))
              ) : (
                <div style={{ color: 'var(--text-secondary)' }}>No SDGs specified</div>
              )}
            </div>
          </div>
          <div
            className="rounded-3xl p-8 border"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)', overflow: "auto" }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--amber-primary)' }}>
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-4">
              {game.techStack && game.techStack.length > 0 ? (
                game.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-lg border"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      borderColor: 'var(--amber-primary)',
                      color: 'var(--amber-light)',
                    }}
                  >
                    {tech}
                  </div>
                ))
              ) : (
                <div style={{ color: 'var(--text-secondary)' }}>No tech stack specified</div>
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
          <CommentSection projectDetails={game} />
        </motion.div>
      </div>
    </div>
  );
};

// Reusable Detail Card Component
const DetailCard = ({ icon, title, content }) => (
  <div className="rounded-xl p-4 flex items-start space-x-4 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}>
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="text-xs uppercase" style={{ color: 'var(--text-secondary)' }}>{title}</p>
      <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{content}</div>
    </div>
  </div>
);

export default ProjectDetails;

