import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Games from "../components/Games";
import Websites from "../components/Websites";
import Videos from "../components/Videos";
import Documentaries from "../components/Documentaries";
import DigitalArt from "../components/DigitalArt";
import axios from "axios"; // or use fetch

const ExploreProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    { label: "Games", value: "Game" }, // Match these to your schema's category values
    { label: "Websites", value: "Website" },
    { label: "Videos", value: "Video" },
    { label: "Documentaries", value: "Documentary" },
    { label: "Digital Art", value: "Digital Art" },
  ];

  // Filter projects by active category
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

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
  console.log(projectsByCategory)

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-5xl font-lilita text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore Projects
        </motion.h1>

        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`
                px-4 py-2 rounded-md text-sm transition-colors duration-300
                ${
                  activeFilter === filter.value
                    ? "bg-white text-black"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }
              `}
            >
              {filter.label}
            </button>
          ))}
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
