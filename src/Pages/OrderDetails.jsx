import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByOrderId } from "../Redux/slices/ordersSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state?.orders?.orderData || null);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderByOrderId(id));
    }
  }, [dispatch, id]);

  if (!orderDetails) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading order details...
      </div>
    );
  }

  const orderInfo = orderDetails.order_details;
  const items = orderInfo?.order_items || [];

  return (
    <>
      <Helmet>
        <title>Order Details - {orderDetails?.order_id} | Nallakkar</title>
      </Helmet>

      <div>
        {/* Banner Section */}
        <div className="relative h-40 sm:h-52 bg-[#EDBB81] overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative h-full flex flex-col justify-center items-start p-6 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#141A44]">
              Order Details
            </h1>
            <p className="mt-2 text-sm text-[#141A44]">
              <Link to="/" className="hover:underline">Home</Link> |{" "}
              <Link to="/orderHistory" className="hover:underline">Orders</Link> | #{orderDetails?.order_id}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
          <div className="space-y-8">
            {/* Order Info */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#141A44]">
                  Order #{orderDetails?.order_id}
                </h2>
                <span className="text-lg font-semibold text-gray-600">
                  {orderDetails?.tracking_status}
                </span>
              </div>

              {/* 🛍️ Multiple Products Section */}
              <div className="space-y-6">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b pb-6"
                  >
                    {/* Placeholder product image */}
                    <img
                      src={`https://via.placeholder.com/150?text=${encodeURIComponent(item.name)}`}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md border border-gray-100"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        SKU: {item.sku}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Units: {item.units}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Price: ₹{item.selling_price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 📦 Shipping & Payment Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-[#141A44] mb-4 border-b pb-2">
                  Shipping Address
                </h3>
                <p className="font-semibold text-gray-800">
                  {orderInfo?.shipping_first_name} {orderInfo?.shipping_last_name}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {orderInfo?.shipping_address}
                </p>
                <p className="text-gray-600 text-sm">
                  {orderInfo?.shipping_city}, {orderInfo?.shipping_state} - {orderInfo?.shipping_pincode}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Phone:</strong> {orderInfo?.shipping_phone}
                </p>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-[#141A44] mb-4 border-b pb-2">
                  Payment Details
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  {/* <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{orderInfo?.sub_total?.toFixed(2)}</span>
                  </div> */}
                  <div className="flex justify-between">
                    <span>Shipping Charge:</span>
                    <span>0.00</span>
                    {/* <span>₹{orderInfo?.shipping_charges?.toFixed(2)}</span> */}
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold text-base text-gray-800">
                    <span>Total Amount:</span>
                    <span>₹{orderDetails?.total_amount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
              {orderDetails?.tracking_status !== "Delivered" && orderDetails?.tracking_status !== "Cancelled" && (
                <button className="w-full sm:w-auto px-6 py-2 border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition duration-150">
                  Cancel Order
                </button>
              )}

              {orderDetails?.tracking_status === "Delivered" && (
                <Link
                  to={`/writeReview`}
                  className="w-full sm:w-auto px-6 py-2 bg-[#141A44] text-white font-semibold rounded-lg text-center hover:bg-opacity-90 transition duration-150"
                >
                  ⭐ Rate Products
                </Link>
              )}

              <p className="text-sm text-gray-500 sm:ml-auto flex items-center">
                Need help?{" "}
                <Link to="/support" className="text-blue-600 ml-1 hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OrderDetails;
