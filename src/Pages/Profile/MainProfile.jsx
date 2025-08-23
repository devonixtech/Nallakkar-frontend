import React from "react";

const MainProfile = ({ setActiveTab }) => {
  return (
    <div className="w-3/4 bg-white p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-primary">My Account</h2>
        <span
          className="text-rose cursor-pointer"
          onClick={() => setActiveTab("Edit Profile")}
        >
          Edit Profile
        </span>
      </div>

      <div className="mt-6 flex items-center space-x-4">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <h3 className="font-semibold">Ankitha</h3>
          <p className="text-gray-500">+91 63********7</p>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
