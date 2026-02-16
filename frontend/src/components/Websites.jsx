import React, { useState, useMemo, useEffect } from "react";
import { motion } from "../motionless";
import { Filter, ArrowUpDown, Globe } from "lucide-react";
import ProjectCard from "./ProjectCard";
import useLeaderboardRankings from "../hooks/useLeaderboardRankings";

const Websites = ({ projects = [] }) => {
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });
  const [websites, setWebsites] = useState(projects);
  const [hoveredWebsite, setHoveredWebsite] = useState(null);
  const { getProjectRankings } = useLeaderboardRankings();

  // Initialize with props and update when props change
  useEffect(() => {
    setWebsites(projects);
  }, [projects]);

  const filteredAndSortedWebsites = useMemo(() => {
    let result = [...websites];

    if (filter.sdg) {
      result = result.filter((website) => website.sdgs.includes(filter.sdg));
    }

    switch (filter.sortBy) {
      case "ratings":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "mostViewed":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "mostLiked":
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
    }

    return result;
  }, [filter, websites]);

  // Extract unique SDGs from projects
  const uniqueSdgs = useMemo(() => {
    const allSdgs = websites.flatMap((project) => project.sdgs || []);
    return [...new Set(allSdgs)];
  }, [websites]);

  // Function to get proper image URL
  const getImageUrl = (mediaPath) => {
    if (!mediaPath) return null;
    if (mediaPath.startsWith("http")) {
      return mediaPath;
    }

    mediaPath = mediaPath.replace(/\\/g, "/");
    return `${import.meta.env.VITE_BACKEND_URL}/${mediaPath}`;
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--accent-light)' }} />
        <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>No website projects found</p>
      </div>
    );
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-fit p-4 sm:p-6 md:p-8 rounded-2xl border-2"
      style={{
        backgroundColor: 'rgba(15, 18, 17, 0.4)',
        borderColor: 'var(--border-accent)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="relative z-10">
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
          <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <Globe className="w-8 h-8" style={{ color: 'var(--amber-primary)' }} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold" style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Website Innovation Hub
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 w-full">
          {/* SDG Filter */}
          <div className="relative flex-1">
            <select
              value={filter.sdg}
              onChange={(e) => setFilter(prev => ({ ...prev, sdg: e.target.value }))}
              className="w-full px-4 py-3 pr-12 rounded-xl appearance-none border-2 focus:outline-none transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-accent)' }}
            >
              <option value="">All Sustainable Development Goals</option>
              {uniqueSdgs.map(sdg => <option key={sdg} value={sdg}>{sdg}</option>)}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5" style={{ color: 'var(--accent-light)' }} />
          </div>

          {/* Sort Filter */}
          <div className="relative flex-1">
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter(prev => ({ ...prev, sortBy: e.target.value }))}
              className="w-full px-4 py-3 pr-12 rounded-xl appearance-none border-2 focus:outline-none transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-accent)' }}
            >
              <option value="ratings">Top Rated</option>
              <option value="newest">Newest</option>
              <option value="mostViewed">Most Viewed</option>
              <option value="mostLiked">Most Liked</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5" style={{ color: 'var(--accent-light)' }} />
          </div>
        </div>

        {/* Websites Grid */}
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
          {filteredAndSortedWebsites.map((website) => {
            const rankings = getProjectRankings(website._id);
            let leaderboardRank = null;
            let leaderboardType = null;

            if (rankings.overall) {
              leaderboardRank = rankings.overall;
              leaderboardType = "overall";
            } else if (rankings.weekly) {
              leaderboardRank = rankings.weekly;
              leaderboardType = "thisWeek";
            }

            return (
              <ProjectCard
                key={website._id}
                project={website}
                onHover={setHoveredWebsite}
                isHovered={hoveredWebsite === website._id}
                getImageUrl={getImageUrl}
                leaderboardRank={leaderboardRank}
                leaderboardType={leaderboardType}
              />
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Websites;

