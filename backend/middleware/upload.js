const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in "uploads/" folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Create unique filenames
  },
});

// Middleware for multiple file uploads (array)
const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).array("media", 3); // 'media' is the field name, and 3 is the max number of files

// Middleware for single file upload (profileImage)
const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).single("profileImage"); // 'profileImage' is the field name for a single file

module.exports = { uploadMultiple, uploadSingle };
