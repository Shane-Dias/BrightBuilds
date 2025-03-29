import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaIndustry,
} from "react-icons/fa";
import aboutImage from "./collaborate.svg";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-20 bg-[#121827] flex flex-col items-center"
    >
      {/* 🔹 Heading with Animation */}
      <motion.h2
        className="text-5xl font-lilita font-bold text-white mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        About the Platform
      </motion.h2>

      {/* 🔹 Description */}
      <motion.p
        className="text-lg text-gray-300 max-w-3xl text-center mb-12"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Connecting students, faculty, and industry experts to innovate,
        collaborate, and create a better future through technology.
      </motion.p>

      {/* 🔹 Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl font-smooch text-lg font-bold">
        {/* 🟢 Student Interaction Card */}
        <motion.div
          className="bg-[#1E293B]/70 backdrop-blur-md shadow-lg p-6 rounded-2xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-800 hover:shadow-[#3B82F6]/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FaUserGraduate className="text-6xl text-[#3B82F6] mb-4" />
          <h3 className="text-xl font-semibold text-white">For Students</h3>
          <p className="text-gray-400 mt-2">
            Explore and showcase creative coding projects, collaborate with
            peers, and gain industry recognition.
          </p>
        </motion.div>

        {/* 🔹 Faculty Interaction Card */}
        <motion.div
          className="bg-[#1E293B]/70 backdrop-blur-md shadow-lg p-6 rounded-2xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-800 hover:shadow-[#10B981]/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FaChalkboardTeacher className="text-6xl text-[#10B981] mb-4" />
          <h3 className="text-xl font-semibold text-white">For Faculty</h3>
          <p className="text-gray-400 mt-2">
            Mentor students, evaluate projects, and integrate real-world
            challenges into the curriculum.
          </p>
        </motion.div>

        {/* 🏭 Industry Interaction Card */}
        <motion.div
          className="bg-[#1E293B]/70 backdrop-blur-md shadow-lg p-6 rounded-2xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-800 hover:shadow-[#F59E0B]/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <FaIndustry className="text-6xl text-[#F59E0B] mb-4" />
          <h3 className="text-xl font-semibold text-white">For Industry</h3>
          <p className="text-gray-400 mt-2">
            Discover innovative projects, offer guidance, and recruit top tech
            talent directly from the platform.
          </p>
        </motion.div>
      </div>

      {/* 🔹 Floating Animation around SVG */}
      <div className="relative w-full max-w-5xl mt-20">
        <motion.div
          className="absolute -top-8 -left-8 w-16 h-16 bg-[#3B82F6] opacity-30 blur-2xl rounded-full"
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute -top-10 -right-10 w-20 h-20 bg-[#10B981] opacity-30 blur-2xl rounded-full"
          animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* 🔹 Illustration */}
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
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)] 
            group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] 
            transition-shadow duration-300 
            border border-gray-700/30 
            backdrop-blur-sm"
          ></div>

          {/* Image with Refined Styling */}
          <img
            src={aboutImage}
            alt="Collaboration Illustration"
            className="w-full relative z-10 rounded-2xl 
              transition-transform duration-300 
              group-hover:scale-[1.02] 
              group-hover:rotate-1 
              shadow-lg 
              border-4 border-gray-700/30"
          />

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 z-20 bg-black/0 group-hover:bg-black/40 
            rounded-2xl 
            transition-all duration-300 
            flex items-center justify-center"
          >
            <span
              className="opacity-0 group-hover:opacity-100 
              text-white 
              bg-black/70 
              px-4 py-2 
              rounded-lg 
              font-lilita
              text-2xl
              transition-opacity duration-300"
            >
              Explore Collaboration
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
