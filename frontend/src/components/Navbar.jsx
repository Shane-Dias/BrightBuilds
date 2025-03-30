import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { Home, Grid, LogIn, Award } from "lucide-react";
import { FcIdea } from "react-icons/fc";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("home");

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
            className="text-3xl font-delius font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 text-transparent bg-clip-text  tracking-tighter"
          >
            <Link to={"/"}>BrightBuilds</Link>
            {/* <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="inline-block ml-2 text-xs font-semibold bg-amber-100/80 text-amber-800 px-2 py-1 rounded-full"
    >
      STUDENT HUB
    </motion.span> */}
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

        {/* Login Button - Right Side */}
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
      </div>
    </nav>
  );
};

export default Navbar;
