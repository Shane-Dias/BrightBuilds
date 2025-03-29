import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

const Leaderboards = () => {
  const [activeTab, setActiveTab] = useState("thisWeek");

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles container loaded", container);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-black min-h-screen overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "pull",
              },
              onHover: {
                enable: true,
                mode: "attract",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: false,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "bottom",
              enable: true,
              outModes: {
                default: "out",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "polygon",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-center mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Project Leaderboards
        </motion.h1>

        {/* Competitive Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-full p-1 flex space-x-1 shadow-lg">
            <motion.button
              onClick={() => setActiveTab("thisWeek")}
              className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                activeTab === "thisWeek"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {activeTab === "thisWeek" && (
                <motion.span
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-medium">This Week</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("overall")}
              className={`px-6 py-3 rounded-full transition-all duration-300 relative ${
                activeTab === "overall"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {activeTab === "overall" && (
                <motion.span
                  layoutId="tabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-medium">Overall</span>
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "thisWeek" && <Top5ThisWeek key="thisWeek" />}
          {activeTab === "overall" && <Top10Overall key="overall" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, rank }) => {
  const navigate = useNavigate();

  const categoryColors = {
    game: "from-blue-500 to-indigo-600",
    website: "from-green-500 to-teal-600",
    video: "from-purple-500 to-pink-600",
    documentary: "from-yellow-500 to-orange-600",
    digitalart: "from-red-500 to-pink-600",
  };

  const sdgInfo = {
    1: { name: "No Poverty", color: "bg-red-500" },
    2: { name: "Zero Hunger", color: "bg-orange-500" },
    3: { name: "Good Health", color: "bg-green-500" },
    4: { name: "Quality Education", color: "bg-blue-500" },
    5: { name: "Gender Equality", color: "bg-yellow-500" },
    6: { name: "Clean Water", color: "bg-teal-500" },
    7: { name: "Clean Energy", color: "bg-indigo-500" },
    8: { name: "Economic Growth", color: "bg-purple-500" },
    9: { name: "Innovation", color: "bg-pink-500" },
    10: { name: "Reduced Inequalities", color: "bg-gray-500" },
    11: { name: "Sustainable Cities", color: "bg-lime-500" },
    12: { name: "Responsible Consumption", color: "bg-emerald-500" },
    13: { name: "Climate Action", color: "bg-cyan-500" },
    14: { name: "Life Below Water", color: "bg-sky-500" },
    15: { name: "Life on Land", color: "bg-fuchsia-500" },
    16: { name: "Peace & Justice", color: "bg-violet-500" },
    17: { name: "Partnerships", color: "bg-rose-500" },
  };

  return (
    <motion.div
      className="relative bg-gray-800 bg-opacity-80 rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-2xl border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Rank Badge with Gradient */}
      <div
        className={`absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br ${
          categoryColors[project.category]
        } flex items-center justify-center text-2xl font-bold text-white shadow-lg z-10`}
      >
        {rank}
      </div>

      {/* Project Image */}
      <div className="flex-shrink-0 w-full md:w-48 h-48 rounded-xl overflow-hidden shadow-lg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <span
            className={`bg-gradient-to-r ${
              categoryColors[project.category]
            } text-white text-xs px-3 py-1 rounded-full`}
          >
            {project.category.charAt(0).toUpperCase() +
              project.category.slice(1)}
          </span>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(project.rating)
                      ? "text-yellow-400 fill-current"
                      : project.rating % 1 > 0 &&
                        i === Math.floor(project.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-400 fill-current"
                  }`}
                  viewBox="0 0 20 20"
                >
                  {i < Math.floor(project.rating) ? (
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  ) : (
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  )}
                </svg>
              ))}
            </div>
            <span className="text-xl font-bold text-yellow-400">
              {project.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 items-center">
          <motion.button
            onClick={() => navigate(`/details/${project.id}`)}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full hover:from-red-600 hover:to-yellow-600 transition-all shadow-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            View Details
          </motion.button>

          <div className="text-sm text-gray-400">
            <span className="font-medium text-white">SDG {project.sdg}:</span>{" "}
            {sdgInfo[project.sdg].name}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Top5ThisWeek = () => {
  const top5ThisWeek = [
    {
      id: 1,
      title: "Epic Adventure Game",
      category: "game",
      rating: 4.9,
      description:
        "An immersive RPG with stunning graphics and engaging storyline that has taken the gaming community by storm this week. Players explore vast open worlds and make meaningful choices that affect the game's outcome.",
      image: "https://source.unsplash.com/random/400x300/?game",
      sdg: 4,
    },
    {
      id: 2,
      title: "E-commerce Platform",
      category: "website",
      rating: 4.8,
      description:
        "Revolutionary online shopping experience with AI-powered recommendations and seamless checkout process. Supports small businesses with zero-commission marketplace options.",
      image: "https://source.unsplash.com/random/400x300/?ecommerce",
      sdg: 8,
    },
    {
      id: 3,
      title: "Short Film: The Last Day",
      category: "video",
      rating: 4.7,
      description:
        "A thought-provoking short film about humanity's final hours before a global catastrophe. Powerful performances and stunning cinematography make this a must-watch.",
      image: "https://source.unsplash.com/random/400x300/?film",
      sdg: 13,
    },
    {
      id: 4,
      title: "Climate Change Documentary",
      category: "documentary",
      rating: 4.6,
      description:
        "Eye-opening documentary showcasing the real impacts of climate change across different continents. Features interviews with leading scientists and activists.",
      image: "https://source.unsplash.com/random/400x300/?nature",
      sdg: 13,
    },
    {
      id: 5,
      title: "Digital Art Collection",
      category: "digitalart",
      rating: 4.5,
      description:
        "Stunning collection of digital artworks exploring the intersection of technology and human emotion. Each piece is generated using custom AI algorithms trained by the artist.",
      image: "https://source.unsplash.com/random/400x300/?art",
      sdg: 9,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="space-y-8">
        {top5ThisWeek.map((project, index) => (
          <ProjectCard key={project.id} project={project} rank={index + 1} />
        ))}
      </div>
    </motion.section>
  );
};

const Top10Overall = () => {
  const top10Overall = [
    {
      id: 6,
      title: "Virtual Reality Experience",
      category: "game",
      rating: 5.0,
      description:
        "Groundbreaking VR experience that has redefined immersive gaming with its innovative controls and stunning environments. Compatible with all major VR platforms.",
      image: "https://source.unsplash.com/random/400x300/?vr",
      sdg: 4,
    },
    {
      id: 7,
      title: "Social Network Platform",
      category: "website",
      rating: 4.95,
      description:
        "The most popular social network that connects millions worldwide with its intuitive interface and powerful features. Focused on meaningful connections.",
      image: "https://source.unsplash.com/random/400x300/?social",
      sdg: 10,
    },
    {
      id: 8,
      title: "Animated Series",
      category: "video",
      rating: 4.9,
      description:
        "Critically acclaimed animated series praised for its storytelling, animation quality, and character development. Three seasons available with more coming soon.",
      image: "https://source.unsplash.com/random/400x300/?animation",
      sdg: 5,
    },
    {
      id: 9,
      title: "Space Exploration Documentary",
      category: "documentary",
      rating: 4.85,
      description:
        "Comprehensive look at humanity's journey through space exploration with never-before-seen footage. Narrated by a renowned astrophysicist.",
      image: "https://source.unsplash.com/random/400x300/?space",
      sdg: 9,
    },
    {
      id: 10,
      title: "Generative AI Art",
      category: "digitalart",
      rating: 4.8,
      description:
        "Pioneering collection of AI-generated art that challenges traditional notions of creativity and authorship. Each piece is unique and algorithmically generated.",
      image: "https://source.unsplash.com/random/400x300/?ai",
      sdg: 9,
    },
    {
      id: 11,
      title: "Strategy Game",
      category: "game",
      rating: 4.75,
      description:
        "Complex strategy game that has maintained a loyal following for years due to its depth and balance. Regular updates keep the gameplay fresh.",
      image: "https://source.unsplash.com/random/400x300/?strategy",
      sdg: 16,
    },
    {
      id: 12,
      title: "News Aggregator",
      category: "website",
      rating: 4.7,
      description:
        "Award-winning news platform that uses machine learning to curate personalized news feeds for users. Focused on reducing misinformation.",
      image: "https://source.unsplash.com/random/400x300/?news",
      sdg: 10,
    },
    {
      id: 13,
      title: "Music Video",
      category: "video",
      rating: 4.65,
      description:
        "Visually stunning music video that went viral for its innovative cinematography and storytelling. Over 500 million views worldwide.",
      image: "https://source.unsplash.com/random/400x300/?music",
      sdg: 5,
    },
    {
      id: 14,
      title: "Wildlife Documentary",
      category: "documentary",
      rating: 4.6,
      description:
        "Breathtaking documentary series capturing rare wildlife behavior in remote locations around the world. Filmed over 5 years on 6 continents.",
      image: "https://source.unsplash.com/random/400x300/?wildlife",
      sdg: 15,
    },
    {
      id: 15,
      title: "3D Sculpture Series",
      category: "digitalart",
      rating: 4.55,
      description:
        "Collection of digital 3D sculptures that blend organic forms with futuristic elements in surprising ways. Available as NFTs and physical prints.",
      image: "https://source.unsplash.com/random/400x300/?sculpture",
      sdg: 9,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {top10Overall.map((project, index) => (
          <ProjectCard key={project.id} project={project} rank={index + 1} />
        ))}
      </div>
    </motion.section>
  );
};

export default Leaderboards;
