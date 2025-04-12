import React from "react";
import { motion } from "framer-motion";
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
      color: "from-blue-600 to-green-600",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Life on Land",
      desc: "Innovations focused on biodiversity conservation and afforestation.",
      color: "from-green-600 to-emerald-500",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Clean Water",
      desc: "Solutions for water conservation and pollution control.",
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Good Health",
      desc: "Health-tech projects improving well-being and healthcare access.",
      color: "from-red-600 to-pink-600",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Quality Education",
      desc: "Tech-driven learning solutions for better education.",
      color: "from-amber-500 to-yellow-400",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation & Infrastructure",
      desc: "Cutting-edge innovations for a smarter future.",
      color: "from-purple-600 to-indigo-600",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-fit p-8 rounded-lg"
    >
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <motion.h1
          className="text-7xl font-bold font-smooch text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Sustainable Development Goals
        </motion.h1>

        <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
          Projects at the Innovation Hub are aligned with UN Sustainable
          Development Goals, creating impact through interactive experiences
          that address real-world challenges.
        </p>

        {/* SDG Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
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
              <div className="relative bg-gray-800/60 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 group-hover:scale-[1.03] group-hover:rotate-1 origin-center p-6">
                <div className="absolute inset-0 bg-gradient-to-br opacity-10 z-0"></div>

                <div
                  className={`text-4xl mb-4 w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r ${sdg.color} p-4 text-white`}
                >
                  {sdg.icon}
                </div>

                <div className="absolute top-0 right-0 p-2">
                  <Trophy size={16} className="text-yellow-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {sdg.title}
                </h3>

                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {sdg.desc}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-4 w-full bg-gradient-to-r ${sdg.color} text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium`}
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
