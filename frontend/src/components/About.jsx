import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Building, ExternalLink } from "lucide-react";
import aboutImage from "./collaborate.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-fit p-8 rounded-lg py-20"
      id="about"
    >
      <div className="relative z-10">
        {/* Section Title */}
        <motion.h1
          className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🌍 About the Platform
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-300 max-w-3xl text-center mx-auto mb-16"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Connecting students, faculty, and industry experts to innovate,
          collaborate, and create immersive projects that address Sustainable
          Development Goals.
        </motion.p>

        {/* Card Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Student Card */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 300 },
              },
            }}
            whileHover={{ scale: 1.05 }}
            className="relative group perspective-1000 cursor-pointer" // Added cursor-pointer here
          >
            <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-800/10 opacity-50 z-0 pointer-events-none"></div>

              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-400 p-4 text-white">
                <GraduationCap size={24} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 text-center">
                For Students
              </h3>

              <p className="text-sm text-gray-300 mb-6 text-center">
                Explore and showcase creative projects, collaborate with peers,
                and gain industry recognition for your innovations.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signup");
                }}
                className="relative z-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center cursor-pointer"
              >
                Join as Student
                <ExternalLink size={16} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>

          {/* Faculty Card */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 300 },
              },
            }}
            whileHover={{ scale: 1.05 }}
            className="relative group perspective-1000 cursor-pointer" 
          >
            <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center p-6">
              {/* Added pointer-events-none to the overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-800/10 opacity-50 z-0 pointer-events-none"></div>

              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-green-600 to-green-400 p-4 text-white">
                <BookOpen size={24} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 text-center">
                For Faculty
              </h3>

              <p className="text-sm text-gray-300 mb-6 text-center">
                Mentor students, evaluate projects, and integrate real-world
                challenges into the curriculum for immersive learning.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signup");
                }}
                className="relative z-10 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center cursor-pointer"
              >
                Join as Faculty
                <ExternalLink size={16} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>

          {/* Industry Card */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 300 },
              },
            }}
            whileHover={{ scale: 1.05 }}
            className="relative group perspective-1000 cursor-pointer" 
          >
            <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center p-6">
              {/* Added pointer-events-none to the overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-amber-800/10 opacity-50 z-0 pointer-events-none"></div>

              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-400 p-4 text-white">
                <Building size={24} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 text-center">
                For Industry
              </h3>

              <p className="text-sm text-gray-300 mb-6 text-center">
                Discover innovative game projects, offer guidance, and recruit
                top game development talent directly from the platform.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signup"); 
                }}
                className="relative z-10 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center cursor-pointer"
              >
                Join as Partner
                <ExternalLink size={16} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Glowing Animation Effects */}
        <div className="relative w-full max-w-5xl mx-auto mt-20">
          <motion.div
            className="absolute -top-8 -left-8 w-16 h-16 bg-blue-600 opacity-30 blur-2xl rounded-full"
            animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute -top-10 -right-10 w-20 h-20 bg-purple-600 opacity-30 blur-2xl rounded-full"
            animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>

          {/* Main Image/Illustration Container */}
          <motion.div
            className="w-full group relative p-4 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              type: "spring",
              stiffness: 120,
            }}
          >
            {/* Neuromorphic Shadow Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl shadow-lg border border-white/10 backdrop-blur-sm"></div>

            {/* Image Placeholder */}
            <div className="w-full h-3/5 relative z-10 rounded-2xl  flex items-center justify-center overflow-hidden border border-white/10">
              <img
                src={aboutImage}
                alt="Game Innovation Collaboration"
                className="w-full h-full object-cover opacity-70"
              />

              <div className="absolute inset-0 cursor-pointer"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Collaborate & Innovate
                </h3>
                <p className="text-sm text-gray-300">
                  Building the future of gaming with sustainable development in
                  mind
                </p>
              </div>
            </div>

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/20
            rounded-2xl 
            transition-all duration-300 
            flex items-center justify-center"
            >
              <Link to={"/projects"}>
                <span
                  className="opacity-0 group-hover:opacity-100 
                text-white 
                bg-black/70 
                px-4 py-2 
                rounded-lg 
                font-lilita
                text-2xl
                transition-opacity duration-300 cursor-pointer"
                >
                  Explore Collaboration
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
