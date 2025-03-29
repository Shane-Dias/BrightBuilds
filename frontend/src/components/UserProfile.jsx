import React from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function UserProfile({ userProfile }) {
  return (
    <div className="flex justify-between items-center px-16 pb-12 pt-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex items-center space-x-4">
        <img
          src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'
          alt='Profile'
          className="w-16 h-16 rounded-full border-2 border-emerald-500"
        />
        <div>
          <h1 className="text-3xl text-white font-lilita font-normal">Welcome, Serene</h1>
          <p className="text-gray-400">Student Dashboard</p>
        </div>
      </div>
      <Link to={'/create'}>
      <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-5 rounded-xl flex items-center space-x-2 transition-colors">
       
       <FaArrowAltCircleRight className="text-xl"/>
        <span className="font-boldonse  font-semibold text-sm">Add New Project</span>
      </button>
      </Link>
    </div>
  );
}
