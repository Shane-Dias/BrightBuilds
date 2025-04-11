import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function FacultyProfile({ faculty }) {
  console.log('faculty in component', faculty);
  
  return (
    <div className="flex justify-between items-center px-16 pb-12 pt-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex items-center space-x-4">
        {/* <img
          src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'
          alt='Profile'
          className="w-16 h-16 rounded-full border-2 border-emerald-500"
        /> */}
        <div>
          <h1 className="text-3xl text-white font-lilita font-normal">Welcome, {faculty?.fullName}</h1>
          <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2">
                      <FaChalkboardTeacher className="text-emerald-400 text-xl" />
                      Faculty Dashboard
                    </p>
         
        </div>
      </div>
    </div>
  );
}