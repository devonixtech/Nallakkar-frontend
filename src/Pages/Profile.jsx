import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserById } from "../Redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Redux/slices/userSlice";
import { updateUser as updateAuthUser } from "../Redux/slices/userSlice"; // ✅ import your authSlice action
import { logout } from "../Redux/slices/authSlice";
import { toast } from "react-toastify";

const Sidebar = ({ activeView, setActiveView }) => {
  const isSettingsActive = ["settings", "languages"].includes(activeView);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Single logout implementation
  const handleLogout = () => {
    try {
      dispatch(logout()); // Redux + localStorage clear dono ho jayega
      navigate("/", { replace: true });
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // fetch user from users slice (example; use real ID in production)
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  // avoid name collision: name redux value reduxUserData
  const reduxUserData = useSelector((state) => state?.users?.userData?.data);
  const authUser = useSelector((state) => state?.auth?.user);

  // computed display name — checks multiple sources
  const displayName =
    reduxUserData?.name ||
    authUser?.name ||
    JSON.parse(localStorage.getItem("user") || "{}")?.name ||
    "Name not found";

  return (
    <div className="w-full md:w-1/4 p-6 md:p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
      <img
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
        alt="guset"
        className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-2"
      />
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
        {displayName}
      </h2>

      <div className="w-full space-y-2 md:space-y-3">
        <button
          onClick={() => setActiveView("profile")}
          className={`w-full py-2 rounded-lg text-sm md:text-base ${
            ["profile", "editProfile"].includes(activeView)
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Profile
        </button>

        <Link
          to="/orderHistory"
          className="block w-full text-center text-gray-600 bg-gray-200 py-2 rounded-lg text-sm md:text-base"
        >
          Orders
        </Link>

        <Link
          to={"/FAQSection"}
          className="block w-full text-center text-gray-600 bg-gray-200 py-2 rounded-lg text-sm md:text-base"
        >
          Help
        </Link>

        <button
          onClick={() => setActiveView("settings")}
          className={`w-full py-2 rounded-lg text-sm md:text-base ${
            isSettingsActive
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Settings
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-gray-600 bg-gray-200 py-2 rounded-lg text-sm md:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const ProfileView = ({ onEditClick }) => {
  // user data from users slice and auth slice
  const reduxUserData = useSelector((state) => state?.users?.userData?.data);
  const authUser = useSelector((state) => state?.auth?.user);

  const userName =
    authUser?.name ||
    JSON.parse(localStorage.getItem("user") || "{}")?.name ||
    reduxUserData?.name ||
    "Name not found";

  const userNumber =
    authUser?.mobileNumber ||
    JSON.parse(localStorage.getItem("user") || "{}")?.emailOrMobile ||
    reduxUserData?.emailOrMobile ||
    "+91 **********";

  return (
    <div className="flex-1 p-6 md:p-12">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary inline-block">
            Account
            <div className="w-20 border-b-2 border-primary mt-1 mx-auto"></div>
          </h1>
        </div>
        <button
          onClick={onEditClick}
          className="text-sm font-semibold text-red-500 mt-2 md:mt-0"
        >
          Edit Profile
        </button>
      </div>

      <div className="flex items-center">
        <img
          src="https://randomuser.me/api/portraits/women/82.jpg"
          alt={userName || "User"}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full"
        />
        <div className="ml-4">
          <h3 className="text-base md:text-lg font-bold text-gray-800">
            {userName}
          </h3>
          <p className="text-gray-500 text-sm md:text-base">{userNumber}</p>
        </div>
      </div>
    </div>
  );
};

// Working ----- Edit Form due
const EditProfileView = ({ onGoBackClick, authUser }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

  const user = useSelector((state) => state.auth.user);

  const user_Id = user?.id;

  // ✅ Form states
  const [name, setName] = useState(authUser?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [number, setNumber] = useState(user?.emailOrMobile || "");
  const [dateOfBirth, setDateOfBirth] = useState(authUser?.dateOfBirth || "");
  const [gender, setGender] = useState(authUser?.gender || "");
  const [image, setImage] = useState(null);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     formData.append("name", name);
  //     formData.append("email", email);
  //     formData.append("mobileNumber", number);
  //     formData.append("dateOfBirth", dateOfBirth);
  //     formData.append("gender", gender);

  //     if (image) formData.append("image", image);

  //  dispatch(updateUser({ id: user_Id, data: formData })).then((res) => {
  //   // if (res.payload?.data) {
  //       const updatedUser = res.payload.data;

  //       // ✅ Update both slices first
  //       dispatch(updateAuthUser(updatedUser));

  //       // ✅ Also update localStorage immediately

  //       // ✅ Then refetch the latest user from backend (for consistency)
  //       dispatch(fetchUserById(user_Id));

  //       // ✅ Finally go back to profile view
  //       onGoBackClick();
  //     // }
  // });

  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNumber", number);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    if (image) formData.append("image", image);

    try {
      const res = await dispatch(
        updateUser({ id: user_Id, data: formData })
      ).unwrap();

      // update auth slice
      dispatch(updateAuthUser(res));

      // fetch latest user
      await dispatch(fetchUserById(user_Id));

      // now go back safely
      onGoBackClick();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch]);

  return (
    <div className="flex-1 max-w-xl p-6 md:p-12">
      <h1 className="text-2xl font-bold text-primary inline-block pb-4">
        Edit Profile
        <div className="w-20 border-b-2 border-primary mt-1 mx-auto"></div>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        {/* Mobile Number */}
        <input
          type="text"
          placeholder="Mobile Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          disabled
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        {/* Email */}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        {/* Date of Birth */}
        <input
          type="text"
          placeholder="Date Of Birth"
          value={dateOfBirth}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        {/* Gender */}
        <div>
          <p className="text-gray-600 mb-2 text-sm md:text-base">Gender</p>
          <div className="flex items-center space-x-3 md:space-x-4">
            {["Male", "Female", "Other"].map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGender(g)}
                className={`px-4 md:px-5 py-1 rounded-lg text-sm md:text-base ${
                  gender === g
                    ? "bg-red-500 text-white"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-gray-600 mb-2">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row md:space-x-4 pt-4 space-y-3 md:space-y-0">
          <button
            type="button"
            onClick={onGoBackClick}
            className="flex-1 py-3 border border-gray-300 rounded-full font-semibold text-gray-700"
          >
            Go back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-red-600 text-white rounded-full font-semibold"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

const SettingsView = ({ onNavigate }) => (
  <div className="flex-1 p-6 md:p-12">
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 md:mb-8">
      <div>
        <h1 className="text-2xl font-bold text-primary inline-block">
          Settings
          <div className="w-20 border-b-2 border-primary mt-1 mx-auto"></div>
        </h1>
      </div>
      <a href="#" className="text-sm font-semibold text-gray-600 mt-2 md:mt-0">
        Reset Settings
      </a>
    </div>

    <div className="space-y-5 md:space-y-6 text-primary font-medium text-sm md:text-base">
      <div className="flex justify-between items-center cursor-pointer hover:text-red-500">
        <span>Get Alerts on whatsapp</span>
        <span>›</span>
      </div>
      <div
        onClick={() => onNavigate("languages")}
        className="flex justify-between items-center cursor-pointer hover:text-red-500"
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
    className={`flex items-center justify-between p-3 md:p-4 border rounded-lg cursor-pointer ${
      selected ? "border-red-500" : "border-gray-300"
    }`}
  >
    <div className="flex items-center">
      <span className="font-bold text-base md:text-lg w-10">{code}</span>
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-xs md:text-sm text-gray-500">{subName}</p>
      </div>
    </div>
    {selected && <span className="text-red-500 font-bold text-lg">✓</span>}
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
    <div className="flex-1 max-w-xl p-6 md:p-12">
      <h1 className="text-2xl font-bold text-primary inline-block pb-4">
        My Languages
        <div className="w-20 border-b-2 border-primary mt-1 mx-auto"></div>
      </h1>

      <div className="relative mb-5 md:mb-6">
        <input
          type="text"
          placeholder="Search Language"
          className="w-full p-2 md:p-3 pl-9 md:pl-10 border border-gray-300 rounded-lg"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
        {languages.map((lang) => (
          <LanguageOption
            key={lang.name}
            {...lang}
            selected={selectedLang === lang.name}
            onClick={() => setSelectedLang(lang.name)}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
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
  const [activeView, setActiveView] = useState("profile");

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
    <div className="bg-gray-50 pb-16">
      <div className="flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-6xl mx-auto mt-6 md:mt-8 rounded-lg shadow-lg border border-gray-200 flex flex-col md:flex-row">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
