import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to fetch and track project rankings in leaderboards
 * @returns {Object} - Object containing leaderboard data and utility functions
 */
const useLeaderboardRankings = () => {
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
  const [overallLeaderboard, setOverallLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaderboard data from backend
  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/projects");
        const allProjects = response.data.data || [];
        
        // Calculate weekly leaderboard (projects from last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const weeklyProjects = allProjects
          .filter(
            (project) =>
              new Date(project.createdAt) >= sevenDaysAgo &&
              project.status === "approved"
          )
          .sort((a, b) => b.rating - a.rating || b.likes - a.likes)
          .slice(0, 5); // Top 5 for weekly
        
        // Calculate overall leaderboard
        const overallProjects = allProjects
          .filter((project) => project.status === "approved")
          .sort((a, b) => b.rating - a.rating || b.likes - a.likes)
          .slice(0, 10); // Top 10 overall
        
        setWeeklyLeaderboard(weeklyProjects);
        setOverallLeaderboard(overallProjects);
        setError(null);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboards();
  }, []);

  /**
   * Get a project's rankings in both leaderboards
   * @param {string} projectId - The ID of the project
   * @returns {Object} - Object containing weekly and overall rankings
   */
  const getProjectRankings = (projectId) => {
    const weeklyRank = weeklyLeaderboard.findIndex(p => p._id === projectId) + 1;
    const overallRank = overallLeaderboard.findIndex(p => p._id === projectId) + 1;
    
    return {
      weekly: weeklyRank > 0 ? weeklyRank : null,
      overall: overallRank > 0 ? overallRank : null
    };
  };

  /**
   * Check if a project is in any leaderboard
   * @param {string} projectId - The ID of the project
   * @returns {boolean} - True if project is in any leaderboard
   */
  const isProjectInLeaderboard = (projectId) => {
    const rankings = getProjectRankings(projectId);
    return rankings.weekly !== null || rankings.overall !== null;
  };

  return {
    weeklyLeaderboard,
    overallLeaderboard,
    loading,
    error,
    getProjectRankings,
    isProjectInLeaderboard
  };
};

export default useLeaderboardRankings;