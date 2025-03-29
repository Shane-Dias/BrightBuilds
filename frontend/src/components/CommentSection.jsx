import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, User, Send } from "lucide-react";

export const CommentSection = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "Current User",
        text: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        liked: false,
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim()) {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                author: "Current User",
                text: replyText,
                timestamp: new Date().toISOString(),
                likes: 0,
                liked: false,
              },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  const toggleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                    liked: !reply.liked,
                  };
                }
                return reply;
              }),
            };
          }
          return comment;
        })
      );
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked,
            };
          }
          return comment;
        })
      );
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
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
        Community Discussions
      </h2>

      {/* Comment Input */}
      <div className="flex gap-4 mb-10">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
            <User size={24} className="text-blue-300" />
          </div>
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            rows={4}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleAddComment}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all flex items-center"
            >
              <Send size={18} className="mr-2" />
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 bg-white/10 rounded-xl">
            <p className="text-gray-400 mb-4">No comments yet.</p>
            <p className="text-sm text-gray-500">
              Be the first to start the conversation!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 rounded-xl p-5 border border-white/10"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <User size={20} className="text-blue-300" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-blue-200">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-200 mb-4">{comment.text}</p>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className="flex items-center text-gray-400 hover:text-pink-400 transition-colors"
                    >
                      <Heart
                        size={18}
                        fill={comment.liked ? "currentColor" : "none"}
                        className="mr-2"
                      />
                      {comment.likes}
                    </button>
                    <button
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment.id ? null : comment.id
                        )
                      }
                      className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Reply
                    </button>
                  </div>

                  {/* Reply Input */}
                  <AnimatePresence>
                    {replyingTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pl-4 border-l-2 border-blue-500/30"
                      >
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          rows={3}
                        />
                        <div className="flex justify-end gap-3 mt-3">
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="bg-white/10 hover:bg-white/20 text-gray-300 px-4 py-2 rounded-lg transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAddReply(comment.id)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center"
                          >
                            <Send size={16} className="mr-2" />
                            Post Reply
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-6 space-y-4 pl-4 border-l-2 border-blue-500/30">
                      {comment.replies.map((reply) => (
                        <motion.div
                          key={reply.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-white/5 rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <User size={16} className="text-blue-300" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-blue-200 text-sm">
                                  {reply.author}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatDate(reply.timestamp)}
                                </span>
                              </div>
                              <p className="text-gray-200 text-sm mb-3">
                                {reply.text}
                              </p>
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    toggleLike(reply.id, true, comment.id)
                                  }
                                  className="flex items-center text-gray-400 hover:text-pink-400 transition-colors text-sm"
                                >
                                  <Heart
                                    size={14}
                                    fill={reply.liked ? "currentColor" : "none"}
                                    className="mr-1"
                                  />
                                  {reply.likes}
                                </button>
                              </div>
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
    </div>
  );
};

export default CommentSection;
