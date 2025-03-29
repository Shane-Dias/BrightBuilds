import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Linkedin, Twitter, Mail, Copyright } from "lucide-react";
import { FcIdea } from "react-icons/fc";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/yourorganization",
      color: "hover:text-blue-500",
      bg: "hover:bg-blue-500/10",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/yourorganization",
      color: "hover:text-blue-400",
      bg: "hover:bg-blue-400/10",
    },
    {
      icon: Mail,
      href: "mailto:contact@globalimpact.org",
      color: "hover:text-red-500",
      bg: "hover:bg-red-500/10",
    },
  ];

  return (
    <footer className="bg-gray-900/90 backdrop-blur-lg shadow-2xl border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Tagline */}
          <div className="space-y-4">
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
                      repeat: 0,
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
                BrightBuilds
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-400 text-sm leading-relaxed max-w-md"
            >
              Driving positive change through innovative solutions and global
              collaboration. Join us in making a difference worldwide.
            </motion.p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center md:justify-end">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-700/50 w-max">
                Quick Links
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Projects", path: "/projects" },
                  { name: "Leaderboards", path: "/leaderboards" },
                  { name: "Login", path: "/login" },
                ].map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <button
                      onClick={() => navigate(link.path)}
                      className="
                        text-gray-400 hover:text-white 
                        flex items-center space-x-2
                        transition-all duration-300
                        group-hover:font-medium
                      "
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500">
                        {link.name}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-700/50">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, color, bg }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    text-gray-400 ${color} ${bg}
                    transition-all duration-300
                    p-3 rounded-xl
                    border border-gray-700/50
                    shadow-sm
                  `}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6"
            >
              <p className="text-gray-500 text-sm mb-2">Newsletter Signup</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white placeholder-gray-500 w-full"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-r-lg text-white font-medium hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-800/50 text-center"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} GlobalImpact. All Rights Reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
