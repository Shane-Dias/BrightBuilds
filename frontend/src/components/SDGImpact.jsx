import React from "react";
import { motion } from "../motionless";
import {
  Trophy,
  Globe,
  Leaf,
  Droplets,
  Heart,
  BookOpen,
  Lightbulb,
} from "lucide-react";

export default function SDGImpact() {
  const sdgs = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Climate Action",
      desc: "Projects tackling climate change and promoting sustainability.",
      color: "var(--accent-primary)",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Life on Land",
      desc: "Innovations focused on biodiversity conservation and afforestation.",
      color: "var(--accent-light)",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Clean Water",
      desc: "Solutions for water conservation and pollution control.",
      color: "var(--accent-hover)",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Good Health",
      desc: "Health-tech projects improving well-being and healthcare access.",
      color: "#EF5350",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Quality Education",
      desc: "Tech-driven learning solutions for better education.",
      color: "var(--amber-primary)",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation & Infrastructure",
      desc: "Cutting-edge innovations for a smarter future.",
      color: "var(--accent-glow)",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 py-12 sm:py-16 md:py-20 min-h-fit px-4 sm:px-6 md:p-8 rounded-lg"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        {/* Section Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center mb-4 sm:mb-6"
          style={{ color: 'var(--accent-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Sustainable Impact
        </motion.h1>

        <p className="text-base sm:text-lg mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4" style={{ color: 'var(--text-secondary)' }}>
          Projects aligned with UN SDGs, creating real-world impact through innovation and collaboration.
        </p>

        {/* SDG Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
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
          {sdgs.map((sdg, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 300 },
                },
              }}
              whileHover={{ scale: 1.05 }}
              className="relative group perspective-1000"
            >
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] p-5 sm:p-6">
                <div className="absolute inset-0 opacity-5 z-0" style={{ backgroundColor: sdg.color }}></div>

                <div
                  className="text-3xl sm:text-4xl mb-3 sm:mb-4 w-14 h-14 sm:w-16 sm:h-16 mx-auto flex items-center justify-center rounded-full p-3 sm:p-4 text-white"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.icon}
                </div>

                <div className="absolute top-0 right-0 p-2">
                  <Trophy className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: 'var(--amber-primary)' }} />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                  {sdg.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 line-clamp-2">
                  {sdg.desc}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full text-white py-2 px-4 rounded-lg transition-all text-sm font-medium"
                  style={{ backgroundColor: sdg.color }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  View Projects
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

