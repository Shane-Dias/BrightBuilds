import React from "react";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function FacultyProfile({ faculty }) {
  console.log('faculty in component', faculty);
  
  return (
    <div className="w-full border-b" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-accent)' }}>
      <div className="container mx-auto px-4 sm:px-8 pt-24 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
        {/* <img
          src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'
          alt='Profile'
          className="w-16 h-16 rounded-full border-2 border-emerald-500"
        /> */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-lilita font-normal" style={{ color: 'var(--text-primary)' }}>
                Welcome, {faculty?.fullName || "Faculty"}
              </h1>
              <p className="flex items-center gap-2 mt-1" style={{ color: 'var(--text-secondary)' }}>
                <FaChalkboardTeacher className="text-xl" style={{ color: 'var(--accent-primary)' }} />
                Faculty Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}