import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Games from "../components/Games";
import Websites from "../components/Websites";
import Videos from "../components/Videos";
import Documentaries from "../components/Documentaries";
import DigitalArt from "../components/DigitalArt";
import axios from "axios";
import AutoScrollToTop from "../components/AutoScrollToTop";

const ExploreProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");

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
    { label: "All", value: "all" },
    { label: "Games", value: "Game" },
    { label: "Websites", value: "Website" },
    { label: "Videos", value: "Video" },
    { label: "Documentaries", value: "Documentary" },
    { label: "Digital Art", value: "Digital Art" },
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

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-4 md:p-8 pt-20 md:pt-24">
      <AutoScrollToTop />
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <motion.h1
          className="text-3xl md:text-5xl font-lilita text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Projects
        </motion.h1>

        <div className="w-full md:w-auto">
          <select
            value={activeFilter}
            onChange={handleFilterChange}
            className="w-full md:w-48 px-4 py-2 rounded-md text-sm bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-12">
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
      </div>
    </div>
  );
};

export default ExploreProjects;
