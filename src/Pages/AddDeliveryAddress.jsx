import { ArrowLeft, MapPin } from "lucide-react";
import FetchingLocation from "./FetchingLocation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddDeliveryAddress() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUseCurrentLocation = () => {
    setLoading(true);

    // Example: simulate location fetch
    setTimeout(() => {
      setLoading(false);
      alert("Location fetched successfully ✅");
    }, 3000);
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
            placeholder="Name"
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
          <input
            type="text"
            placeholder="Contact Number"
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
        </div>

        {/* Address Section */}
        <h2 className="text-lg font-semibold mb-3">Address</h2>
        <div className="grid grid-cols-1 gap-3 mb-6">
          <input
            type="text"
            placeholder="House no./Building name"
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
          <input
            type="text"
            placeholder="Road name / Area / Colony"
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
          <input
            type="text"
            placeholder="Pincode"
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
            />
            <input
              type="text"
              placeholder="State"
              className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
            />
          </div>
          <input
            type="text"
            placeholder="Nearby Famous Place/Shop/School (optional)"
            className="w-full rounded-md font-semibold p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
          />
        </div>

        {/* Save & Continue Button */}
        <Link
          to={"/ProductOverview"}
          className="block w-full bg-primary text-white text-center py-3 font-medium hover:bg-rose transition"
        >
          SAVE & CONTINUE
        </Link>

        {/* Show Fetching screen conditionally */}
        {loading && <FetchingLocation />}
      </div>
    </div>
  );
}
