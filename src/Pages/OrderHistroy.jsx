import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import order from "../assets/order.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByUserId } from "../Redux/slices/ordersSlice";
// const orders = [
//   {
//     id: 1001,
//     brand: "Nallakkar",
//     productName: "Boy Regular Fit Self Design Light T Shirt (S)",
//     image: "https://via.placeholder.com/150/0000FF/808080?text=Product+1",
//     unitPrice: "1500.00",
//     orderDate: "2025-05-01",
//     status: "Delivered",
//     statusColor: "text-green-600",
//     dotColor: "bg-green-600",
//     description: "Your item has been delivered",
//   },
//   {
//     id: 1002,
//     brand: "Nallakkar",
//     productName: "Women Casual Solid Straight Kurta (M)",
//     image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Product+2",
//     unitPrice: "2499.00",
//     orderDate: "2025-10-25",
//     status: "On the way",
//     statusColor: "text-blue-600",
//     dotColor: "bg-blue-600",
//     description: "Estimated delivery: Nov 10",
//   },
//   {
//     id: 1003,
//     brand: "Nallakkar",
//     productName: "Home Decor Geometric Pattern Cushion Cover",
//     image: "https://via.placeholder.com/150/808080/FFFFFF?text=Product+3",
//     unitPrice: "899.00",
//     orderDate: "2025-05-01",
//     status: "Cancelled",
//     statusColor: "text-red-600",
//     dotColor: "bg-red-600",
//     description: "This order has been cancelled",
//   },
// ];

// ✅ Extracted out component to avoid hook issues
const OrderFilters = () => (
  <div className="bg-white p-4 sm:p-6 border border-gray-100 rounded-lg shadow-sm">
    <h3 className="font-bold text-gray-800 mb-4 text-lg">Price Details</h3>

    <div className="mb-6">
      <h4 className="font-semibold text-gray-700 mb-3 text-base">
        Order Status
      </h4>
      {["On the way", "Delivered", "Cancelled", "Returned"].map((label, idx) => (
        <label
          key={idx}
          className="flex items-center text-sm text-gray-600 mb-2 cursor-pointer"
        >
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-[#141A44] rounded"
          />
          <span className="ml-2">{label}</span>
        </label>
      ))}
    </div>

    <div>
      <h4 className="font-semibold text-gray-700 mb-3 text-base">Order Time</h4>
      {["Last 30 days", "Last 60 days", "This Year"].map((label, idx) => (
        <label
          key={idx}
          className="flex items-center text-sm text-gray-600 mb-2 cursor-pointer"
        >
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-[#141A44] rounded"
          />
          <span className="ml-2">{label}</span>
        </label>
      ))}
    </div>
  </div>
);

const OrderHistory = () => {
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isFilterOpen = false;
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      dispatch(fetchOrdersByUserId(userId));
    }
  }, [dispatch, userId]);

  const orders = useSelector((state) => state?.orders?.orders || []);

  return (
    <>
      <Helmet>
        <title>Order History | Nallakkar</title>
      </Helmet>

      <div>
        {/* Banner Section */}
        <div
          className="relative bg-cover bg-center h-60 sm:h-80 bg-[#EDBB81]"
          style={{ backgroundImage: `url(${order})` }}
        >
          <div className="absolute inset-0 bg-opacity-90"></div>
          <div className="relative h-full flex flex-col justify-center items-start p-6 sm:p-12 lg:p-24">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
              Order History
            </h1>
            <p className="mt-2 text-sm sm:text-base">
              <Link to={"/MainHome"}>Home</Link> | Orders
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 bg-gray-50">
          {/* Mobile Filter Button */}
          <div className="flex justify-end mb-4 lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="px-4 py-2 bg-[#141A44] text-white font-semibold rounded-md shadow-md hover:bg-opacity-90 transition duration-150"
            >
              Filter Orders
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Orders List */}
            <div className="flex-grow space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 hidden lg:block">
                My Orders ({orders.length})
              </h2>

              {/* Table Header (Desktop) */}
              <div className="hidden lg:grid grid-cols-5 gap-4 text-sm font-bold text-gray-500 border-b pb-2 px-4">
                <div className="col-span-2">PRODUCT NAME</div>
                <div className="text-center">PRICE</div>
                <div className="text-center col-span-2">STATUS & DETAILS</div>
              </div>

              {/* Orders */}
              {orders?.map((order) => (
                <Link
                  key={order.id}
                  to={`/OrderDetails/${order?.id}`}
                  className="block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-200 p-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 gap-4 sm:gap-6 items-center">
                    {/* Product Info */}
                    <div className="sm:col-span-2 flex items-center gap-4">
                      <img
                        src=  "https://res.cloudinary.com/dkqcqrrbp/image/upload/v1765119636/categories/giwu5fc3dplz4o5cqops.jpg"
                        alt={order?.productName}
                        className="w-16 h-16 object-cover rounded-md border border-gray-100"
                      />
                      <div>
                        <p className="font-bold text-[#141A44] text-sm">
                          {order?.brand}
                        </p>
                        <p className="text-sm text-gray-700">
                          {order?.productName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Ordered on: {new Date(order?.created_at
).toDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="sm:col-span-1 text-left sm:text-center pt-2 sm:pt-0">
                      <p className="text-lg font-semibold text-gray-800">
                        ₹{order?.order_details?.amount/100}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="sm:col-span-2 text-left sm:text-center mt-2 sm:mt-0">
                      <div className="flex items-center sm:justify-center">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${order?.dotColor} mr-2`}
                        ></span>
                        <p
                          className={`font-bold text-base ${order?.statusColor}`}
                        >
                          {order?.tracking_status}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {order?.description}
                      </p>
                      {order?.status === "Delivered" && (
                        <span className="text-sm text-yellow-600 font-bold mt-1 inline-block hover:text-yellow-700">
                          ⭐ Rate & Review Product
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Filters Sidebar (Desktop) */}
            {/* Uncomment if you want sidebar filters */}
            {/* <aside className="hidden lg:block w-full lg:w-72 xl:w-80 flex-shrink-0">
              <OrderFilters />
            </aside> */}
          </div>
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-64 sm:w-80 bg-gray-50 shadow-2xl p-6 z-50">
            <button
              className="absolute top-4 right-4 text-gray-600 text-xl hover:text-gray-800"
              onClick={() => setIsFilterOpen(false)}
              aria-label="Close filters"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-[#141A44] mb-6">
              Filter Options
            </h2>
            <OrderFilters />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
