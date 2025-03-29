import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaLeaf, FaWater, FaHeartbeat, FaBook, FaLightbulb } from "react-icons/fa";

export default function SDGImpact() {
  const sdgs = [
    { icon: <FaGlobe />, title: "Climate Action", desc: "Projects tackling climate change and promoting sustainability." },
    { icon: <FaLeaf />, title: "Life on Land", desc: "Innovations focused on biodiversity conservation and afforestation." },
    { icon: <FaWater />, title: "Clean Water", desc: "Solutions for water conservation and pollution control." },
    { icon: <FaHeartbeat />, title: "Good Health", desc: "Health-tech projects improving well-being and healthcare access." },
    { icon: <FaBook />, title: "Quality Education", desc: "Tech-driven learning solutions for better education." },
    { icon: <FaLightbulb />, title: "Innovation & Infrastructure", desc: "Cutting-edge innovations for a smarter future." },
  ];

  return (
    <motion.section
    initial={{ opacity: 0, y: 50 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }} 
    transition={{ duration: 1.0, ease: "easeOut"  }} 
    className="relative z-10 py-20 bg-green-400 bg-opacity-55" // Light Aqua Blue for SDG theme
  >
    <div className="container mx-auto px-6 text-center">
      {/* 🔹 Section Title */}
      <h2 className="text-4xl font-bold text-black font-lilita mb-12">SDG Impact</h2>
  
      {/* 🔹 SDG Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {sdgs.map((sdg, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }} 
            className="bg-white p-6 rounded-xl font-smooch shadow-lg border border-gray-200 transition-transform duration-300"
          >
            <div className="text-5xl text-blue-600 mb-4 flex justify-center">
              {sdg.icon}
            </div>
            <h3 className="text-xl font-bold text-black mb-3">{sdg.title}</h3>
            <p className="text-black text-lg">{sdg.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
  );
}
