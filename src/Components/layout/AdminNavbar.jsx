import React from "react";

export default function AdminNavbar({ onMenuToggle, title }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center">
          {/* Mobile menu toggle */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 mr-4"
          >
            <i className="ri-menu-line text-xl"></i>
          </button>

          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700">
            <i className="ri-notification-line text-xl"></i>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <i className="ri-user-line text-white"></i>
          </div>
        </div>
      </div>
    </header>
  );
}
