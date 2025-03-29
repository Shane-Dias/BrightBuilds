import React, { useState } from "react";
import { motion } from "framer-motion";
import Games from "../components/Games";
import Websites from "../components/Websites";
import Videos from "../components/Videos";
import Documentaries from "../components/Documentaries";
import DigitalArt from "../components/DigitalArt";

const ExploreProjects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Define filter options
  const filters = [
    { label: "All", value: "all" },
    { label: "Games", value: "games" },
    { label: "Websites", value: "websites" },
    { label: "Videos", value: "videos" },
    { label: "Documentaries", value: "documentaries" },
    { label: "Digital Art", value: "digitalart" },
  ];

  // Render components based on active filter
  const renderComponents = () => {
    const components = [
      { Component: Games, filter: "games" },
      { Component: Websites, filter: "websites" },
      { Component: Videos, filter: "videos" },
      { Component: Documentaries, filter: "documentaries" },
      { Component: DigitalArt, filter: "digitalart" },
    ];

    return components
      .filter((item) => activeFilter === "all" || item.filter === activeFilter)
      .map(({ Component }, index) => <Component key={index} />);
  };

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

      <div className="space-y-12">{renderComponents()}</div>
    </div>
  );
};

export default ExploreProjects;
