import React from "react";

const Settings = () => {
  return (
    <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-gray-700">Settings</h2>
        <span className="text-blue-600 cursor-pointer">Reset Settings</span>
      </div>

      <div className="mt-6 space-y-3">
        <p className="cursor-pointer">Get Alerts on whatsapp ➝</p>
        <p className="cursor-pointer">My Languages ➝</p>
        <p className="cursor-pointer">Help & Supports</p>
        <p className="cursor-pointer">Privacy & Policy</p>
        <p className="cursor-pointer">About Us</p>
        <p className="cursor-pointer">Terms of Use</p>
      </div>
    </div>
  );
};

export default Settings;
