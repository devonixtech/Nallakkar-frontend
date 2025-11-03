import { ArrowLeft, MapPin } from "lucide-react";
import FetchingLocation from "./FetchingLocation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, getAddressesByUserId } from "../Redux/slices/addressSlice";

import api from "../utils/api"; // ✅ make sure this points to your axios instance (baseURL: http://localhost:5000/api)

export default function AddDeliveryAddress() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    // Get the user string from localStorage
const userString = localStorage.getItem("user");

// Parse it into an object
const user = JSON.parse(userString);

// Access the id
const user_Id = user.id;


  // ✅ Form state
  const [formData, setFormData] = useState({
    userId: user_Id, // you can set this from Redux or localStorage if logged-in
    firstName: "",
    lastName: "",
    contactNumber: "",
    house: "",
    road: "",
    pincode: "",
    city: "",
    state: "",
    nearby: "",
  });

 const handleUseCurrentLocation = async () => {
  setLoading(true);

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    setLoading(false);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        // ✅ Reverse geocode using OpenStreetMap (Nominatim API — free)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        if (data && data.address) {
          const addr = data.address;

          // ✅ Auto-fill detected fields
          setFormData((prev) => ({
            ...prev,
            road:
              addr.road ||
              addr.neighbourhood ||
              addr.suburb ||
              addr.village ||
              "",
            city: addr.city || addr.town || addr.village || "",
            state: addr.state || "",
            pincode: addr.postcode || "",
            nearby: addr.suburb || addr.neighbourhood || "",
          }));

          alert("📍 Location detected and address fields auto-filled!");
        } else {
          alert("Unable to detect your exact address.");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Failed to get location details.");
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      console.error("Geolocation Error:", error);
      alert("Failed to get your location. Please allow location access.");
      setLoading(false);
    }
  );
};


  // ✅ Handle form submit (send data to backend)
const handleSubmit = async (e) => {
  e.preventDefault();

  const addressData = {
    userId: formData.userId || "123",
    firstName: formData.firstName,
    lastName: formData.lastName,
    contactNumber: formData.contactNumber,
    address: JSON.stringify({
      house: formData.house,
      road: formData.road,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
      nearby: formData.nearby,
    }),
  };

  console.log("📦 Sending address to backend:", addressData);

  try {
    // ✅ Create the address
    const createRes = await api.post("/address/createAddress", addressData);
    console.log("✅ Backend Response (createAddress):", createRes.data);

    // ✅ Since backend GET endpoint is unstable, just log locally
    const newlyAddedAddress = {
      id: createRes.data.id,
      ...addressData,
      address: JSON.parse(addressData.address),
    };
    console.log("🆕 Newly added address:", newlyAddedAddress);

    alert("Address added successfully!");
  } catch (error) {
    console.error(
      "❌ Error creating address:",
      error.response?.data || error.message
    );
    alert("Failed to add address. Check console for details.");
  }
};




  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-20 lg:pb-6">
      {/* Header */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        <h1 className="text-xl font-semibold">ADD DELIVERY ADDRESS</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border shadow-md p-6">
        {/* Contact Details */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-gray-600">🕒</span> Contact Details
          </h2>
          <button
            onClick={handleUseCurrentLocation}
            className="flex items-center gap-2 bg-primary text-white text-sm px-3 py-1 hover:bg-rose transition"
          >
            <MapPin className="w-4 h-4" /> Use my Current Location
          </button>
        </div>

        {/* Contact Inputs */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
        </div>

        {/* Address Section */}
        <h2 className="text-lg font-semibold mb-3">Address</h2>
        <div className="grid grid-cols-1 gap-3 mb-6">
          <input
            type="text"
            placeholder="House no./Building name"
            value={formData.house}
            onChange={(e) => setFormData({ ...formData, house: e.target.value })}
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
          <input
            type="text"
            placeholder="Road name / Area / Colony"
            value={formData.road}
            onChange={(e) => setFormData({ ...formData, road: e.target.value })}
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
            />
          </div>
          <input
            type="text"
            placeholder="Nearby Famous Place/Shop/School (optional)"
            value={formData.nearby}
            onChange={(e) => setFormData({ ...formData, nearby: e.target.value })}
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
        </div>

        {/* Save & Continue Button */}
        <button
          onClick={handleSubmit}
          className="block w-full bg-primary text-white text-center py-3 font-medium hover:bg-rose transition"
        >
          SAVE & CONTINUE
        </button>

        {/* Show Fetching screen conditionally */}
        {loading && <FetchingLocation />}
      </div>
    </div>
  );
}
