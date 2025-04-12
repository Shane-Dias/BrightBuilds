import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaWater,
  FaHeartbeat,
  FaBook,
  FaFemale,
  FaRecycle,
  FaTree,
  FaGlobeAmericas,
  FaHandsHelping,
  FaLightbulb,
  FaCity,
  FaSolarPanel,
  FaBalanceScale,
  FaChild,
  FaUsers,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

const SdgTracking = () => {
  const [sdgData, setSdgData] = useState({});
  const [selectedSdg, setSelectedSdg] = useState(null);
  const [loading, setLoading] = useState(true);
  const projectListRef = useRef(null); // ref to scroll to projects

  const sdgIcons = {
    "No Poverty": BsCashCoin,
    "Zero Hunger": FaChild,
    "Good Health and Well-being": FaHeartbeat,
    "Quality Education": FaBook,
    "Gender Equality": FaFemale,
    "Clean Water and Sanitation": FaWater,
    "Affordable and Clean Energy": FaSolarPanel,
    "Decent Work and Economic Growth": FaChartLine,
    "Industry, Innovation, and Infrastructure": FaLightbulb,
    "Reduced Inequality": FaUsers,
    "Sustainable Cities and Communities": FaCity,
    "Responsible Consumption and Production": FaRecycle,
    "Climate Action": FaGlobeAmericas,
    "Life Below Water": FaWater,
    "Life on Land": FaTree,
    "Peace, Justice, and Strong Institutions": FaBalanceScale,
    "Partnerships for the Goals": FaHandshake,
  };

  useEffect(() => {
    const fetchSDGData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/sdg-summary");
        const json = await res.json();
        if (json.success) {
          setSdgData(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch SDG data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSDGData();
  }, []);

  const totalProjects = Object.values(sdgData).flat().length;

  return (
    <div className="bg-white/5 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-6">SDG Tracking</h3>

      {loading ? (
        <p className="text-white">Loading SDG Data...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {Object.entries(sdgData).map(([sdg, projects]) => (
              <motion.div
                key={sdg}
                whileHover={{ y: -5, scale: 1.05 }}
                className={`bg-gray-800/50 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-800/70 transition-colors ${
                  selectedSdg === sdg ? "ring-2 ring-blue-400" : ""
                }`}
                onClick={() => {
                  setSelectedSdg(sdg);
                  setTimeout(() => {
                    projectListRef.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 100);
                }}
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  {sdgIcons[sdg] ? (
                    <span className="text-2xl text-blue-400">
                      {React.createElement(sdgIcons[sdg])}
                    </span>
                  ) : (
                    <span className="text-sm text-white">{sdg}</span>
                  )}
                </div>

                <span className="text-sm font-semibold text-white mb-1">
                  SDG: {sdg}
                </span>

                <span className="text-xs text-gray-400">
                  {projects.length}{" "}
                  {projects.length === 1 ? "project" : "projects"}
                </span>
              </motion.div>
            ))}
          </div>

          {selectedSdg && (
            <div
              ref={projectListRef}
              className="bg-gray-800/60 rounded-xl p-6 mb-6"
            >
              <h4 className="text-lg font-medium text-white mb-4">
                Projects under SDG {selectedSdg}
              </h4>
              <ul className="list-disc pl-6 text-gray-300">
                {sdgData[selectedSdg].map((project) => (
                  <li
                    key={project._id}
                    className="mb-2 flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <a
                      href={`/details/${project._id}`}
                      className="text-sm px-3 py-2 rounded-lg bg-black text-white hover:bg-blue-500 hover:text-black"
                    >
                      View Details
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h4 className="text-lg font-medium text-white mb-4">
              SDG Impact Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {Object.keys(sdgData).length}
                </div>
                <div className="text-gray-400">SDGs Addressed</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-400">100%</div>
                <div className="text-gray-400">Projects Mapped</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">
                  {totalProjects}
                </div>
                <div className="text-gray-400">Total Contributions</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SdgTracking;
