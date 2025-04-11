import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Calendar,
  User,
  MessageSquare,
  Check,
  Trash2,
} from "lucide-react";
import { FcIdea } from "react-icons/fc";

const NotificationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const drawerRef = useRef(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // Click outside handler to close drawer
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/notifications/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setNotifications(data);
        setUnreadCount(data.filter((n) => !n.isRead).length);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchNotifications();
    }
  }, [token]);

  // Mark a single notification as read
  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/read/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Delete failed:", data.message);
        // If deletion fails, you might want to revert the UI changes here
      } else {
        setNotifications((prev) =>
          prev.filter((notification) => notification._id !== id)
        );

        // Update unread count if needed
        const deletedNotification = notifications.find((n) => n._id === id);
        if (deletedNotification && !deletedNotification.isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      console.error("Error deleting notification:", err);
      // You might want to revert UI changes on error
    }
  };

  // Helper to get the icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "projectStatus":
        return <FcIdea className="text-xl" />;
      case "achievement":
        return (
          <div className="text-amber-400">
            <Bell size={18} />
          </div>
        );
      case "like" || "rating":
        return (
          <div className="text-blue-400">
            <User size={18} />
          </div>
        );
      case "reminder":
        return (
          <div className="text-purple-400">
            <Calendar size={18} />
          </div>
        );
      default:
        return (
          <div className="text-gray-400">
            <MessageSquare size={18} />
          </div>
        );
    }
  };

  // Format the time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <>
      {/* Floating Notification Button */}
      <motion.div
        className="fixed left-6 bottom-6 z-40"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3,
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
        >
          <Bell size={24} />

          {/* Notification Badge */}
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Notification Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 z-50 w-full sm:w-96 max-h-[80vh] bg-gray-900/95 backdrop-blur-md shadow-xl rounded-tr-2xl overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between bg-gray-800 px-6 py-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Bell size={20} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Notifications
                </h2>

                {/* Unread count badge */}
                {unreadCount > 0 && (
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {unreadCount} new
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[calc(80vh-64px)]">
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin h-8 w-8 border-3 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                  <div className="bg-gray-800 p-4 rounded-full mb-3">
                    <Bell size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-400 mb-2">No notifications yet</p>
                  <p className="text-gray-500 text-sm">
                    When you get notifications, they'll appear here
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-700">
                  {notifications.map((notification) => (
                    <motion.li
                      key={notification._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ backgroundColor: "rgba(75, 85, 99, 0.3)" }}
                      className={`px-6 py-4 transition-colors ${
                        !notification.isRead ? "bg-blue-900/20" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-gray-800 p-2 rounded-lg flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p
                              className={`font-medium ${
                                !notification.isRead
                                  ? "text-white"
                                  : "text-gray-300"
                              }`}
                            >
                              {notification.title}
                            </p>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {formatTime(notification.createdAt)}
                            </span>
                          </div>
                          <p
                            className={`text-sm mt-1 ${
                              !notification.isRead
                                ? "text-gray-300"
                                : "text-gray-400"
                            }`}
                          >
                            {notification.message}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col space-y-2 flex-shrink-0">
                          {!notification.isRead && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification._id);
                              }}
                              className="flex-shrink-0 bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-full transition-colors"
                              title="Mark as read"
                            >
                              <Check size={16} />
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification._id);
                            }}
                            className="flex-shrink-0 bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-full transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Improved Drawer Footer */}
            <div className="border-t border-gray-700 p-4 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-purple-500/20"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationComponent;
