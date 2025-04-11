const Notification = require("../models/Notification_schema");
const User = require("../models/User_schema");

exports.createNotification = async (req, res) => {
  const { sentBy, userId, fullName, title, message, type } = req.body;

  try {
    let recipient;

    if (userId) {
      recipient = await User.findById(userId);
    } else if (fullName) {
      recipient = await User.findOne({ fullName });
    }

    if (!recipient) {
      return res.status(404).json({ message: "Recipient user not found" });
    }

    const newNotification = new Notification({
      sentBy,
      sentTo: recipient._id,
      title,
      message,
      type,
    });

    await newNotification.save();
    res
      .status(201)
      .json({ message: "Notification sent", notification: newNotification });
  } catch (err) {
    console.error("❌ Error creating notification:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all notifications for a user
exports.getNotificationsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const notifications = await Notification.find({ sentTo: userId })
      .populate("sentBy", "fullName role")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    res.status(200).json({ success: true, updated });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (err) {
    console.error("Error deleting notification:", err);
    res.status(500).json({ message: "Server error" });
  }
};
