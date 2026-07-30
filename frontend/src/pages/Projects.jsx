import React, { useState, useEffect } from "react";
import { motion } from "../motionless";
import { Filter, Target, Gamepad2, Globe, Video, Film, Palette } from "lucide-react";
import Games from "../components/Games";
import Websites from "../components/Websites";
import Videos from "../components/Videos";
import Documentaries from "../components/Documentaries";
import DigitalArt from "../components/DigitalArt";
import axios from "axios";
import AutoScrollToTop from "../components/AutoScrollToTop";
import { ShootingStars } from "../components/shooting-stars";
import { StarsBackground } from "../components/stars-background";

const ExploreProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects`);

        // Ensure projects are correctly extracted
        setProjects(
          Array.isArray(response.data.data) ? response.data.data : []
        );

        console.log("Fetched Projects:", response.data.data); // Debugging log
      } catch (err) {
        setError(err);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Define filter options
  const filters = [
    { label: "All Projects", value: "all", Icon: Target },
    { label: "Games", value: "Game", Icon: Gamepad2 },
    { label: "Websites", value: "Website", Icon: Globe },
    { label: "Videos", value: "Video", Icon: Video },
    { label: "Documentaries", value: "Documentary", Icon: Film },
    { label: "Digital Art", value: "Digital Art", Icon: Palette },
  ];

  // Group projects by category
  const projectsByCategory = {
    Game: projects.filter((project) => project.category === "Game"),
    Website: projects.filter((project) => project.category === "Website"),
    Video: projects.filter((project) => project.category === "Video"),
    Documentary: projects.filter(
      (project) => project.category === "Documentary"
    ),
    DigitalArt: projects.filter(
      (project) => project.category === "Digital Art"
    ),
  };

  const handleFilterChange = (e) => {
    setActiveFilter(e.target.value);
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <StarsBackground />
        <ShootingStars />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10"
        >
          <div className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{ 
              borderColor: 'var(--accent-light)',
              borderTopColor: 'transparent' 
            }}
          />
          <p className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Loading Projects...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <StarsBackground />
        <ShootingStars />
      </div>

      {/* Floating Glow Orbs */}
      <motion.div
        className="fixed top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--accent-primary)' }}
        animate={{ 
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--amber-primary)' }}
        animate={{ 
          y: [0, 30, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <AutoScrollToTop />
      
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-28 pb-12">
        {/* Header Section */}
        <motion.div
          className="max-w-7xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title with Gradient */}
          <div className="text-center mb-6">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-light) 50%, var(--amber-primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Explore Projects
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover innovative student projects across multiple categories
            </motion.p>
          </div>

          {/* Filter Section */}
          <motion.div
            className="flex justify-center items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <Filter className="w-4 h-4" style={{ color: 'var(--accent-light)' }} />
              <span className="text-sm font-medium hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>
                Filter:
              </span>
            </div>
            
            <div className="relative">
              <select
                value={activeFilter}
                onChange={handleFilterChange}
                className="px-4 sm:px-6 py-2.5 sm:py-3 pl-12 sm:pl-14 rounded-xl text-sm sm:text-base font-medium border-2 focus:outline-none transition-all duration-300 cursor-pointer appearance-none"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-accent)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-light)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(93, 211, 167, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {filters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
              {(() => {
                const selectedFilter = filters.find(f => f.value === activeFilter);
                const IconComponent = selectedFilter?.Icon;
                return IconComponent ? (
                  <IconComponent 
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none"
                    style={{ color: 'var(--accent-light)' }}
                  />
                ) : null;
              })()}
            </div>
          </motion.div>

          {/* Active Filter Badge */}
          {activeFilter !== "all" && (
            <motion.div
              className="flex justify-center mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                style={{ 
                  backgroundColor: 'var(--accent-primary)',
                  color: 'white'
                }}
              >
                Showing: {filters.find(f => f.value === activeFilter)?.label}
                <button
                  onClick={() => setActiveFilter("all")}
                  className="ml-2 hover:opacity-80 transition-opacity"
                  aria-label="Clear filter"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="max-w-7xl mx-auto space-y-12 sm:space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {activeFilter === "all" || activeFilter === "Game" ? (
            <Games projects={projectsByCategory.Game} />
          ) : null}

          {activeFilter === "all" || activeFilter === "Website" ? (
            <Websites projects={projectsByCategory.Website} />
          ) : null}

          {activeFilter === "all" || activeFilter === "Video" ? (
            <Videos projects={projectsByCategory.Video} />
          ) : null}

          {activeFilter === "all" || activeFilter === "Documentary" ? (
            <Documentaries projects={projectsByCategory.Documentary} />
          ) : null}

          {activeFilter === "all" || activeFilter === "Digital Art" ? (
            <DigitalArt projects={projectsByCategory.DigitalArt} />
          ) : null}
        </motion.div>
      </div>
    </div>
  );
};

export default ExploreProjects;

