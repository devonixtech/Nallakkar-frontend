

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderByOrderId, trackOrderByOrderId } from "../Redux/slices/ordersSlice";


// ORDER TIME LINE DETIALS ------------------

const ORDER_TIMELINE = [
  { key: "ORDER_PLACED", label: "Order Placed" },
  { key: "ORDER_DISPATCHED", label: "Order Dispatched" },
  { key: "PICKED_UP", label: "Picked Up" },
  { key: "IN_TRANSIT", label: "In Transit" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
];

// Map backend status → timeline key
const STATUS_TO_TIMELINE_KEY = {
  "Order Placed": "ORDER_PLACED",
  "Order Confirmed": "ORDER_PLACED",
  "Order Dispatched": "ORDER_DISPATCHED",
  "Picked Up": "PICKED_UP",
  "In Transit": "IN_TRANSIT",
  "Out For Delivery": "OUT_FOR_DELIVERY",
  "Delivered": "DELIVERED",
};






// builidng timeline states.. 
const buildTimelineDates = ({ orderDetails, tracking }) => {
  const dates = {};

  // 1️⃣ Order Placed → OUR SYSTEM
  dates.ORDER_PLACED = orderDetails?.created_at || "";

  // 2️⃣ Order Dispatched → OUR SYSTEM (preferred)
  // Use the correct field you have (examples below)
  const hasAWB = Boolean(orderDetails?.awb_code);
  dates.ORDER_DISPATCHED = hasAWB ? orderDetails?.dispatched_at || tracking?.details?.shipment_track?.[0]?.pickup_date || orderDetails?.created_at || "" : "";
  // 3️⃣ Courier events → SHIPROCKET
  const activities = tracking?.details?.shipment_track_activities || [];

  for (const event of activities) {
    const label = event["sr-status-label"];
    const date = event.date;
    if (!date) continue;

    if (label === "PICKED UP" && !dates.PICKED_UP) {
      dates.PICKED_UP = date;
    }

    if (label === "IN TRANSIT" && !dates.IN_TRANSIT) {
      dates.IN_TRANSIT = date;
    }

    if (label === "OUT FOR DELIVERY" && !dates.OUT_FOR_DELIVERY) {
      dates.OUT_FOR_DELIVERY = date;
    }

    if (label === "DELIVERED") {
      dates.DELIVERED = date;
    }
  }

  return dates;
};


// Formating the date to the dd MMM YYYY

const formatTimelineDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date)) return "";

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};


const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state?.orders?.orderData || null);
  const tracking = useSelector((state) => state?.orders?.tracking);

  // Get reviewed products from Redux (localStorage-based)
  const reviewedProducts = useSelector(
    (state) => state?.reviewedProducts?.reviewedProducts[orderDetails?.id]
  );

  // Calculate if all products are reviewed (client-side)
  const totalProducts = orderDetails?.order_details?.order_items?.length || 0;
  const reviewedCount = reviewedProducts?.productIds?.length || 0;
  const allReviewed = totalProducts > 0 && reviewedCount >= totalProducts;


  //GETTING THE ORDERS STATUSES HERE 

  const hasAWB = Boolean(orderDetails?.awb_code);

  const rawStatus = hasAWB ?
    tracking?.display_status ||
    tracking?.status ||
    orderDetails?.tracking_status : "Order Placed";

  const activeTimelineKey =
    STATUS_TO_TIMELINE_KEY[rawStatus] || "ORDER_PLACED";

  const activeIndex = ORDER_TIMELINE.findIndex(
    step => step.key === activeTimelineKey
  );

  const statusDates = buildTimelineDates({
    orderDetails,
    tracking,
  });

  // --------------------------------------


  useEffect(() => {
    if (id) {
      dispatch(fetchOrderByOrderId(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (orderDetails?.order_id) {
      dispatch(trackOrderByOrderId(orderDetails.order_id));
    }
  }, [dispatch, orderDetails?.order_id]);
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
              <div className="flex justify-between flex-col border-b pb-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#141A44]">
                  Order #{orderDetails?.order_id}
                </h2>


                {/* TIMELINE CODE START HERE */}
                <div className="mt-6 overflow-x-auto">
                  <div className="relative min-w-[800px] pb-2">
                    <div className="grid grid-cols-6 items-start">
                      {ORDER_TIMELINE.map((step, index) => {
                        const isCompleted = index < activeIndex;
                        const isActive = index === activeIndex;
                        const isFuture = index > activeIndex;

                        const date =
                          tracking?.status_dates?.[step.key] ||
                          statusDates?.[step.key] ||
                          "";

                        return (
                          <div
                            key={step.key}
                            className="relative flex flex-col items-center text-center"
                          >
                            {/* LEFT CONNECTOR (not for first item) */}
                            {index !== 0 && (
                              <div
                                className={`absolute top-[32px] left-0 w-1/2 h-[1px] ${isCompleted || isActive
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                                  }`}
                              />
                            )}

                            {/* RIGHT CONNECTOR (not for last item) */}
                            {index !== ORDER_TIMELINE.length - 1 && (
                              <div
                                className={`absolute top-[32px] right-0 w-1/2 h-[1px] ${isCompleted
                                  ? "bg-green-500"
                                  : isActive
                                    ? "bg-gray-400"
                                    : "bg-gray-300"
                                  }`}
                              />
                            )}

                            {/* LABEL */}
                            <span
                              className={`text-sm font-medium mb-2 ${isActive
                                ? "text-gray-900"
                                : isCompleted
                                  ? "text-gray-600"
                                  : "text-gray-300"
                                }`}
                            >
                              {step.label}
                            </span>

                            {/* DOT */}
                            <div
                              className={`z-10 w-3.5 h-3.5 rounded-full ${isCompleted
                                ? "bg-green-500"
                                : isActive
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                                }`}
                            />

                            {/* DATE */}
                            <span
                              className={`mt-2 text-xs ${isFuture ? "text-gray-300" : "text-gray-500"
                                }`}
                            >
                              {formatTimelineDate(date)}
                            </span>

                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* TIMELINE CODE END */}





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
                      src={item?.image}
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
                    <span>₹{orderDetails?.total_amount / 100}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
              {tracking?.display_status !== "Delivered" && orderDetails?.tracking_status !== "Cancelled" && (
                <button className="w-full sm:w-auto px-6 py-2 border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition duration-150">
                  Cancel Order
                </button>
              )}

              {tracking?.display_status === "Delivered" && (
                allReviewed ? (
                  <Link
                    to="/"
                    className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-lg text-center hover:bg-green-700 transition duration-150"
                  >
                    🛍️ Shop More
                  </Link>
                ) : (
                  <Link
                    to={`/writeReview/${orderDetails.id}`}
                    className="w-full sm:w-auto px-6 py-2 bg-[#141A44] text-white font-semibold rounded-lg text-center hover:bg-opacity-90 transition duration-150"
                  >
                    ⭐ Rate Products
                  </Link>
                )
              )}

              <p className="text-sm text-gray-500 sm:ml-auto flex items-center">
                Need help?{" "}
                <Link to="/ContactSection" className="text-blue-600 ml-1 hover:underline">
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
