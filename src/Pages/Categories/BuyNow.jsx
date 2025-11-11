import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import imgFallback from "../../assets/details2.png";
import {
  setBuyNowItem,
  updateBuyNowQuantity,
  clearBuyNowItem,
} from "../../Redux/slices/buyNowSlice";

const BuyNowPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, variant, quantity } = useSelector(
    (state) => state.buyNow || {}
  );

  const [qty, setQty] = useState(quantity || 1);

  // ✅ Sync Redux quantity
  useEffect(() => {
    setQty(quantity || 1);
  }, [quantity]);

  // ✅ Update quantity in Redux only when qty changes
  useEffect(() => {
    if (product) {
      dispatch(updateBuyNowQuantity(qty));
    }
  }, [qty, dispatch, product]);

  // ✅ Restore from localStorage on refresh (only if Redux has no product)
  useEffect(() => {
    if (!product) {
      const saved = localStorage.getItem("buyNowItem");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch(setBuyNowItem(parsed));
      } else {
        navigate("/");
      }
    }
  }, [product, dispatch, navigate]);

  // ❌ Removed redundant localStorage set effect
  // (Redux slice already handles this properly)

  const handleIncrement = () => setQty((p) => p + 1);
  const handleDecrement = () => setQty((p) => (p > 1 ? p - 1 : 1));

  const handleGoBack = () => navigate(-1);

  const handleClear = () => {
    // ✅ Clear both Redux + localStorage, then navigate
    dispatch(clearBuyNowItem());
    navigate("/");
  };
  console.log("Buy Now Product:", product);
  const image =
    product?.image && product.image.length > 0 ? product.image[0] : imgFallback;
  const title = product?.name || "Unnamed Product";
  const merchant = product?.brand || "Unknown Seller";
  const productCode = product?.productCode || null;

  const basePrice = parseFloat(product?.final_price
 ?? 0);
  const variantPrice = parseFloat(variant?.price ?? basePrice);
  const finalPrice = parseFloat(product?.final_price ?? variantPrice);
  const discount = product?.discount ?? 0;

  const totalProductPrice = variantPrice * qty;
  const orderTotal = totalProductPrice;

  if (!product) return null; // prevent rendering empty state flicker

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          onClick={handleGoBack}
          className="flex items-center gap-3 mb-6 cursor-pointer"
        >
          <FaArrowLeft className="text-lg" />
          <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left Section */}
            <div className="md:col-span-2 flex gap-4 pr-6 border-r">
              <img
                src={image}
                alt={title}
                className="w-40 h-48 object-cover rounded-lg shadow"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

                <p className="text-lg font-bold text-gray-900 mt-1">
                  ₹{variantPrice.toFixed(2)}
                </p>

                {discount > 0 && (
                  <p className="text-sm text-green-600">
                    {discount}% OFF 
                  </p>
                )}

                <p className="text-sm text-gray-500">{merchant}</p>
                {productCode && (
                  <p className="text-sm text-gray-500">
                    Product Code: {productCode}
                  </p>
                )}

                <hr className="my-2" />

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-2">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-700"
                  >
                    Qty :
                  </label>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={handleDecrement}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      id="quantity"
                      value={qty}
                      readOnly
                      className="w-10 text-center border-l border-r"
                    />
                    <button
                      onClick={handleIncrement}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {variant?.size && (
                  <p className="text-sm text-gray-700 mt-2">
                    Size: {variant.size}
                  </p>
                )}

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm font-medium text-green-600">
                    Free Delivery
                  </p>
                  <button
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                    onClick={handleClear}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:col-span-1 text-nowrap">
              <div className="bg-gray-50 p-5 rounded-lg h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Price Details ({qty} {qty > 1 ? "items" : "item"})
                </h3>

                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Total Product Price</span>
                  <span>₹{totalProductPrice.toFixed(2)}</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Order Total</span>
                  <span>₹{orderTotal.toFixed(2)}</span>
                </div>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Clicking on 'Continue' will not deduct any money
                </p>

                <Link
                  to="/SelectAddress"
                  className="block w-full bg-primary text-white py-2 rounded text-center hover:bg-rose transition mt-4"
                >
                  ADD DELIVERY ADDRESS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowPage;
