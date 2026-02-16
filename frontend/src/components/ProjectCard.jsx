import React from "react";
import { motion } from "../motionless";
import { Star, Heart, ExternalLink, Globe, Trophy, Award, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onHover, isHovered, getImageUrl, leaderboardRank, leaderboardType, showStatusBadge = false }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/details/${project._id}`);
  };

  const getImageSrc = () => {
    if (!project.media || project.media.length === 0) {
      return "https://placehold.co/600x400/1a1a1a/888888?text=No+Image";
    }
    return getImageUrl ? getImageUrl(project.media[0]) : project.media[0];
  };

  // Determine badge styling based on rank type
  const getBadgeStyle = () => {
    if (leaderboardType === "thisWeek") {
      return { backgroundColor: 'var(--accent-primary)', label: "This Week" };
    } else if (leaderboardType === "overall") {
      return { backgroundColor: '#FFD700', label: "Overall" };
    }
    return null;
  };

  const badgeStyle = getBadgeStyle();

  const getStatusBadgeStyle = () => {
    switch (project?.status) {
      case "approved":
        return { label: "Approved", color: "var(--accent-primary)", Icon: CheckCircle };
      case "pending":
        return { label: "Pending", color: "var(--amber-light)", Icon: Clock };
      case "rejected":
        return { label: "Rejected", color: "#ff6b6b", Icon: XCircle };
      default:
        return null;
    }
  };

  const statusBadge = showStatusBadge ? getStatusBadgeStyle() : null;

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 300 },
        },
      }}
      onMouseEnter={() => onHover && onHover(project._id)}
      onMouseLeave={() => onHover && onHover(null)}
      className="h-full"
    >
      <div
        className="h-full rounded-xl overflow-hidden border transition-all duration-300 flex flex-col"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: statusBadge
            ? statusBadge.color
            : isHovered
              ? 'var(--accent-light)'
              : 'var(--border-accent)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: isHovered 
            ? '0 8px 24px rgba(47, 167, 111, 0.15)' 
            : '0 2px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Image Container */}
        <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-gray-900">
          <motion.img
            src={getImageSrc()}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400/1a1a1a/888888?text=No+Image";
            }}
          />
          
          {/* Status Badge */}
          {statusBadge && (
            <div
              className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-bold"
              style={{
                backgroundColor: statusBadge.color,
                color: statusBadge.label === "Approved" ? "white" : "black",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <span className="inline-flex items-center gap-1">
                <statusBadge.Icon size={14} />
                {statusBadge.label}
              </span>
            </div>
          )}

          {/* Leaderboard Badge */}
          {badgeStyle && leaderboardRank && (
            <div
              className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-bold flex items-center justify-center gap-1.5"
              style={{
                backgroundColor: badgeStyle.backgroundColor,
                color: leaderboardType === "overall" ? '#000' : 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                border: leaderboardType === "overall" ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {leaderboardType === "overall" ? (
                <Trophy size={14} fill="currentColor" />
              ) : (
                <Award size={14} fill="currentColor" />
              )}
              #{leaderboardRank} {badgeStyle.label}
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          {/* Title and Rating */}
          <div className="flex justify-between items-start gap-3 mb-3">
            <h3
              className="text-lg sm:text-xl font-bold line-clamp-2 flex-grow"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star
                size={16}
                fill="currentColor"
                style={{ color: 'var(--amber-primary)' }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.rating ? project.rating.toFixed(1) : "0.0"}
              </span>
            </div>
          </div>

          {/* Likes */}
          <div className="flex items-center gap-2 mb-4">
            <Heart
              size={16}
              fill={project.userHasLiked ? "currentColor" : "none"}
              style={{
                color: project.userHasLiked ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.likes || 0} likes
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-auto">
            <motion.button
              onClick={handleViewDetails}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2.5 px-3 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'white',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              }}
            >
              View Details
              <Globe size={14} />
            </motion.button>

            <div className="relative group/project flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 px-3 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border-2"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-accent)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-light)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Visit Project
                <ExternalLink size={14} />
              </motion.button>

              {/* Dropdown Menu */}
              <div
                className="absolute bottom-full left-0 mb-2 hidden group-hover/project:flex flex-col rounded-lg shadow-lg overflow-hidden z-20 w-full"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs sm:text-sm transition-colors border-b"
                  style={{
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-accent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  GitHub Repo
                </a>
                <a
                  href={project.hostedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs sm:text-sm transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
