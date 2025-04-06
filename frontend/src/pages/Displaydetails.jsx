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
  FaSave,
  FaTimes,
} from "react-icons/fa";
import AutoScrollToTop from "../components/AutoScrollToTop";

const UserProfile = () => {
  const userId = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isProfileOwner, setIsProfileOwner] = useState(false);

  // Function to fetch user data from backend
  const getUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/details/${userId.id}`
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserDetails(userId);
        if (data) {
          setUserData(data);
          setEditedData(data); // Initialize editedData with fetched data
          
          // Check if current user is the profile owner
          // Get the current user's ID from localStorage or wherever you store it
          const currentUserId = localStorage.getItem('userId'); // Adjust based on how you store the user ID
          setIsProfileOwner(currentUserId === userId.id);
          
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

  // Function to update user data
  const updateUserDetails = async (userId, updatedData) => {
    try {
      // Get the token from localStorage or wherever you store it
      const token = localStorage.getItem('token'); // Adjust based on how you store the token
      
      const response = await fetch(
        `http://localhost:5000/api/users/update/${userId.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Add auth token if you're using one
          },
          body: JSON.stringify(updatedData),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user details");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
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
          setEditedData(data); // Initialize editedData with fetched data
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

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      // If canceling edit, reset editedData to current userData
      setEditedData(userData);
    }
    setIsEditing(!isEditing);
  };

  // Save edited data
  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const updatedUser = await updateUserDetails(userId, editedData);
      setUserData(updatedUser); // Update the userData state with the response
      setEditedData(updatedUser); // Keep editedData in sync
      setIsEditing(false);
    } catch (error) {
      setError("Failed to save changes");
    } finally {
      setSaveLoading(false);
    }
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

  // Create user object directly from userData (not as a separate object with defaults)
  // This ensures we're always displaying the most current data
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

  // Fields that can be edited - Personal Information section
  const personalInfoFields = [
    { id: 'fullName', label: 'Full Name', icon: <FaIdCard />, value: editedData.fullName || '' },
    { id: 'email', label: 'Email', icon: <FaEnvelope />, value: editedData.email || '', type: 'email' },
    { id: 'mobile', label: 'Mobile', icon: <FaPhone />, value: editedData.mobile || '', type: 'tel' },
    { id: 'age', label: 'Age', icon: <FaCalendarAlt />, value: editedData.age || '', type: 'number' },
    { id: 'gender', label: 'Gender', icon: <FaVenusMars />, value: editedData.gender || '' },
  ];

  // Fields for Education & Career section - Removed social media fields
  const educationCareerFields = [
    { id: 'currentPursuit', label: 'Current Pursuit', icon: <FaUserGraduate />, value: editedData.currentPursuit || '' },
    { id: 'institution', label: 'Institution', icon: <FaUniversity />, value: editedData.institution || '' },
    { id: 'role', label: 'Role', icon: <FaBriefcase />, value: editedData.role || '' },
    { id: 'city', label: 'City', icon: <FaMapMarkerAlt />, value: editedData.city || '' },
    { id: 'state', label: 'State', icon: <FaMapMarkerAlt />, value: editedData.state || '' },
  ];

  // Social media fields - Only for editing mode
  const socialMediaFields = [
    { id: 'instagram', label: 'Instagram', icon: <FaInstagram />, value: editedData.instagram || '' },
    { id: 'twitter', label: 'Twitter', icon: <FaTwitter />, value: editedData.twitter || '' },
    { id: 'linkedin', label: 'LinkedIn', icon: <FaLinkedin />, value: editedData.linkedin || '' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900 text-white pt-12 pb-16 px-4 sm:px-6 relative">
      <AutoScrollToTop/>
      
      {/* Background gradient circles */}
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
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={editedData.fullName || ''}
                onChange={handleInputChange}
                className="text-3xl font-bold bg-transparent border-b border-amber-400 mb-2 w-full focus:outline-none focus:border-pink-500"
              />
            ) : (
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500 mb-2">
                {user.fullName}
              </h3>
            )}
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-xl text-gray-300 mb-4">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <FaGraduationCap className="text-green-400" />
                  <input
                    type="text"
                    name="currentPursuit"
                    value={editedData.currentPursuit || ''}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-green-400 focus:outline-none focus:border-pink-500"
                  />
                </div>
              ) : (
                <p className="flex items-center gap-2">
                  <FaGraduationCap className="text-green-400" />
                  <span>{user.currentPursuit}</span>
                </p>
              )}
              
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-blue-400" />
                  <input
                    type="text"
                    name="role"
                    value={editedData.role || ''}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-blue-400 focus:outline-none focus:border-pink-500"
                  />
                </div>
              ) : (
                <p className="flex items-center gap-2">
                  <FaBriefcase className="text-blue-400" />
                  <span>{user.role}</span>
                </p>
              )}
            </div>
            
            {isEditing ? (
              <div className="flex items-center justify-center md:justify-start gap-2">
                <FaGlobe className="text-teal-400" />
                <input
                  type="text"
                  name="city"
                  value={editedData.city || ''}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="bg-transparent border-b border-teal-400 focus:outline-none focus:border-pink-500 w-24"
                />
                <input
                  type="text"
                  name="state"
                  value={editedData.state || ''}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="bg-transparent border-b border-teal-400 focus:outline-none focus:border-pink-500 w-24"
                />
              </div>
            ) : (
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                <FaGlobe className="text-teal-400" />
                <span>
                  {user.city}
                  {user.state ? `, ${user.state}` : ""}
                </span>
              </p>
            )}

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              {isEditing ? (
                <>
                  <div className="relative">
                    <input
                      type="text"
                      name="instagram"
                      value={editedData.instagram || ''}
                      onChange={handleInputChange}
                      placeholder="Instagram URL"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="p-2 bg-gray-700 hover:bg-pink-900/70 rounded-full text-pink-400">
                      <FaInstagram size={20} />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="twitter"
                      value={editedData.twitter || ''}
                      onChange={handleInputChange}
                      placeholder="Twitter URL"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="p-2 bg-gray-700 hover:bg-blue-900/70 rounded-full text-blue-400">
                      <FaTwitter size={20} />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="youtube"
                      value={editedData.youtube || ''}
                      onChange={handleInputChange}
                      placeholder="YouTube URL"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="p-2 bg-gray-700 hover:bg-red-900/70 rounded-full text-red-400">
                      <FaGithub size={20} />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="linkedin"
                      value={editedData.linkedin || ''}
                      onChange={handleInputChange}
                      placeholder="LinkedIn URL"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="p-2 bg-gray-700 hover:bg-blue-900/70 rounded-full text-blue-500">
                      <FaLinkedin size={20} />
                    </div>
                  </div>
                </>
              ) : (
                <>
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
              {personalInfoFields.map((field) => (
                <div key={field.id} className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800/70 rounded-full text-amber-400">
                    {field.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm">{field.label}</p>
                    {isEditing ? (
                      <input
                        type={field.type || "text"}
                        name={field.id}
                        value={field.value}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-amber-400 focus:outline-none focus:border-pink-500"
                      />
                    ) : (
                      <p className="font-medium">
                        {user[field.id] || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 shadow-lg">
            <h4 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
              <FaGraduationCap /> Education & Career
            </h4>

            <div className="space-y-5">
              {educationCareerFields.map((field) => (
                <div key={field.id} className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800/70 rounded-full text-green-400">
                    {field.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm">{field.label}</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field.id}
                        value={field.value}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-green-400 focus:outline-none focus:border-pink-500"
                      />
                    ) : (
                      <p className="font-medium">
                        {user[field.id] || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
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

        {/* Social Media section - Only visible when editing */}
        {isEditing && (
          <div className="mt-6 bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 shadow-lg">
            <h4 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              <FaGlobe /> Social Media Links
            </h4>
            
            <div className="space-y-5">
              {socialMediaFields.map((field) => (
                <div key={field.id} className="flex items-center gap-4">
                  <div className="p-3 bg-gray-800/70 rounded-full text-blue-400">
                    {field.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm">{field.label}</p>
                    <input
                      type="text"
                      name={field.id}
                      value={field.value}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-blue-400 focus:outline-none focus:border-pink-500"
                      placeholder={`Enter your ${field.label} URL`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {/* Edit/Save Profile Button */}
<div className="mt-8 flex justify-center gap-4">
  {isEditing ? (
    <>
      <button
        onClick={handleSave}
        disabled={saveLoading}
        className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-green-500/20 flex items-center gap-3"
      >
        {saveLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <FaSave />
        )}
        Save Changes
      </button>
      <button
        onClick={toggleEditMode}
        className="px-8 py-3 bg-gradient-to-r from-gray-500 to-red-500 text-white font-bold text-lg rounded-xl hover:from-gray-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/20 flex items-center gap-3"
      >
        <FaTimes /> Cancel
      </button>
    </>
  ) : (
    // Only show Edit button if current user is the profile owner
    isProfileOwner && (
      <button
        onClick={toggleEditMode}
        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold text-lg rounded-xl hover:from-amber-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/20 flex items-center gap-3"
      >
        <FaEdit /> Edit Profile
      </button>
    )
  )}
</div>
      </div>
    </div>
  );
};

export default UserProfile;