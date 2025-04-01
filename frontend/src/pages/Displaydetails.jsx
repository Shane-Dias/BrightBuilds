import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUniversity,
  FaIdCard,
  FaCalendarAlt,
  FaVenusMars,
  FaUserGraduate,
  FaGraduationCap,
  FaBriefcase,
  FaGlobe,
  FaUser,
} from "react-icons/fa";

const UserProfile = () => {
  const userId  = useParams();
  useEffect(() => {
    console.log("🔍 userId from useParams:", userId); // Debugging

    if (!userId) {
      setError("Invalid user ID");
      setLoading(false);
      return;
    }
  });

  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user data from backend
  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/details/${userId.id}`  //here
      );
      if (!response.ok) {
        throw new Error("User not found!");
      }
      const data = await response.json();
      console.log("User Data:", data); // Debugging
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  // Function to get image URL
  const getImageUrl = (mediaPath) => {
    if (!mediaPath) return null;
    mediaPath = mediaPath.replace(/\\/g, "/");
    return `http://localhost:5000/${mediaPath}`;
  };

  // Effect to fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserDetails(userId);
        if (data) {
          setUserData(data);
          setError(null);
        } else {
          setError("Failed to load user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Effect to trigger fade-in animation on component mount
  useEffect(() => {
    // Small delay to ensure the initial opacity: 0 is applied first
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-amber-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error message
  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="max-w-md p-8 bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl border border-red-500/50 text-center">
          <h3 className="text-2xl font-bold text-red-500 mb-4">Error</h3>
          <p className="text-gray-300 mb-6">
            {error || "Failed to load user profile"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Fallback data for any missing fields
  const user = {
    fullName: userData.fullName || "User",
    email: userData.email || "No email provided",
    age: userData.age || "N/A",
    gender: userData.gender || "Not specified",
    mobile: userData.mobile || "No phone provided",
    currentPursuit: userData.currentPursuit || "Not specified",
    institution: userData.institution || "Not specified",
    role: userData.role || "User",
    city: userData.city || "Not specified",
    state: userData.state || "",
    profileImage: userData.profileImage
      ? getImageUrl(userData.profileImage)
      : null,
    instagram: userData.instagram || "",
    twitter: userData.twitter || "",
    youtube: userData.youtube || "",
    linkedin: userData.linkedin || "",
    createdAt: userData.createdAt || new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white pt-12 pb-16 px-4 sm:px-6 relative">
      {/* Background gradient circles for visual interest */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>

      <h2
        className={`text-5xl pt-8 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500 mb-12 transition-opacity duration-2000 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        User Profile
      </h2>

      <div
        className={`max-w-4xl mx-auto p-8 bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-400/50 transition-all duration-3000 ease-in-out ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-10"
        }`}
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-5xl text-amber-400 font-bold">
                    {user.fullName.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>

          {/* User Name and Brief Info */}
          <div className="text-center md:text-left md:flex-1">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500 mb-2">
              {user.fullName}
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-xl text-gray-300 mb-4">
              <p className="flex items-center gap-2">
                <FaGraduationCap className="text-green-400" />
                <span>{user.currentPursuit}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaBriefcase className="text-blue-400" />
                <span>{user.role}</span>
              </p>
            </div>
            <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
              <FaGlobe className="text-teal-400" />
              <span>
                {user.city}
                {user.state ? `, ${user.state}` : ""}
              </span>
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              {user.instagram && (
                <a
                  href={user.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 hover:bg-pink-900/70 rounded-full text-pink-400 transition-colors duration-300"
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {user.twitter && (
                <a
                  href={user.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 hover:bg-blue-900/70 rounded-full text-blue-400 transition-colors duration-300"
                >
                  <FaTwitter size={20} />
                </a>
              )}
              {user.youtube && (
                <a
                  href={user.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 hover:bg-red-900/70 rounded-full text-red-400 transition-colors duration-300"
                >
                  <FaGithub size={20} />
                </a>
              )}
              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 hover:bg-blue-900/70 rounded-full text-blue-500 transition-colors duration-300"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {/* Display grayed-out icons if no social links provided */}
              {!user.instagram &&
                !user.twitter &&
                !user.youtube &&
                !user.linkedin && (
                  <>
                    <span className="p-2 bg-gray-700/50 rounded-full text-gray-500">
                      <FaInstagram size={20} />
                    </span>
                    <span className="p-2 bg-gray-700/50 rounded-full text-gray-500">
                      <FaTwitter size={20} />
                    </span>
                    <span className="p-2 bg-gray-700/50 rounded-full text-gray-500">
                      <FaGithub size={20} />
                    </span>
                    <span className="p-2 bg-gray-700/50 rounded-full text-gray-500">
                      <FaLinkedin size={20} />
                    </span>
                  </>
                )}
            </div>
          </div>
        </div>

        {/* User Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 shadow-lg">
            <h4 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
              <FaUser /> Personal Information
            </h4>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-amber-400">
                  <FaIdCard />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="font-medium">{user.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-amber-400">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-amber-400">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mobile</p>
                  <p className="font-medium">{user.mobile}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-amber-400">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Age</p>
                  <p className="font-medium">
                    {user.age} {user.age !== "N/A" ? "years" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-amber-400">
                  <FaVenusMars />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Gender</p>
                  <p className="font-medium">{user.gender}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 shadow-lg">
            <h4 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
              <FaGraduationCap /> Education & Career
            </h4>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-green-400">
                  <FaUserGraduate />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Current Pursuit</p>
                  <p className="font-medium">{user.currentPursuit}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-green-400">
                  <FaUniversity />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Institution</p>
                  <p className="font-medium">{user.institution}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-green-400">
                  <FaBriefcase />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Role</p>
                  <p className="font-medium">{user.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-green-400">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="font-medium">
                    {user.city}
                    {user.state ? `, ${user.state}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-800/70 rounded-full text-green-400">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Member Since</p>
                  <p className="font-medium">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-amber-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/20 flex items-center gap-3">
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
