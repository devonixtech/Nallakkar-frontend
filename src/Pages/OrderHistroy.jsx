import React from "react";
import { Helmet } from "react-helmet-async";
import order from "../assets/order.png";
import banner from "../assets/wishlist.png";
import details from "../assets/details2.png";
import details1 from "../assets/details1.png";

// Sample data for orders
const orders = [
  {
    id: 1,
    brand: "Nallakkar",
    productName: "Boy Regular Fit Self Design Light T Shirt (S)",
    image: details, // Replace with your actual image path
    unitPrice: "1500.00",
    status: "Delivered on May 01",
    statusColor: "text-black",
    dotColor: "bg-green-600",
    description: "Your item has been delivered",
  },
  {
    id: 2,
    brand: "Nallakkar",
    productName: "Boy Regular Fit Self Design Light T Shirt (S)",
    image: details1, // Replace with your actual image path
    unitPrice: "1500.00",
    status: "Cancelled, May 01",
    statusColor: "text-red-600",
    dotColor: "bg-red-600",
    description: "This order has been cancelled",
  },
];

const OrderHistory = () => {
  return (
    <>
      <Helmet>
        <title>My orderHistory | Nallakkar</title>
        <meta
          name="description"
          content="Your saved items and favorite picks."
        />
      </Helmet>

      <div>
        {/* Banner Section */}
        <div
          className="relative bg-cover bg-center h-80 bg-[#EDBB81]"
          style={{ backgroundImage: `url(${order})` }} // <-- REPLACE WITH YOUR BANNER IMAGE
        >
          <div className="absolute inset-0 bg-opacity-90"></div>
          <div className="relative h-full flex flex-col justify-center items-start p-8 sm:p-12 lg:p-24">
            <h1 className="text-5xl md:text-6xl font-bold">Order History</h1>
            <p className="mt-2 text-base">Home | Orders</p>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-16 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Orders List */}
            <div className="flex-grow">
              <div className="hidden lg:grid grid-cols-3 gap-4 text-[14px] text-center font-bold pb-2">
                <div className="col-span-1">PRODUCT NAME</div>
                <div className="col-span-1 text-center">UNIT PRICE</div>
                <div className="col-span-1 text-center">STATUS</div>
              </div>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center border-b py-4"
                >
                  {/* Product Info */}
                  <div className="col-span-1 flex items-center gap-4">
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {order.brand}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.productName}
                      </p>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="col-span-1 text-center">
                    <p className="text-gray-800">₹{order.unitPrice}</p>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 text-center">
                    <div className="flex items-center justify-center">
                      <span
                        className={`w-2 h-2 rounded-full ${order.dotColor} mr-2`}
                      ></span>
                      <p className={`font-semibold ${order.statusColor}`}>
                        {order.status}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.description}
                    </p>
                    <a
                      href="#"
                      className="text-xs text-primary font-bold mt-1 inline-block"
                    >
                      ⭐ Rate & Review Product
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Sidebar */}
            <aside className="w-full lg:w-80">
              <div className="bg-white p-6 border rounded-md shadow-md">
                <h3 className="font-bold text-gray-800 mb-4">Price Details</h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Order Status
                  </h4>
                  <label className="flex items-center text-sm text-gray-600 mb-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">On the way</span>
                  </label>
                  <label className="flex items-center text-sm text-gray-600 mb-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Delivered</span>
                  </label>
                  <label className="flex items-center text-sm text-gray-600 mb-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Cancelled</span>
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Returned</span>
                  </label>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Order Time
                  </h4>
                  <label className="flex items-center text-sm text-gray-600 mb-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Last 30 days</span>
                  </label>
                  <label className="flex items-center text-sm text-gray-600 mb-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Last 60 days</span>
                  </label>
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">2025</span>
                  </label>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
};

export default OrderHistory;
