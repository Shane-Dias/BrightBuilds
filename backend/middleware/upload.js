const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mern_uploads", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) => Date.now() + "-" + file.originalname, // optional
  },
});

// Multer middlewares
const uploadMultiple = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("media", 3);

const uploadSingle = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("profileImage");

module.exports = { uploadMultiple, uploadSingle };
