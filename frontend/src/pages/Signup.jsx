import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "../motionless";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Github,
  Calendar,
  Upload,
  ChevronDown,
  Check,
  Lock,
  EyeOff,
  Eye,
} from "lucide-react";
import AutoScrollToTop from "../components/AutoScrollToTop";

const SignupPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    email: "",
    mobile: "",
    role: "",
    currentPursuit: "",
    institution: "",
    city: "",
    state: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    github: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const roleOptions = ["Student", "Faculty", "User"];

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();

      // Append all form fields (without extra quotes)
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append the profile image if it exists
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }

      // Log what we're sending (for debugging)
      console.log("Submitting:", {
        ...formData,
        profileImage: profileImage?.name || "None",
      });

      // Send to backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, {
        method: "POST",
        body: formDataToSend,
        // headers are automatically set by browser for FormData
      });

      const data = await response.json();

      if (!response.ok) {
        // Display error toast with the server message
        toast.error(data.message || "Signup failed");
        throw new Error(data.message || "Signup failed");
      }

      // Display success toast
      toast.success("Signup successful! Welcome aboard!");
      console.log("Signup successful:", data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup error:", error);
      // toast.error("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  // Gender options
  const genderOptions = ["Male", "Female", "Other", "None"];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.97 },
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen py-12 pt-24 px-4"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <AutoScrollToTop />
      <ToastContainer position="top-right" autoClose={5000} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-3xl p-6 sm:p-8 mx-4 overflow-hidden rounded-2xl shadow-xl border"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}
      >
        {/* Glowing background effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          ></div>
          <div
            className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: 'var(--amber-primary)' }}
          ></div>
        </div>

        {/* Signup form */}
        <div className="relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-8"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Create Your Account
            </motion.h2>
            <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)' }}>
              Join our community today
            </motion.p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6 signup-form"
          >
            {/* Profile Image Upload */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-28 rounded-full border-2 flex items-center justify-center overflow-hidden cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-accent)' }}
                  onClick={() => fileInputRef.current.click()}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload size={32} style={{ color: 'var(--text-secondary)' }} />
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 rounded-full p-2 shadow-lg border"
                  style={{ backgroundColor: 'var(--accent-primary)', borderColor: 'var(--bg-primary)' }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <Upload size={16} className="text-white" />
                </motion.div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-xs text-center mt-2" style={{ color: 'var(--text-secondary)' }}>
                  Upload profile photo
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  User Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(47, 167, 111, 0.35)",
                    }}
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                    style={{ borderColor: 'var(--border-accent)' }}
                    placeholder="Enter your user name"
                    required
                  />
                </div>
              </motion.div>

              {/* Age */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Age
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Calendar size={18} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(47, 167, 111, 0.35)",
                    }}
                    id="age"
                    name="age"
                    type="number"
                    min="13"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                    style={{ borderColor: 'var(--border-accent)' }}
                    placeholder="Your age"
                    required
                  />
                </div>
              </motion.div>
              {/* Gender Dropdown */}
              <motion.div variants={itemVariants} className="group relative">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Gender
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={18} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setGenderOpen((prev) => !prev);
                      setRoleOpen(false);
                    }}
                    className="flex items-center justify-between w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}
                  >
                    <span
                      style={{
                        color: formData.gender ? 'var(--text-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      {formData.gender || "Select gender"}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        genderOpen ? "transform rotate-180" : ""
                      }`}
                      style={{ color: 'var(--text-secondary)' }}
                    />
                  </motion.button>

                  {genderOpen && (
                    <div
                      className="absolute z-10 w-full mt-1 rounded-lg shadow-lg overflow-hidden border"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}
                    >
                      <div className="py-1">
                        {genderOptions.map((option) => (
                          <div
                            key={option}
                            className="px-3 py-2 cursor-pointer flex items-center hover:bg-[var(--bg-tertiary)]"
                            onClick={() => {
                              setFormData({ ...formData, gender: option });
                              setGenderOpen(false);
                            }}
                          >
                            {formData.gender === option && (
                              <Check size={16} className="mr-2" style={{ color: 'var(--accent-primary)' }} />
                            )}
                            <span
                              className={formData.gender === option ? "pl-0" : "pl-6"}
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Role */}
              <motion.div variants={itemVariants} className="group relative">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium mb-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building size={18} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setRoleOpen((prev) => !prev);
                      setGenderOpen(false);
                    }}
                    className="flex items-center justify-between w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent transition-all duration-200"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}
                  >
                    <span
                      style={{
                        color: formData.role ? 'var(--text-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      {formData.role || "Select role"}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        roleOpen ? "transform rotate-180" : ""
                      }`}
                      style={{ color: 'var(--text-secondary)' }}
                    />
                  </motion.button>
                  {roleOpen && (
                    <div
                      className="absolute z-10 w-full mt-1 rounded-lg shadow-lg overflow-hidden border"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-accent)' }}
                    >
                      <div className="py-1">
                        {roleOptions.map((option) => (
                          <div
                            key={option}
                            className="px-3 py-2 cursor-pointer flex items-center hover:bg-[var(--bg-tertiary)]"
                            onClick={() => {
                              setFormData({ ...formData, role: option });
                              setRoleOpen(false);
                            }}
                          >
                            {formData.role === option && (
                              <Check size={16} className="mr-2" style={{ color: 'var(--accent-primary)' }} />
                            )}
                            <span
                              className={formData.role === option ? "pl-0" : "pl-6"}
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                    }}
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </motion.div>

              {/* Mobile */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone size={18} className="text-gray-500" />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                    }}
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your phone number"
                    required
                  />
                </div>
              </motion.div>

              {/* Current Pursuit */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="currentPursuit"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Currently Pursuing
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building size={18} className="text-gray-500" />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                    }}
                    id="currentPursuit"
                    name="currentPursuit"
                    type="text"
                    value={formData.currentPursuit}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Computer Engg, BSc IT, etc"
                    required
                  />
                </div>
              </motion.div>

              {/* School/College */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="institution"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  School/College
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building size={18} className="text-gray-500" />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                    }}
                    id="institution"
                    name="institution"
                    type="text"
                    value={formData.institution}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your educational institution"
                  />
                </div>
              </motion.div>

              {/* City */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin size={18} className="text-gray-500" />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                    }}
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your city"
                    required
                  />
                </div>
              </motion.div>

              {/* State */}
              <motion.div variants={itemVariants} className="group">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  State
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin size={18} className="text-gray-500" />
                  </div>
                  <motion.input
                    whileFocus={{
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                    }}
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your state"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Social Media Section */}
            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
                Social Media Profiles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LinkedIn */}
                <motion.div variants={itemVariants} className="group">
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    LinkedIn
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Linkedin size={18} className="text-gray-500" />
                    </div>
                    <motion.input
                      whileFocus={{
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                      }}
                      id="linkedin"
                      name="linkedin"
                      type="text"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </motion.div>

                {/* Instagram */}
                <motion.div variants={itemVariants} className="group">
                  <label
                    htmlFor="instagram"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Instagram
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Instagram size={18} className="text-gray-500" />
                    </div>
                    <motion.input
                      whileFocus={{
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                      }}
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="instagram.com/username"
                    />
                  </div>
                </motion.div>

                {/* Twitter/X */}
                <motion.div variants={itemVariants} className="group">
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    X (Twitter)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Twitter size={18} className="text-gray-500" />
                    </div>
                    <motion.input
                      whileFocus={{
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                      }}
                      id="twitter"
                      name="twitter"
                      type="text"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="x.com/username"
                    />
                  </div>
                </motion.div>

                {/* Github */}
                <motion.div variants={itemVariants} className="group">
                  <label
                    htmlFor="github"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Github
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Github size={18} className="text-gray-500" />
                    </div>
                    <motion.input
                      whileFocus={{
                        boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                      }}
                      id="github"
                      name="github"
                      type="text"
                      value={formData.github}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="github.com/user-name"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="group">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <motion.input
                  whileFocus={{
                    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
                  }}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.div variants={itemVariants} className="pt-4">
              <motion.button
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 relative overflow-hidden"
                style={{ backgroundColor: 'var(--accent-primary)' }}
                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
              >
                {isLoading ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center"
                  >
                    Create Account
                  </motion.span>
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Login link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Already have an account?{" "}
              <motion.a
                href="login"
                whileHover={{ scale: 1.05, color: "#5dd3a7" }}
                whileTap={{ scale: 0.95 }}
                className="font-medium transition-colors duration-200"
                style={{ color: 'var(--accent-primary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
              >
                Sign in
              </motion.a>
            </p>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .signup-form label {
          color: var(--text-secondary);
        }
        .signup-form input {
          background-color: var(--bg-secondary);
          border-color: var(--border-accent);
          color: var(--text-primary);
        }
        .signup-form input::placeholder {
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
};

export default SignupPage;

