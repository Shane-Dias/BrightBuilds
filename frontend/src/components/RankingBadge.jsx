import React from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Reusable component for displaying leaderboard ranking badges
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of leaderboard: "weekly" or "overall"
 * @param {number} props.rank - Rank position (1, 2, 3, etc.)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Leaderboard badge component
 */
const RankingBadge = ({ type = "weekly", rank, className = "" }) => {
  if (!rank) return null;
  
  const badgeConfig = {
    weekly: {
      colors: "from-amber-500 to-yellow-400",
      textColor: "text-black",
      label: "Weekly"
    },
    overall: {
      colors: "from-purple-500 to-indigo-500",
      textColor: "text-white",
      label: "Overall"
    }
  };
  
  const config = badgeConfig[type] || badgeConfig.weekly;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={`bg-gradient-to-r ${config.colors} ${config.textColor} font-bold py-1 px-3 rounded-full text-xs flex items-center shadow-lg ${className}`}
    >
      <Trophy size={12} className="mr-1" />
      #{rank} {config.label}
    </motion.div>
  );
};

export default RankingBadge;