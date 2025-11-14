import { ArrowLeft, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddressesByUserId, updateAddress} from "../Redux/slices/addressSlice";
import api from "../utils/api";
import FetchingLocation from "./FetchingLocation";

export default function EditDeliveryAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const user_Id = user.id;

  const addresses = useSelector((state) => state.address.addresses);

  const [loading, setLoading] = useState(false);

  // Local form state
  const [formData, setFormData] = useState({
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

  // 👉 Load address details into form
  useEffect(() => {
    const found = addresses.find((a) => (a.id || a._id) == id);
    if (found) {
      setFormData({
        firstName: found.firstName,
        lastName: found.lastName,
        contactNumber: found.contactNumber,
        house: found.address.house,
        road: found.address.road,
        pincode: found.address.pincode,
        city: found.address.city,
        state: found.address.state,
        nearby: found.address.nearby,
      });
    }
  }, [id, addresses]);

  // 🌍 Auto detect location (same logic as AddDeliveryAddress)
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
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          if (data && data.address) {
            const addr = data.address;
            setFormData((prev) => ({
              ...prev,
              road: addr.road || addr.neighbourhood || "",
              city: addr.city || addr.town || "",
              state: addr.state || "",
              pincode: addr.postcode || "",
              nearby: addr.suburb || "",
            }));
            alert("📍 Location auto-filled!");
          }
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
      },
      () => {
        alert("Unable to fetch your location.");
        setLoading(false);
      }
    );
  };

  // 📝 Update address
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      id: id,
      userId: user_Id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      address: {
        house: formData.house,
        road: formData.road,
        pincode: formData.pincode,
        city: formData.city,
        state: formData.state,
        nearby: formData.nearby,
      },
    };

    try {
      dispatch(updateAddress({ id,  updatedData }));

      alert("Address updated successfully!");

      // refresh address list
      dispatch(getAddressesByUserId(user_Id));

      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("Failed to update address");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-20 lg:pb-6">
      <div onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6">
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
        <h1 className="text-xl font-semibold">EDIT ADDRESS</h1>
      </div>

      <div className="bg-white rounded-xl border shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-gray-600">🕒</span> Contact Details
          </h2>

          <button
            onClick={handleUseCurrentLocation}
            className="flex items-center gap-2 bg-primary text-white text-sm px-3 py-1 hover:bg-rose transition"
          >
            <MapPin className="w-4 h-4" /> Use Current Location
          </button>
        </div>

        {/* FORM FIELDS — SAME AS ADD ADDRESS */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="rounded-md p-2 border shadow-md"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="rounded-md p-2 border shadow-md"
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            className="rounded-md p-2 border shadow-md"
          />
        </div>

        <h2 className="text-lg font-semibold mb-3">Address</h2>

        <div className="grid grid-cols-1 gap-3 mb-6">
          <input
            type="text"
            placeholder="House"
            value={formData.house}
            onChange={(e) => setFormData({ ...formData, house: e.target.value })}
            className="rounded-md p-2 border shadow-md"
          />

          <input
            type="text"
            placeholder="Road"
            value={formData.road}
            onChange={(e) => setFormData({ ...formData, road: e.target.value })}
            className="rounded-md p-2 border shadow-md"
          />

          <input
            type="text"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            className="rounded-md p-2 border shadow-md"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="rounded-md p-2 border shadow-md"
            />

            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="rounded-md p-2 border shadow-md"
            />
          </div>

          <input
            type="text"
            placeholder="Nearby"
            value={formData.nearby}
            onChange={(e) => setFormData({ ...formData, nearby: e.target.value })}
            className="rounded-md p-2 border shadow-md"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-primary text-white py-3 text-center font-medium hover:bg-rose transition"
        >
          UPDATE ADDRESS
        </button>

        {loading && <FetchingLocation />}
      </div>
    </div>
  );
}
