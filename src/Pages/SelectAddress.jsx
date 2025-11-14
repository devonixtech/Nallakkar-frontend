 import { useEffect, useState } from "react";
import { FaArrowLeft,FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddressesByUserId, deleteAddress} from "../Redux/slices/addressSlice";
import { setItem } from "../utils/localForageService";

export default function SelectAddress() {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user ID from localStorage
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const user_Id = user?.id;

  // Get addresses from Redux
  const addresses = useSelector((state) => state.address.addresses || []);

  // Fetch addresses on mount
  useEffect(() => {
    if (user_Id) {
      dispatch(getAddressesByUserId(user_Id));
    }
  }, [dispatch, user_Id]);
useEffect(() => {
  if (addresses.length > 0) {
    const firstAddress = addresses[0];
    setSelected(0);

    // Save first address automatically
    setItem("selectedAddress", firstAddress);

    // // Optional: also store in Redux
    // dispatch(setSelectedAddress(firstAddress));
  }
}, [addresses]);


  // Function to mask phone number
  // const maskPhone = (phone) => {
  //   if (!phone) return "";
  //   return phone.slice(0, 4) + "********";
  // };
   // 🗑️ Handle delete address
  const handleDelete = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      await dispatch(deleteAddress(addressId));
      dispatch(getAddressesByUserId(user_Id)); // Refresh list after delete
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 lg:pb-8 pb-24">
      {/* Header */}
      <div onClick={() => navigate(-1)} className="flex items-center gap-3 mb-6">
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
                      // dispatch(setSelectedAddress(addr)); // Save in Redux + localStorage
                    }}
                    className="mt-1 bg-rose"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {addr.firstName} {addr.lastName}{" "}
                      <span className="ml-4 text-gray-700">
                        {addr.contactNumber}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {addr?.address?.house || ""}, {addr?.address?.road || ""},{" "}
                      {addr?.address?.nearby || ""}, {addr?.address?.city || ""},{" "}
                      {addr?.address?.state || ""}
                    </p>
                  </div>
                </div>
<div className="">
 {/* Edit button (only for selected) */}
                {selected === index && (
                  <Link to={"/AddDeliveryAddress"} className="text-rose font-semibold me-3">
                    Edit
                  </Link>
                )}
                <button
                    onClick={() => handleDelete(addr.id || addr._id)}
                    className="text-gray-500 hover:text-red-600"
                    title="Delete address"
                  >
                    <FaTrashAlt />
                  </button>
</div>
               
              </div>

              {/* Deliver Here Button (only for selected address) */}
              {selected === index && (
                <button
                  to={"/ProductOverview"}
                  className="inline-block mt-4 bg-primary hover:bg-rose text-white px-4 py-2"
                  onClick={() => {
                       setItem("selectedAddress", addr);
  
                    navigate("/ProductOverview")}}
                >
                  Deliver Here
                </button>
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
