import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, User, Send, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CommentSection = ({ projectDetails }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyIsPrivate, setReplyIsPrivate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Get project ID from URL
  const projectId = window.location.pathname.split("/").pop();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Fetch user details function
  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/details/${userId}`
      );
      if (!response.ok) {
        throw new Error("User not found!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  // Fetch current user details when component loads
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (userId) {
        try {
          const userData = await getUserDetails(userId);
          if (userData) {
            setCurrentUser(userData);
          }
        } catch (err) {
          console.error("Error fetching current user:", err);
        }
      }
    };

    fetchCurrentUser();
  }, [userId]);

  // Fetch comments when component loads
  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${projectId}`
      );
      setComments(res.data);
      console.log("Fetched comments:", res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Check if user is a teammate
  const isTeamMember = () => {
    if (!currentUser || !projectDetails.teammates) return false;
    return projectDetails.teammates.includes(currentUser.fullName);
  };

  // Check if a comment should be visible to the current user
  const shouldShowComment = (comment) => {
    // If comment is not private, show to everyone
    if (!comment.isPrivate) return true;

    // If comment is private, show only to team members
    return isTeamMember();
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const projectTitle = projectDetails.title || "Project Title";
    const mentor = projectDetails.mentor || "Mentor Name";
    const teammates = projectDetails.teammates || [];
    console.log(
      `Teammates: ${teammates}, mentor:${mentor}, project title:${projectTitle}`
    );

    try {
      // 1. Post the comment
      await axios.post(
        `http://localhost:5000/api/comments/${projectId}`,
        {
          projectId,
          commentText: newComment,
          isPrivate: isPrivate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. Notify all contributors
      // const recipients =
      //   mentor === "Not Assigned" ? [...teammates] : [...teammates, mentor];

      // const sentBy = currentUser?.fullName || "A user"; // Add this line to define sentBy

      // const notifyPromises = recipients.map((fullName) =>
      //   axios.post("http://localhost:5000/api/notifications", {
      //     sentBy,
      //     fullName,
      //     title: "New Comment on Project",
      //     message: `A new ${
      //       isPrivate ? "private" : "public"
      //     } comment was added to the project "${projectTitle}".`,
      //     type: "projectComment",
      //   })
      // );

      // await Promise.all(notifyPromises);

      // 3. Reset UI
      setNewComment("");
      setIsPrivate(false);
      fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
      setError("Failed to post comment. Please try again.");
    }
  };

  const handleProfileClick = async (userName) => {
    try {
      console.log(userName);
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

  const handleAddReply = async (commentId) => {
    if (!replyText.trim()) return;

    try {
      await axios.post(
        `http://localhost:5000/api/comments/${commentId}/replies`,
        {
          replyText,
          projectId,
          isPrivate: replyIsPrivate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReplyText("");
      setReplyIsPrivate(false);
      setReplyingTo(null);
      fetchComments(); // Refresh comments to show new reply
    } catch (err) {
      console.error("Failed to add reply:", err);
      setError("Failed to post reply. Please try again.");
    }
  };

  const toggleLike = async (commentId, isReply = false, parentId = null) => {
    try {
      const endpoint = isReply
        ? `http://localhost:5000/api/comments/${parentId}/replies/${commentId}/like`
        : `http://localhost:5000/api/comments/${commentId}/like`;

      await axios.post(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchComments(); // Refresh comments to update like counts
    } catch (err) {
      console.error("Failed to toggle like:", err);
      setError("Failed to like. Please try again.");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-4 md:p-8 border border-white/10">
      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6 md:mb-8">
        Community Discussions
      </h2>

      {/* Comment Input */}
      {token ? (
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="flex-shrink-0 hidden md:block">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <User size={20} className="text-blue-300" />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 md:p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              rows={3}
            />
            <div className="flex justify-between mt-3">
              <div className="flex items-center gap-2">
                {isTeamMember() && (
                  <label className="flex items-center text-sm text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={() => setIsPrivate(!isPrivate)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Lock size={14} className="mr-1" />
                    Team Only
                  </label>
                )}
              </div>
              <button
                onClick={handleAddComment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 md:px-6 py-2 rounded-lg transition-all flex items-center text-sm md:text-base"
                disabled={!newComment.trim()}
              >
                <Send size={16} className="mr-1 md:mr-2" />
                <span className="hidden xs:inline">Post Comment</span>
                <span className="xs:hidden">Post</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/10 rounded-xl p-4 md:p-5 mb-6 md:mb-8 text-center">
          <p className="text-gray-300">Please log in to join the discussion</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 md:p-4 rounded-xl mb-5 md:mb-6 text-sm md:text-base">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-6 md:py-8">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Comments List */}
      {!loading && (
        <div className="space-y-4 md:space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-6 md:py-8 bg-white/10 rounded-xl">
              <p className="text-gray-400 mb-3 md:mb-4">No comments yet.</p>
              <p className="text-xs md:text-sm text-gray-500">
                Be the first to start the conversation!
              </p>
            </div>
          ) : (
            comments
              .filter((comment) => shouldShowComment(comment))
              .map((comment) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white/10 rounded-xl p-3 md:p-5 border ${
                    comment.isPrivate ? "border-blue-400/30" : "border-white/10"
                  }`}
                >
                  <div className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0 hidden xs:block">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <User size={16} className="text-blue-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                        <span
                          className="inline-flex items-center gap-1 md:gap-1.5 text-blue-200 bg-blue-500/10 hover:bg-blue-500/20 px-2 md:px-3 py-1 rounded-full transition-all duration-200 cursor-pointer font-medium border border-blue-400/20 hover:border-blue-400/50 shadow-sm hover:shadow text-xs md:text-sm"
                          onClick={() =>
                            handleProfileClick(comment.userId?.fullName)
                          }
                        >
                          {comment.userId?.fullName || "Anonymous"}
                        </span>

                        <span className="text-xs text-gray-400">
                          {formatDate(comment.createdAt)}
                        </span>

                        {comment.isPrivate && (
                          <span className="flex items-center text-xs font-medium text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">
                            <Lock size={10} className="mr-1" />
                            Private
                          </span>
                        )}
                      </div>
                      <p className="text-gray-200 text-sm md:text-base mb-3 md:mb-4">
                        {comment.commentText}
                      </p>
                      <div className="flex items-center gap-4 md:gap-6">
                        <button
                          onClick={() => toggleLike(comment._id)}
                          className={`flex items-center ${
                            comment.liked
                              ? "text-pink-400"
                              : "text-gray-400 hover:text-pink-400"
                          } transition-colors text-sm md:text-base`}
                          disabled={!token}
                        >
                          <Heart
                            size={16}
                            fill={comment.liked ? "currentColor" : "none"}
                            className="mr-1 md:mr-2"
                          />
                          {comment.likes}
                        </button>
                        {token && (
                          <button
                            onClick={() =>
                              setReplyingTo(
                                replyingTo === comment._id ? null : comment._id
                              )
                            }
                            className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm md:text-base"
                          >
                            <MessageSquare size={16} className="mr-1 md:mr-2" />
                            Reply
                          </button>
                        )}
                      </div>

                      {/* Reply Input */}
                      <AnimatePresence>
                        {replyingTo === comment._id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 md:mt-4 pl-2 md:pl-4 border-l-2 border-blue-500/30"
                          >
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              className="w-full bg-white/10 border border-white/20 rounded-xl p-2 md:p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm md:text-base"
                              rows={2}
                            />
                            <div className="flex flex-wrap justify-between gap-2 md:gap-3 mt-2 md:mt-3">
                              <div className="flex gap-2 md:gap-3">
                                <button
                                  onClick={() => setReplyingTo(null)}
                                  className="bg-white/10 hover:bg-white/20 text-gray-300 px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all text-xs md:text-sm"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleAddReply(comment._id)}
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all flex items-center text-xs md:text-sm"
                                  disabled={!replyText.trim()}
                                >
                                  <Send size={14} className="mr-1 md:mr-2" />
                                  Reply
                                </button>
                              </div>

                              {isTeamMember() && (
                                <label className="flex items-center text-xs text-gray-300 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={replyIsPrivate}
                                    onChange={() =>
                                      setReplyIsPrivate(!replyIsPrivate)
                                    }
                                    className="mr-1 h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <Lock size={12} className="mr-1" />
                                  Team Only
                                </label>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 md:mt-6 space-y-3 md:space-y-4 pl-2 md:pl-4 border-l-2 border-blue-500/30">
                          {comment.replies
                            .filter(
                              (reply) => !reply.isPrivate || isTeamMember()
                            )
                            .map((reply) => (
                              <motion.div
                                key={reply._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`bg-white/5 rounded-lg p-3 md:p-4 border ${
                                  reply.isPrivate
                                    ? "border-blue-400/30"
                                    : "border-white/10"
                                }`}
                              >
                                <div className="flex gap-2 md:gap-3">
                                  <div className="flex-shrink-0 hidden xs:block">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                      <User
                                        size={14}
                                        className="text-blue-300"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1 md:mb-2">
                                      <span
                                        className="inline-flex items-center gap-1 md:gap-1.5 text-blue-200 bg-blue-500/10 hover:bg-blue-500/20 px-2 md:px-3 py-0.5 md:py-1 rounded-full transition-all duration-200 cursor-pointer font-medium border border-blue-400/20 hover:border-blue-400/50 shadow-sm hover:shadow text-xs"
                                        onClick={() =>
                                          handleProfileClick(
                                            reply.userId?.fullName
                                          )
                                        }
                                      >
                                        {reply.userId?.fullName || "Anonymous"}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {formatDate(reply.createdAt)}
                                      </span>

                                      {reply.isPrivate && (
                                        <span className="flex items-center text-xs font-medium text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">
                                          <Lock size={10} className="mr-1" />
                                          Team Only
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-gray-200 text-xs md:text-sm mb-2 md:mb-3">
                                      {reply.replyText}
                                    </p>
                                    <button
                                      onClick={() =>
                                        toggleLike(reply._id, true, comment._id)
                                      }
                                      className={`flex items-center text-xs ${
                                        reply.liked
                                          ? "text-pink-400"
                                          : "text-gray-400 hover:text-pink-400"
                                      } transition-colors`}
                                      disabled={!token}
                                    >
                                      <Heart
                                        size={14}
                                        fill={
                                          reply.liked ? "currentColor" : "none"
                                        }
                                        className="mr-1"
                                      />
                                      {reply.likes || 0}
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
