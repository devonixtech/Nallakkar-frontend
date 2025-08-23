import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ activeView, setActiveView, onEditClick }) => {
  const isSettingsActive = ["settings", "languages"].includes(activeView);
  return (
    <div className="w-1/4 p-8 flex flex-col items-center">
      <img
        src="https://randomuser.me/api/portraits/women/82.jpg"
        alt="Ankitha"
        className="w-24 h-24 rounded-full mb-2"
      />
      <h2 className="text-xl font-bold text-gray-800 mb-3">Ankitha</h2>
      {/* <button
        onClick={onEditClick}
        className="text-sm font-semibold text-red-500 mb-3"
      >
        Edit Profile
      </button> */}
      <div className="w-full space-y-3">
        <button
          onClick={() => setActiveView("profile")}
          className={`w-full py-2 rounded-lg ${
            ["profile", "editProfile"].includes(activeView)
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Profile
        </button>
        <Link
          to="/orderHistory"
          className="block w-full text-center text-gray-600 bg-gray-200 py-2 rounded-lg no-underline"
        >
          Orders
        </Link>

        <button className="w-full text-gray-600 bg-gray-200 py-2 rounded-lg">
          Help
        </button>
        <button
          onClick={() => setActiveView("settings")}
          className={`w-full py-2 rounded-lg ${
            isSettingsActive
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Settings
        </button>
        <button className="w-full text-gray-600 bg-gray-200 py-2 rounded-lg">
          Logout
        </button>
      </div>
    </div>
  );
};

const ProfileView = ({ onEditClick }) => (
  <div className="flex-1 p-12">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-primary inline-block">
          My Account
          <div className="w-20 border-b-2 border-primary mt-1 mx-auto"></div>
        </h1>
      </div>
      <button
        onClick={onEditClick}
        className="text-sm font-semibold text-red-500"
      >
        Edit Profile
      </button>
    </div>
    <div className="flex items-center">
      <img
        src="https://randomuser.me/api/portraits/women/82.jpg"
        alt="Ankitha"
        className="w-16 h-16 rounded-full"
      />
      <div className="ml-4">
        <h3 className="text-lg font-bold text-gray-800">Ankitha</h3>
        <p className="text-gray-500">+91 63********7</p>
      </div>
    </div>
  </div>
);

const EditProfileView = ({ onGoBackClick }) => (
  <div className="flex-1 max-w-xl p-12">
    <h1 className="text-2xl font-bold text-primary inline-block">
      Edit Profile
      <div className="w-20 border-b-2 border-primary mt-1 mb-8 mx-auto"></div>
    </h1>

    <div className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        value="+91 63********7"
        disabled
        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
      />
      <input
        type="text"
        placeholder="Date Of Birth"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      <div>
        <p className="text-gray-600 mb-2">Gender</p>
        <div className="flex items-center space-x-4">
          <button className="px-5 py-1 border border-gray-300 rounded-lg text-gray-700">
            Male
          </button>
          <button className="px-5 py-1 border border-gray-300 rounded-lg text-gray-700">
            Female
          </button>
          <button className="px-5 py-1 bg-red-500 text-white rounded-lg">
            Other
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 underline">
          To help us customise your experience
        </p>
      </div>
      <div className="flex space-x-4 pt-4">
        <button
          onClick={onGoBackClick}
          className="flex-1 py-3 border border-gray-300 rounded-full font-semibold text-gray-700"
        >
          Go back
        </button>
        <button className="flex-1 py-3 bg-red-600 text-white rounded-full font-semibold">
          Save Changes
        </button>
      </div>
    </div>
  </div>
);

const SettingsView = ({ onNavigate }) => (
  <div className="flex-1 p-12">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-primary inline-block">
        Settings
        <div className="w-20 border-b-2 border-primary mt-1 mx-auto"></div>
      </h1>
      <a href="#" className="text-sm font-semibold text-gray-600">
        Reset Settings
      </a>
    </div>
    <div className="space-y-6 text-primary font-medium">
      <div className="flex justify-start gap-3 items-center cursor-pointer hover:text-red-500">
        <span>Get Alerts on whatsapp</span>
        <span>›</span>
      </div>
      <div
        onClick={() => onNavigate("languages")}
        className="flex justify-start gap-3 items-center cursor-pointer hover:text-red-500"
      >
        <span>My Languages</span>
        <span>›</span>
      </div>
      <Link to={"/FAQSection"} className="block hover:text-red-500">
        Help & Supports
      </Link>
      <Link to={"/ShippingPolicy"} className="block hover:text-red-500">
        Privacy & Policy
      </Link>
      <Link to={"/about"} className="block hover:text-red-500">
        About Us
      </Link>
      <Link to={"/TermsAndConditions"} className="block hover:text-red-500">
        Terms of Use
      </Link>
    </div>
  </div>
);

const LanguageOption = ({ code, name, subName, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
      selected ? "border-red-500" : "border-gray-300"
    }`}
  >
    <div className="flex items-center">
      <span className="font-bold text-lg w-10">{code}</span>
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{subName}</p>
      </div>
    </div>
    {selected && <span className="text-red-500 font-bold text-xl">✓</span>}
  </div>
);

const LanguagesView = ({ onGoBackClick }) => {
  const [selectedLang, setSelectedLang] = useState("English");
  const languages = [
    { code: "US", name: "English", subName: "English" },
    { code: "KN", name: "Kannada", subName: "Kannada" },
    { code: "TE", name: "Telugu", subName: "Telugu" },
    { code: "HI", name: "Hindi", subName: "Hindi" },
  ];

  return (
    <div className="flex-1 max-w-xl p-12">
      <h1 className="text-2xl font-bold text-primary inline-block">
        My Languages
        <div className="w-20 border-b-2 border-primary mt-1 mb-8 mx-auto"></div>
      </h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search Language"
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {languages.map((lang) => (
          <LanguageOption
            key={lang.name}
            {...lang}
            selected={selectedLang === lang.name}
            onClick={() => setSelectedLang(lang.name)}
          />
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onGoBackClick}
          className="flex-1 py-3 border border-gray-300 rounded-full font-semibold text-gray-700"
        >
          Go back
        </button>
        <button className="flex-1 py-3 bg-rose text-white rounded-full font-semibold">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const AccountPage = () => {
  const [activeView, setActiveView] = useState("profile"); // 'profile', 'editProfile', 'settings', 'languages'

  const renderContent = () => {
    switch (activeView) {
      case "profile":
        return <ProfileView onEditClick={() => setActiveView("editProfile")} />;
      case "editProfile":
        return (
          <EditProfileView onGoBackClick={() => setActiveView("profile")} />
        );
      case "settings":
        return <SettingsView onNavigate={setActiveView} />;
      case "languages":
        return (
          <LanguagesView onGoBackClick={() => setActiveView("settings")} />
        );
      default:
        return <ProfileView onEditClick={() => setActiveView("editProfile")} />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-6xl mx-auto mt-8  rounded-lg shadow-lg border border-black flex">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          <div className="border-l border-gray-200"></div>
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
