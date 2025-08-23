import React from "react";

const EditProfile = ({ setActiveTab }) => {
  return (
    <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-700">Edit Profile</h2>
      <div className="mt-4 space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
        <input type="text" placeholder="+91 63********7" className="w-full p-2 border rounded" />
        <input type="date" className="w-full p-2 border rounded" />

        <div>
          <p className="text-sm text-gray-600 mb-2">Gender</p>
          <div className="flex space-x-3">
            <button className="border px-4 py-2 rounded">Male</button>
            <button className="border px-4 py-2 rounded">Female</button>
            <button className="bg-pink-500 text-white px-4 py-2 rounded">Other</button>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="border px-4 py-2 rounded"
            onClick={() => setActiveTab("Profile")}
          >
            Go back
          </button>
          <button className="bg-red-900 text-white px-4 py-2 rounded">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
