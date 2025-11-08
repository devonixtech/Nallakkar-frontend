import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom"; // Use useParams for the ID

// Placeholder data - Single order for details page
const orderDetails = {
  id: 1001,
  orderId: "NAL-2025-500123",
  brand: "Nallakkar",
  productName: "Boy Regular Fit Self Design Light T Shirt (S)",
  image: "https://via.placeholder.com/150/0000FF/808080?text=Product+1", // Placeholder Image
  size: "S",
  quantity: 1,
  unitPrice: 1500.00,
  orderDate: "May 01, 2025",
  currentStatus: "Delivered", // Delivered, In Transit, Cancelled
  statusColor: "text-green-600",
  trackingTimeline: [
    { status: "Ordered", date: "May 01", isCompleted: true },
    { status: "Shipped", date: "May 02", isCompleted: true },
    { status: "Out for Delivery", date: "May 04", isCompleted: true },
    { status: "Delivered", date: "May 04", isCompleted: true },
  ],
  shippingAddress: {
    name: "User Name",
    address: "123, Main Street, Near City Park",
    city: "New Delhi",
    state: "Delhi",
    pin: "110001",
    phone: "+91 9876543210",
  },
  payment: {
    mode: "Online Payment (UPI)",
    subtotal: 1500.00,
    deliveryCharge: 50.00,
    totalAmount: 1550.00,
  },
};

const OrderDetails = () => {
  const { id } = useParams(); // Get ID from URL - for static page, just use the sample data

  // Helper for Order Timeline component
  const OrderTimeline = ({ timeline }) => (
    <div className="flex justify-between items-start my-8 relative">
      <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200 mx-6 sm:mx-12 lg:mx-16"></div>
      {timeline.map((step, index) => (
        <div key={index} className="flex flex-col items-center text-center w-1/4 z-10">
          <div 
            className={`w-6 h-6 rounded-full flex items-center justify-center ${step.isCompleted ? 'bg-green-500' : 'bg-gray-400'}`}
          >
            {step.isCompleted && <span className="text-white text-xs">✓</span>}
          </div>
          <p className="text-xs sm:text-sm font-semibold mt-2 text-gray-800">
            {step.status}
          </p>
          <p className="text-xs text-gray-500 mt-1">{step.date}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Order Details - {orderDetails.orderId} | Nallakkar</title>
      </Helmet>

      <div>
        {/* Banner Section - Similar style to Order History */}
        <div
          className="relative h-40 sm:h-52 bg-[#EDBB81] overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative h-full flex flex-col justify-center items-start p-6 sm:p-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#141A44]">
              Order Details
            </h1>
            <p className="mt-2 text-sm text-[#141A44]">
              <Link to="/" className="hover:underline">Home</Link> | <Link to="/orderHistory" className="hover:underline">Orders</Link> | #{orderDetails.orderId}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 bg-gray-50">
          <div className="space-y-8">
            {/* Order Tracking & Main Info */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#141A44]">
                  Order #{orderDetails.orderId}
                </h2>
                <span className={`text-lg font-bold ${orderDetails.statusColor}`}>
                  {orderDetails.currentStatus}
                </span>
              </div>

              {/* Product Info Card */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b pb-6 mb-6">
                <img
                  src={orderDetails.image}
                  alt={orderDetails.productName}
                  className="w-24 h-24 object-cover rounded-md border border-gray-100 flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">{orderDetails.brand}</p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {orderDetails.productName}
                  </h3>
                  <div className="text-sm text-gray-600 mt-1 space-y-0.5">
                    <p>
                      **Size:** {orderDetails.size} | **Quantity:** {orderDetails.quantity}
                    </p>
                    <p>
                      **Price:** ₹{orderDetails.unitPrice.toFixed(2)} | **Order Date:** {orderDetails.orderDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Tracking Timeline */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Order Tracking
              </h3>
              <OrderTimeline timeline={orderDetails.trackingTimeline} />
            </div>

            {/* Shipping & Payment Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-[#141A44] mb-4 border-b pb-2">
                  Shipping Address
                </h3>
                <p className="font-semibold text-gray-800">
                  {orderDetails.shippingAddress.name}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {orderDetails.shippingAddress.address}
                </p>
                <p className="text-gray-600 text-sm">
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pin}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  **Phone:** {orderDetails.shippingAddress.phone}
                </p>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-[#141A44] mb-4 border-b pb-2">
                  Payment Details
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Payment Mode:</span>
                    <span className="font-medium">{orderDetails.payment.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{orderDetails.payment.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span>₹{orderDetails.payment.deliveryCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold text-base text-gray-800">
                    <span>Total Amount:</span>
                    <span>₹{orderDetails.payment.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons and Support Note */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                {/* Cancel Order Button */}
                {orderDetails.currentStatus !== 'Delivered' && orderDetails.currentStatus !== 'Cancelled' && (
                    <button className="w-full sm:w-auto px-6 py-2 border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition duration-150">
                        Cancel Order
                    </button>
                )}
                
                {/* Rate Product Button */}
                {orderDetails.currentStatus === 'Delivered' && (
                    <Link to={`/writeReview`} className="w-full sm:w-auto px-6 py-2 bg-[#141A44] text-white font-semibold rounded-lg text-center hover:bg-opacity-90 transition duration-150">
                        ⭐ Rate Product
                    </Link>
                )}

                <p className="text-sm text-gray-500 sm:ml-auto flex items-center">
                    Need help? <Link to="/support" className="text-blue-600 ml-1 hover:underline">Contact Support.</Link>
                </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OrderDetails;