import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddressesByUserId } from "../Redux/slices/addressSlice";
import { setSelectedAddress } from "../Redux/slices/addressSlice";


export default function SelectAddress() {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get addresses from Redux
  const addresses = useSelector((state) => state.address.addresses || []);

  // Get user ID from localStorage
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const user_Id = user?.id;

  // Fetch addresses on mount
  useEffect(() => {
    if (user_Id) {
      dispatch(getAddressesByUserId(user_Id));
    }
  }, [dispatch, user_Id]);

  // Function to create formatted address string
  const formatAddress = (addrObj) => {
    if (!addrObj) return "";
    const { house, road, nearby, city, state } = addrObj;
    return `${house}, ${road}${nearby ? `, ${nearby}` : ""}, ${city}, ${state}`;
  };

  // Function to mask phone number
  const maskPhone = (phone) => {
    if (!phone) return "";
    return phone.slice(0, 4) + "********";
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 lg:pb-8 pb-24">
      {/* Header */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 mb-6"
      >
        <FaArrowLeft className="text-lg cursor-pointer" />
        <h2 className="text-xl font-bold">SELECT DELIVERY ADDRESS</h2>
      </div>

      {/* Address List */}
      <div className="space-y-4 border">
        {addresses.length > 0 ? (
          addresses.map((addr, index) => (
            <div
              key={addr.id}
              className={`p-4 shadow-sm relative ${
                selected === index ? "border-rose" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between">
                {/* Radio Button + Name + Phone */}
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    checked={selected === index}
  onChange={() => {
    setSelected(index);
    dispatch(setSelectedAddress(addr)); // Save in Redux + localStorage
  }}                    className="mt-1 bg-rose"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {addr.firstName} {addr.lastName}{" "}
                      <span className="ml-4 text-gray-700">
                        {maskPhone(addr.contactNumber)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatAddress(addr.address)}
                    </p>
                  </div>
                </div>

                {/* Edit button (only for selected) */}
                {selected === index && (
                  <Link
                    to={"/AddDeliveryAddress"}
                    className="text-rose font-semibold"
                  >
                    Edit
                  </Link>
                )}
              </div>

              {/* Deliver Here Button (only for selected address) */}
              {selected === index && (
                <Link
                  to={"/ProductOverview"}
                  className="inline-block mt-4 bg-primary hover:bg-rose text-white px-4 py-2"
                >
                  Deliver Here
                </Link>
              )}
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-600">No addresses found. Please add one.</p>
        )}
      </div>

      {/* Add new address */}
      <div className="mt-8">
        <Link
          to={"/AddDeliveryAddress"}
          className="w-[50%] bg-primary hover:bg-rose text-white py-3 px-3 shadow-md"
        >
          ADD DELIVERY ADDRESS
        </Link>
      </div>
    </div>
  );
}
