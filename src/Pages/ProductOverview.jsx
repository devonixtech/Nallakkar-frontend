import { useSelector , useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchCartByUserId } from "../Redux/slices/cartSlice"; // ✅ import it

export default function ProductOverview() {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart); // ✅ Get products from Redux
  const userId = 7; // temp userId
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartByUserId(userId)); // ✅ same as ShoppingCart
    }
  }, [dispatch, userId]);

  // Calculate totals
  const totalProductPrice =
    items?.reduce((sum, item) => sum + item.productPrice * item.quantity, 0) ||
    0;
  const orderTotal = totalProductPrice;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 pb-24 lg:pb-6">
      {/* Top Header */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-5 h-5" />
        <h1 className="text-xl sm:text-2xl font-bold">Product Overview</h1>
      </div>

      {/* Product Details Section */}
      <div className="pb-6 pt-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Section → Product List */}
              <div className="md:col-span-2 flex flex-col gap-4 md:pr-6 md:border-r">
                {items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item?.productImage[0]}
                      alt={item?.productName}
                      className="w-28 h-32 sm:w-32 sm:h-36 object-cover rounded-lg shadow"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {item.productName}
                      </h2>
                      <p className="text-sm text-gray-500">Nallakkar</p>

                      {/* Variant if exists */}
                      {item?.variant && (
                        <p className="text-xs text-gray-600 mt-1">
                          {Object.entries(item.variant)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ")}
                        </p>
                      )}

                      <p className="text-sm text-gray-700 mt-2">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-base font-bold text-gray-900 mt-1">
                        ₹{(item.productPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Section → Price Summary */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg h-full flex flex-col">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    Price Details ({items?.length}{" "}
                    {items?.length > 1 ? "items" : "item"})
                  </h3>

                  <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
                    <span>Total Product Price</span>
                    <span>+₹{totalProductPrice.toFixed(2)}</span>
                  </div>

                  <hr className="my-2" />

                  <div className="flex justify-between font-bold text-base sm:text-lg text-gray-900">
                    <span>Order Total</span>
                    <span>₹{orderTotal.toFixed(2)}</span>
                  </div>

                  <Link
                    to={"/SelectAddress"}
                    className="text-md text-rose font-semibold text-end mt-9"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <h3 className="flex items-center gap-2 font-semibold text-base sm:text-lg mb-2">
        <span>📍</span> Delivery Address
      </h3>
      <div className="bg-white border shadow rounded-md p-4 mb-6 text-sm sm:text-base">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <p>
            <span className="font-semibold">Naveena Reddy</span>
            <br />
            403, Aashirvad Nilaya 7th main, 1st cross B, Narayanapura,
            Mahadevapura, Bengaluru, Karnataka - 560048
            <br />
            6300********
          </p>
          <Link
            to={"/SelectAddress"}
            className="text-rose font-medium sm:text-base"
          >
            Change
          </Link>
        </div>
      </div>

      {/* Continue Button */}
      <div className="text-right">
        <Link
          to={"/PaymentPage"}
          className="bg-primary text-white px-6 py-2 hover:bg-rose text-sm sm:text-base"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
