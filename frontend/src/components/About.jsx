import React from "react";
import { motion } from "../motionless";
import { GraduationCap, BookOpen, Building, ExternalLink, Sparkles, Target, Users } from "lucide-react";
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
      className="relative min-h-fit px-4 sm:px-6 md:p-8 py-12 sm:py-16 md:py-20 rounded-lg"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      id="about"
    >
      <div className="relative z-10">
        {/* Section Title with gradient */}
        <motion.div className="text-center mb-4">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-light) 50%, var(--amber-primary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empowering Innovation
          </motion.h1>
          <motion.div 
            className="flex items-center justify-center gap-2 text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px w-8 sm:w-12" style={{ backgroundColor: 'var(--accent-primary)' }} />
            <Sparkles className="w-4 h-4" style={{ color: 'var(--amber-primary)' }} />
            <div className="h-px w-8 sm:w-12" style={{ backgroundColor: 'var(--accent-primary)' }} />
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg md:text-xl font-light text-center mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4"
          style={{ color: 'var(--text-secondary)', maxWidth: '42rem' }}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A collaborative ecosystem connecting
          <span style={{ color: 'var(--accent-light)', fontWeight: '600' }}> students</span>,
          <span style={{ color: 'var(--amber-primary)', fontWeight: '600' }}> faculty</span>, and
          <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}> industry leaders</span> to build
          innovative projects that drive real-world impact and sustainability.
        </motion.p>

        {/* Stats Bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center min-w-[100px]">
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--accent-light)' }}>
              <Target size={24} className="inline mb-1 sm:w-7 sm:h-7" /> 17
            </div>
            <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>SDG Goals Tracked</div>
          </div>
          <div className="text-center min-w-[100px]">
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--amber-primary)' }}>
              <Users size={24} className="inline mb-1 sm:w-7 sm:h-7" /> 100+
            </div>
            <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>Active Contributors</div>
          </div>
          <div className="text-center min-w-[100px]">
            <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--accent-primary)' }}>
              <Sparkles size={24} className="inline mb-1 sm:w-7 sm:h-7" /> 50+
            </div>
            <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>Projects Showcased</div>
          </div>
        </motion.div>

        {/* Card Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4"
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
            className="relative group perspective-1000 cursor-pointer"
          >
            <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover: p-5 sm:p-6" style={{ boxShadow: '0 0 0 rgba(47, 167, 111, 0)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 35px rgba(47, 167, 111, 1)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 rgba(47, 167, 111, 0)'}>
              <div className="absolute inset-0 opacity-50 z-0 pointer-events-none group-hover:opacity-70 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom right, rgba(47, 167, 111, 0.1), rgba(47, 167, 111, 0.15))' }}></div>

              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center rounded-full p-3 sm:p-4 text-white" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-hover))' }}>
                <GraduationCap className="w-6 h-6 sm:w-6 sm:h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">
                For Students
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 text-center">
                Showcase your creativity, build your portfolio, collaborate with talented peers,
                and gain recognition from industry leaders.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signup");
                }}
                className="relative z-10 w-full text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: 'var(--accent-primary)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary)'}
              >
                Join as Student
                <ExternalLink className="ml-2 w-4 h-4" />
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
            className="relative group perspective-1000 cursor-pointer"
          >
            <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover: p-5 sm:p-6" style={{ boxShadow: '0 0 0 rgba(230, 184, 135, 0)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 35px rgba(230, 184, 135, 1)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 rgba(230, 184, 135, 0)'}>
              <div className="absolute inset-0 opacity-50 z-0 pointer-events-none group-hover:opacity-70 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom right, rgba(230, 184, 135, 0.1), rgba(212, 165, 116, 0.15))' }}></div>

              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center rounded-full p-3 sm:p-4 text-white" style={{ background: 'linear-gradient(to right, var(--amber-primary), var(--amber-hover))' }}>
                <BookOpen className="w-6 h-6 sm:w-6 sm:h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">
                For Faculty
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 text-center">
                Guide the next generation, evaluate innovative work,
                and bridge academic learning with real-world challenges.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signup");
                }}
                className="relative z-10 w-full text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: 'var(--amber-primary)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--amber-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--amber-primary)'}
              >
                Join as Faculty
                <ExternalLink className="ml-2 w-4 h-4" />
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
            className="relative group perspective-1000 cursor-pointer"
          >
            <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover: p-5 sm:p-6" style={{ boxShadow: '0 0 0 rgba(93, 211, 167, 0)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 40px rgba(93, 211, 167, 1)'} onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 rgba(93, 211, 167, 0)'}>
              <div className="absolute inset-0 opacity-50 z-0 pointer-events-none group-hover:opacity-70 transition-opacity duration-300" style={{ background: 'linear-gradient(to bottom right, rgba(93, 211, 167, 0.1), rgba(122, 219, 180, 0.15))' }}></div>

              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center rounded-full p-3 sm:p-4 text-white" style={{ background: 'linear-gradient(to right, var(--accent-light), var(--accent-glow))' }}>
                <Building className="w-6 h-6 sm:w-6 sm:h-6" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-center">
                For Industry
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6 text-center">
                Discover innovative solutions, connect with emerging talent,
                and contribute to projects that shape the future.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/signup");
                }}
                className="relative z-10 w-full text-white py-2 px-4 rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: 'var(--accent-light)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-light)'}
              >
                Join as Partner
                <ExternalLink className="ml-2 w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Glowing Animation Effects - Themed */}
        <div className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16 md:mt-20 px-4">
          <motion.div
            className="absolute -top-8 -left-8 w-24 h-24 opacity-20 blur-3xl rounded-full"
            style={{ backgroundColor: 'var(--accent-light)' }}
            animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute -top-10 -right-10 w-28 h-28 opacity-20 blur-3xl rounded-full"
            style={{ backgroundColor: 'var(--amber-primary)' }}
            animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute bottom-8 left-1/2 w-20 h-20 opacity-15 blur-3xl rounded-full"
            style={{ backgroundColor: 'var(--accent-primary)' }}
            animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>

          {/* Main Image/Illustration Container */}
          <motion.div
            className="w-full group relative p-2 sm:p-4 transition-all duration-300"
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

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center" style={{
                background: 'linear-gradient(to top, rgba(8, 9, 9, 0.95), transparent)'
              }}>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2" style={{
                  background: 'linear-gradient(135deg, var(--accent-light), var(--amber-primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Build the Future Together
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Collaborative innovation for sustainable impact
                </p>
              </div>
            </div>

            {/* Hover Overlay */}
            <div
              className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/30
            rounded-2xl 
            transition-all duration-300 
            flex items-center justify-center"
            >
              <Link to={"/projects"}>
                <motion.span
                  className="opacity-0 group-hover:opacity-100 
                text-white 
                px-4 sm:px-6 py-2 sm:py-3 
                rounded-full 
                font-semibold
                text-base sm:text-lg md:text-xl
                transition-all duration-300 cursor-pointer flex items-center gap-2"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(93, 211, 167, 0.5)' }}
                >
                  Explore Projects
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

