import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { Home, Grid, LogIn, Award, User, LogOut, LayoutDashboard } from "lucide-react";
import { FcIdea } from "react-icons/fc";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // Simplified API call with proper error handling
  const getUserDetails = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/details/${id}`
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

  // Standardize image URL formatting
  const getImageUrl = (mediaPath) => {
    if (!mediaPath) return null;
    mediaPath = mediaPath.replace(/\\/g, "/");
    return `http://localhost:5000/${mediaPath}`;
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (token && userId) {
        setLoading(true);
        try {
          const data = await getUserDetails(userId);
          if (data) {
            setUserData(data);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [token, userId]);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setUserData(null);
    navigate("/login");
  };

  // Get profile options based on user role
  const getProfileOptions = () => {
    switch (role) {
      case "Student":
        return [
          {
            name: "My Dashboard",
            path: `/student/${userId}`,
            icon: LayoutDashboard,
          },
          { name: "Profile", path: `/userdetails/${userId}`, icon: User },
          { name: "Logout", action: handleLogout, icon: LogOut },
        ];
      case "Faculty":
        return [
          {
            name: "My Dashboard",
            path: `/faculty/${userId}`,
            icon: LayoutDashboard,
          },
          { name: "Profile", path: `/userdetails/${userId}`, icon: User },
          { name: "Logout", action: handleLogout, icon: LogOut },
        ];
      case "Admin":
        return [
          {
            name: "My Dashboard",
            path: `/admin`,
            icon: LayoutDashboard,
          },
          { name: "Profile", path: `/userdetails/${userId}`, icon: User },
          { name: "Logout", action: handleLogout, icon: LogOut },
        ];
      default:
        return [
          { name: "Profile", path: `/userdetails/${userId}`, icon: User },
          { name: "Logout", action: handleLogout, icon: LogOut },
        ];
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Website Name - Left Side */}
        <div className="flex items-center space-x-3 group">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 15,
                mass: 0.5,
              },
            }}
            whileHover={{
              scale: 1.1,
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
            className="p-2 bg-white rounded-xl shadow-lg shadow-amber-400/20 group-hover:shadow-amber-400/30 transition-all duration-300 backdrop-blur-sm bg-white/30"
          >
            <motion.div
              animate={{
                scale: [1.3, 1.1, 1],
                transition: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.7,
                  delay: 0.5,
                },
              }}
            >
              <FcIdea className="text-3xl" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.3,
                type: "spring",
                stiffness: 300,
              },
            }}
            className="text-3xl font-delius font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-transparent bg-clip-text tracking-tighter"
          >
            <Link to={"/"}>BrightBuilds</Link>
          </motion.h1>
        </div>
        
        {/* Navigation Links - Center */}
        <div className="flex items-center space-x-8">
          {[
            { name: "Home", path: "/", icon: Home },
            { name: "Projects", path: "/projects", icon: Grid },
            { name: "Leaderboards", path: "/leaderboards", icon: Award },
          ].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                relative group flex items-center space-x-2 
                text-gray-300 hover:text-white 
                transition-all duration-300 
                ${isActive ? "text-white" : ""}
              `}
            >
              {({ isActive }) => (
                <>
                  <link.icon size={20} />
                  <span className="font-medium">{link.name}</span>

                  {/* Glowing Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  )}

                  {/* Hover Glow Effect */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 
                    rounded-lg opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 -z-10"
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Login Button or User Profile - Right Side */}
        {!token ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="
              flex items-center space-x-2 
              bg-gradient-to-r from-blue-600 to-purple-600 
              text-white px-4 py-2 rounded-full 
              hover:from-blue-700 hover:to-purple-700 
              transition-all duration-300 
              shadow-lg hover:shadow-xl
              group
            "
          >
            <LogIn
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            <span>Login</span>
          </motion.button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer flex items-center space-x-2"
            >
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                {isLoading ? (
                  <div className="h-full w-full bg-gray-700 flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                ) : userData && userData.profilePicture ? (
                  <img
                    src={getImageUrl(userData.profilePicture)}
                    alt="User Profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = ""; // Set to empty to show fallback div
                      e.target.style.display = "none";
                      e.target.parentNode.querySelector("div").style.display = "flex";
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                )}
              </div>
              <span className="text-white text-sm hidden md:block">
                {userData?.name?.split(" ")[0] || ""}
              </span>
            </motion.div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl overflow-hidden z-50"
              >
                {userData && (
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm text-white font-medium truncate">
                      {userData.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{role || "User"}</p>
                  </div>
                )}
                <div className="py-1">
                  {getProfileOptions().map((option, index) => (
                    <div key={index}>
                      {option.path ? (
                        <Link
                          to={option.path}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <option.icon size={16} />
                          <span>{option.name}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            option.action();
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 w-full text-left"
                        >
                          <option.icon size={16} />
                          <span>{option.name}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;