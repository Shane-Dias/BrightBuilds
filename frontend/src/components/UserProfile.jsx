import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight, FaUser, FaChartLine } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";

export default function UserProfile({ userProfile, profilePic }) {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get userId from localStorage when component mounts
    const storedUserId = localStorage.getItem("userId");
    console.log("user image", profilePic);

    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/userdetails/${userId}`);
    }
  };

  return (
    <div className="flex  flex-col md:flex-row justify-between items-center px-4 md:px-16 py-8 md:py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <div className="flex pt-10 flex-col md:flex-row items-center md:space-x-6 mb-6 md:mb-0">
        {/* <div
          onClick={handleProfileClick}
          className="group relative cursor-pointer mb-4 md:mb-0 transition-transform hover:scale-105"
        >
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full border-3 border-emerald-500 shadow-md hover:shadow-emerald-400/50"
          />
          <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all">
            <span className="text-emerald-400 opacity-0 group-hover:opacity-100 text-xs font-medium">
              View Profile
            </span>
          </div>
        </div> */}

        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl text-white font-lilita font-normal">
            Welcome, {userProfile || "User"}
          </h1>
          <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
            <PiStudentBold className="text-emerald-400 text-xl" />
            Student Dashboard
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-7">
        <Link to={"/create"} className="transition-transform hover:scale-105">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
            <FaArrowAltCircleRight className="text-xl" />
            <span className="font-bold text-sm">Add New Project</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
