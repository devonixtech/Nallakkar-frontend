import React, { useEffect } from "react";
import { fetchUserById } from "../../Redux/slices/userSlice";
import { useDispatch , useSelector} from "react-redux";
const MainProfile = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
   useEffect(() => {
     if (2) {
       dispatch(fetchUserById(2));
     }
   }, [dispatch, userId]);
   const userData = useSelector((state) => state?.user?.userData);
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
          <h3 className="font-semibold">Ankitha1</h3>
          <p className="text-gray-500">+91 63********7</p>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
