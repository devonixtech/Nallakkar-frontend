 // src/pages/ProductOverview.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchCartByUserId } from "../Redux/slices/cartSlice";
import { setBuyNowItem } from "../Redux/slices/buyNowSlice";
import imgFallback from "../assets/details2.png";
//  import { setSelectedAddress } from "../Redux/slices/addressSlice";
 import { getItem } from "../utils/localForageService";
export default function ProductOverview() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  // Get the user string from localStorage
const userString = localStorage.getItem("user");

// Parse it into an object
const user = JSON.parse(userString);
// console.log("local forge", selectedAddress);
// Access the id
const user_Id = user.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = user_Id; // temp userId

  const cartItems = useSelector((state) => state.cart || []);
  const { product, variant, quantity, isBuyNowActive } = useSelector(
    (state) => state.buyNow || {}
  );
  // ✅ Restore BuyNow item from localStorage (no removal)
  useEffect(() => {
    if (!product) {
      const saved = localStorage.getItem("buyNowItem");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.product) {
          dispatch(
            setBuyNowItem({
              product: parsed.product,
              variant: parsed.variant,
              quantity: parsed.quantity || 1,
            })
          );
        }
      }
    }
  }, [dispatch, product]);

useEffect(() => {
  const fetchAddress = async () => {
    const savedAddress = await getItem("selectedAddress");
    setSelectedAddress(savedAddress); // re-render
  };
  fetchAddress(); // <-- run async function
}, []);

  // ✅ Fetch cart only if BuyNow not active
  useEffect(() => {
    if (!isBuyNowActive && userId) {
      dispatch(fetchCartByUserId(userId));
    }
  }, [dispatch, userId, isBuyNowActive]);

  // ✅ Determine what to display
  const itemsToShow =
    isBuyNowActive && product
      ? (() => {
          const image =
            product?.image && product.image.length > 0
              ? product.image
              : [imgFallback];
          const basePrice = parseFloat(product?.final_price ?? 0);
          const variantPrice = parseFloat(variant?.price ?? basePrice);
          const finalPrice = parseFloat(product?.final_price ?? variantPrice);
          const discount = parseFloat(product?.discount ?? 0);

          const productPrice = finalPrice

          return [
            {
              productName: product?.name || "Unnamed Product",
              productImage: image,
              productPrice,
              quantity: quantity || 1,
              variant: variant || null,
              productCode: product?.productCode || null,
              merchant: product?.brand || "Nallakkar",
              discount,
            },
          ];
        })()
      : cartItems?.items;

  // ✅ Calculate totals
  const totalProductPrice =
    itemsToShow?.reduce(
      (sum, item) => sum + item.itemTotal * (item.quantity || 1),
      0
    ) || 0;

  const orderTotal = cartItems?.totalPrice
;
 console.log("selected address", itemsToShow);
 const getSelectedAddress = () => {
  try {
    const saved = localStorage.getItem("selectedAddress");
    if (!saved) return null;
    const parsed = JSON.parse(saved);

    // Handle cases where Safari stringifies nested objects as strings
    if (typeof parsed.address === "string") {
      parsed.address = JSON.parse(parsed.address);
    }

    return parsed;
  } catch (err) {
    console.error("Failed to parse selectedAddress from localStorage:", err);
    return null;
  }
};

// const selectedAddress = getSelectedAddress();


  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 pb-24 lg:pb-6">
      {/* Header */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="w-5 h-5" />
        <h1 className="text-xl sm:text-2xl font-bold">Product Overview</h1>
      </div>

      {/* Product Section */}
      <div className="pb-6 pt-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-4 sm:p-6 rounded-lg border shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: Product List */}
              <div className="md:col-span-2 flex flex-col gap-4 md:pr-6 md:border-r">
                {itemsToShow.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={item.productImage[0]}
                      alt={item.productName}
                      className="w-28 h-32 sm:w-32 sm:h-36 object-cover rounded-lg shadow"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {item.productName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {item.merchant || "Seller"}
                      </p>

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
                        ₹{item.itemTotal }
                      </p>

                      {item.discount > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          {item.discount}% OFF
                        </p>
                      )}

                      {item.productCode && (
                        <p className="text-sm text-gray-500">
                          Product Code: {item.productCode}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Price Summary */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg h-full flex flex-col">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    Price Details ({itemsToShow.length}{" "}
                    {itemsToShow.length > 1 ? "items" : "item"})
                  </h3>

                  <div className="flex justify-between text-gray-700 mb-2 text-sm sm:text-base">
                    <span>Total Product Price</span>
                    <span>₹{totalProductPrice}</span>
                  </div>

                  <hr className="my-2" />

                  <div className="flex justify-between font-bold text-base sm:text-lg text-gray-900">
                    <span>Order Total</span>
                    <span>₹{totalProductPrice}</span>
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
            <span className="font-semibold"> {`${selectedAddress?.firstName} ${selectedAddress?.lastName}`} </span>
            <br />
         {selectedAddress?.address?.house}  {selectedAddress?.address?.road}  {selectedAddress?.address?.nearby} {selectedAddress?.address?.city}{selectedAddress?.address?.state}
            <br />
            {selectedAddress?.contactNumber}
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
