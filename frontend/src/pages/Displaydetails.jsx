import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUniversity,
  FaUserGraduate,
  FaIdCard,
  FaCalendarAlt,
  FaVenusMars,
  FaBriefcase,
  FaAward,
  FaCertificate,
  FaStar,
  FaChartLine,
  FaUserFriends,
  FaBook
} from "react-icons/fa";

const UserProfile = () => {
  // Animation state
  const [isVisible, setIsVisible] = useState(false);
  const [tabContentVisible, setTabContentVisible] = useState(true);
  
  // User data
  const [userData, setUserData] = useState({
    fullName: "Shane Dias",
    email: "xyz@gmail.com",
    password: "$2b$10$3iZyMMxFG3WwTImzWU8zt.40axSbZ189k.fW9ZVK3fBnNKxI8Kwie",
    age: 23,
    gender: "Male",
    mobile: "9817283748",
    currentPursuit: "Computer Engineering",
    institution: "Fr. Conceicao Rodrigues College of Engineering",
    role: "Student",
    city: "Mumbai",
    state: "Maharashtra",
    profileImage: "",
    instagram: "",
    twitter: "",
    youtube: "",
    linkedin: "",
    // Additional data for the right side
    skills: ["React.js", "Python", "UI/UX Design", "Node.js", "MongoDB"],
    interests: ["Web Development", "Machine Learning", "Game Design"],
    achievements: [
      { title: "Dean's List", year: "2023" },
      { title: "Hackathon Winner", year: "2022" }
    ],
    projectsCount: 8,
    completedCourses: 12,
    connections: 145
  });

  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");

  // Effect to trigger fade-in animation on component mount
  useEffect(() => {
    // Small delay to ensure the initial opacity: 0 is applied first
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  // Function to handle tab switching with transition
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    
    // Fade out current content
    setTabContentVisible(false);
    
    // Wait for fade out to complete, then change tab and fade in
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setTabContentVisible(true);
      }, 50);
    }, 300); // This should match the CSS transition duration
  };

  // Function to handle edit action (placeholder for now)
  const handleEdit = () => {
    setNotification({
      message: "Edit functionality would open here",
      type: "success"
    });
    
    // Auto-dismiss notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Notification Component (copied from reference)
  const Notification = ({ message, type = "success", onClose }) => {
    return (
      <div
        className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 
          ${
            type === "success"
              ? "bg-green-900 border-green-700"
              : "bg-red-900 border-red-700"
          } 
          text-white flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          {type === "success" ? (
            <span className="text-green-400">✓</span>
          ) : (
            <span className="text-red-400">✕</span>
          )}
          <span>{message}</span>
        </div>
        <button onClick={onClose} className="ml-4 hover:text-gray-300">
          ✕
        </button>
      </div>
    );
  };

  // Close notification manually
  const closeNotification = () => {
    setNotification(null);
  };

  // Function to get tab border color
  const getTabColor = () => {
    switch (activeTab) {
      case 'personal':
        return 'border-amber-400';
      case 'education':
        return 'border-green-400';
      case 'skills':
        return 'border-blue-400';
      default:
        return 'border-amber-400';
    }
  };

  return (
    <div className="min-h-screen px-10 py-16 bg-gray-900 text-white pt-24 relative">
      {/* Notification Component */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <h2 className={`text-4xl font-bold font-lilita text-center text-amber-400 mb-8 transition-opacity duration-2000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        User Profile
      </h2>

      <div className={`max-w-6xl mx-auto p-8 bg-gray-800 font-smooch font-bold text-xl tracking-wide leading-relaxed rounded-2xl shadow-lg border border-amber-400 transition-opacity duration-3000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Profile Image Section */}
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full bg-gray-700 border-4 border-amber-400 overflow-hidden flex items-center justify-center mb-4">
              {userData.profileImage ? (
                <img 
                  src={userData.profileImage} 
                  alt={userData.fullName} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="text-6xl text-amber-400">{userData.fullName.charAt(0)}</div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2 text-center">{userData.fullName}</h3>
            <p className="text-green-400 text-center mb-4">{userData.role} • {userData.currentPursuit}</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 w-full mt-3 mb-6">
              <div className="bg-gray-700 p-2 rounded-lg text-center">
                <p className="text-amber-400 text-2xl">{userData.projectsCount}</p>
                <p className="text-xs text-gray-300">Projects</p>
              </div>
              <div className="bg-gray-700 p-2 rounded-lg text-center">
                <p className="text-amber-400 text-2xl">{userData.completedCourses}</p>
                <p className="text-xs text-gray-300">Courses</p>
              </div>
              <div className="bg-gray-700 p-2 rounded-lg text-center">
                <p className="text-amber-400 text-2xl">{userData.connections}</p>
                <p className="text-xs text-gray-300">Connections</p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-2">
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-blue-400">
                <FaLinkedin />
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-pink-400">
                <FaInstagram />
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-blue-300">
                <FaTwitter />
              </button>
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-red-400">
                <FaYoutube />
              </button>
            </div>
            
            <button 
              onClick={handleEdit} 
              className="mt-6 bg-amber-500 text-black px-6 py-2 rounded-xl text-lg font-bold hover:bg-amber-600 transition-colors duration-300 flex items-center gap-2 w-full justify-center"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          {/* Middle + Right Column - Details Section */}
          <div className="md:w-3/4">
            {/* Tabs for different sections */}
            <div className="flex border-b border-gray-600 mb-6">
              <button 
                className={`px-6 py-2 font-bold text-lg transition-colors duration-300 ${activeTab === 'personal' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-gray-400'}`}
                onClick={() => handleTabChange('personal')}
              >
                Personal Info
              </button>
              <button 
                className={`px-6 py-2 font-bold text-lg transition-colors duration-300 ${activeTab === 'education' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400'}`}
                onClick={() => handleTabChange('education')}
              >
                Education
              </button>
              <button 
                className={`px-6 py-2 font-bold text-lg transition-colors duration-300 ${activeTab === 'skills' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
                onClick={() => handleTabChange('skills')}
              >
                Skills & Achievements
              </button>
            </div>

            {/* Tab Content Container with Transition */}
            <div className={`transition-opacity duration-300 ease-in-out ${tabContentVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-700 p-6 rounded-xl border ${getTabColor()}`}>
                  <div className="flex items-center gap-3">
                    <FaIdCard className="text-amber-400 text-xl" />
                    <div>
                      <p className="text-gray-400 text-sm">Full Name</p>
                      <p>{userData.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-amber-400 text-xl" />
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-amber-400 text-xl" />
                    <div>
                      <p className="text-gray-400 text-sm">Mobile</p>
                      <p>{userData.mobile}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-amber-400 text-xl" />
                    <div>
                      <p className="text-gray-400 text-sm">Age</p>
                      <p>{userData.age} years</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaVenusMars className="text-amber-400 text-xl" />
                    <div>
                      <p className="text-gray-400 text-sm">Gender</p>
                      <p>{userData.gender}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-amber-400 text-xl" />
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p>{userData.city}, {userData.state}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className={`bg-gray-700 p-6 rounded-xl border ${getTabColor()}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <FaUserGraduate className="text-green-400 text-xl" />
                      <div>
                        <p className="text-gray-400 text-sm">Current Pursuit</p>
                        <p>{userData.currentPursuit}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <FaUniversity className="text-green-400 text-xl" />
                      <div>
                        <p className="text-gray-400 text-sm">Institution</p>
                        <p>{userData.institution}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <FaIdCard className="text-green-400 text-xl" />
                      <div>
                        <p className="text-gray-400 text-sm">Role</p>
                        <p>{userData.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <FaBook className="text-green-400 text-xl" />
                      <div>
                        <p className="text-gray-400 text-sm">Completed Courses</p>
                        <p>{userData.completedCourses} courses</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Courses Section */}
                  <div className="mt-8">
                    <h3 className="text-xl text-green-400 mb-4">Recent Courses</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-center">
                          <p className="font-bold">Advanced Web Development</p>
                          <span className="text-green-400 text-sm">Completed</span>
                        </div>
                        <p className="text-sm text-gray-400">Online Learning Platform • 2024</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-center">
                          <p className="font-bold">Machine Learning Fundamentals</p>
                          <span className="text-amber-400 text-sm">In Progress</span>
                        </div>
                        <p className="text-sm text-gray-400">University Course • 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills & Achievements Tab */}
              {activeTab === 'skills' && (
                <div className={`bg-gray-700 p-6 rounded-xl border ${getTabColor()}`}>
                  {/* Skills Section */}
                  <div className="mb-8">
                    <h3 className="text-xl text-blue-400 mb-4">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-800 px-3 py-1 rounded-lg border border-blue-400 text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Interests Section */}
                  <div className="mb-8">
                    <h3 className="text-xl text-blue-400 mb-4">Areas of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.interests.map((interest, index) => (
                        <span key={index} className="bg-gray-800 px-3 py-1 rounded-lg border border-purple-400 text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Achievements Section */}
                  <div>
                    <h3 className="text-xl text-blue-400 mb-4">Achievements</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {userData.achievements.map((achievement, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-600 flex items-center gap-3">
                          <FaAward className="text-amber-400 text-xl" />
                          <div>
                            <p className="font-bold">{achievement.title}</p>
                            <p className="text-sm text-gray-400">{achievement.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Highlight */}
                  <div className="mt-8 bg-gray-800 p-4 rounded-lg border border-amber-400">
                    <h3 className="text-amber-400 font-bold mb-2">Project Highlights</h3>
                    <p className="text-sm mb-3">You have completed {userData.projectsCount} projects. Your most recent project was submitted 2 weeks ago.</p>
                    <button className="bg-amber-500 text-black px-4 py-1 rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors">
                      View All Projects
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;