import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { name: "Profile" },
    { name: "Orders" },
    { name: "Help" },
    { name: "Settings" },
    { name: "Logout" },
  ];

  return (
    <div className="w-1/4 bg-white p-4">
      <div className="flex flex-col items-center">
        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />
        <h2 className="mt-2 font-semibold text-lg">Ankitha</h2>
        <span className="text-rose text-sm cursor-pointer">Edit Profile</span>
      </div>

      <div className="mt-6 flex flex-col space-y-3">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className={`py-2 px-4 rounded-md text-left ${
              activeTab === item.name
                ? "bg-rose text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
