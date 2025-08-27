// import React from "react";
// import { Helmet } from "react-helmet-async";
// import order from "../assets/order.png";
// import details from "../assets/details2.png";
// import details1 from "../assets/details1.png";
// import { Link } from "react-router-dom";

// // Sample data for orders
// const orders = [
//   {
//     id: 1,
//     brand: "Nallakkar",
//     productName: "Boy Regular Fit Self Design Light T Shirt (S)",
//     image: details,
//     unitPrice: "1500.00",
//     status: "Delivered on May 01",
//     statusColor: "text-black",
//     dotColor: "bg-green-600",
//     description: "Your item has been delivered",
//   },
//   {
//     id: 2,
//     brand: "Nallakkar",
//     productName: "Boy Regular Fit Self Design Light T Shirt (S)",
//     image: details1,
//     unitPrice: "1500.00",
//     status: "Cancelled, May 01",
//     statusColor: "text-red-600",
//     dotColor: "bg-red-600",
//     description: "This order has been cancelled",
//   },
// ];

// const OrderHistory = () => {
//   return (
//     <>
//       <Helmet>
//         <title>My orderHistory | Nallakkar</title>
//         <meta
//           name="description"
//           content="Your saved items and favorite picks."
//         />
//       </Helmet>

//       <div>
//         {/* Banner Section */}
//         <div
//           className="relative bg-cover bg-center h-60 sm:h-80 bg-[#EDBB81]"
//           style={{ backgroundImage: `url(${order})` }}
//         >
//           <div className="absolute inset-0 bg-opacity-90"></div>
//           <div className="relative h-full flex flex-col justify-center items-start p-6 sm:p-12 lg:p-24">
//             <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
//               Order History
//             </h1>
//             <p className="mt-2 text-sm sm:text-base">
//               <Link to={'to={"/MainHome"}'}>Home</Link> | Orders
//             </p>
//           </div>
//         </div>

//         {/* Main Content */}
//         <main className="px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8">
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//             {/* Orders List */}
//             <div className="flex-grow overflow-x-auto">
//               <div className="hidden lg:grid grid-cols-3 gap-4 text-[14px] text-center font-bold pb-2">
//                 <div className="col-span-1">PRODUCT NAME</div>
//                 <div className="col-span-1 text-center">UNIT PRICE</div>
//                 <div className="col-span-1 text-center">STATUS</div>
//               </div>

//               {orders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-center border-b py-4"
//                 >
//                   {/* Product Info */}
//                   <div className="col-span-1 flex items-center gap-4">
//                     <img
//                       src={order.image}
//                       alt={order.productName}
//                       className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
//                     />
//                     <div>
//                       <p className="font-semibold text-gray-800 text-sm sm:text-base">
//                         {order.brand}
//                       </p>
//                       <p className="text-xs sm:text-sm text-gray-600">
//                         {order.productName}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Unit Price */}
//                   <div className="col-span-1 text-left sm:text-center">
//                     <p className="text-gray-800 text-sm sm:text-base">
//                       ₹{order.unitPrice}
//                     </p>
//                   </div>

//                   {/* Status */}
//                   <div className="col-span-1 text-left sm:text-center mt-2 sm:mt-0">
//                     <div className="flex items-center sm:justify-center">
//                       <span
//                         className={`w-2 h-2 rounded-full ${order.dotColor} mr-2`}
//                       ></span>
//                       <p
//                         className={`font-semibold text-sm sm:text-base ${order.statusColor}`}
//                       >
//                         {order.status}
//                       </p>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {order.description}
//                     </p>
//                     <Link
//                       to={"/WriteReview"}
//                       className="text-xs text-primary font-bold mt-1 inline-block"
//                     >
//                       ⭐ Rate & Review Product
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Filters Sidebar */}
//             <aside className="w-full lg:w-80 flex-shrink-0 mb-16 lg:mb-0">
//               <div className="bg-white p-4 sm:p-6 border rounded-md shadow-md">
//                 <h3 className="font-bold text-gray-800 mb-4 text-base sm:text-lg">
//                   Price Details
//                 </h3>

//                 <div className="mb-6">
//                   <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
//                     Order Status
//                   </h4>
//                   {["On the way", "Delivered", "Cancelled", "Returned"].map(
//                     (label, idx) => (
//                       <label
//                         key={idx}
//                         className="flex items-center text-xs sm:text-sm text-gray-600 mb-2"
//                       >
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-blue-600"
//                         />
//                         <span className="ml-2">{label}</span>
//                       </label>
//                     )
//                   )}
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
//                     Order Time
//                   </h4>
//                   {["Last 30 days", "Last 60 days", "2025"].map(
//                     (label, idx) => (
//                       <label
//                         key={idx}
//                         className="flex items-center text-xs sm:text-sm text-gray-600 mb-2"
//                       >
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-4 w-4 text-blue-600"
//                         />
//                         <span className="ml-2">{label}</span>
//                       </label>
//                     )
//                   )}
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default OrderHistory;

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import order from "../assets/order.png";
import details from "../assets/details2.png";
import details1 from "../assets/details1.png";
import { Link } from "react-router-dom";

// Sample data for orders
const orders = [
  {
    id: 1,
    brand: "Nallakkar",
    productName: "Boy Regular Fit Self Design Light T Shirt (S)",
    image: details,
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
    image: details1,
    unitPrice: "1500.00",
    status: "Cancelled, May 01",
    statusColor: "text-red-600",
    dotColor: "bg-red-600",
    description: "This order has been cancelled",
  },
];

const OrderHistory = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
        <main className="px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8">
          {/* Mobile Filter Button */}
          <div className="flex justify-end mb-4 lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="px-4 py-2 bg-[#141A44] text-white rounded-md"
            >
              Filters
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-20 lg:pb-0">
            {/* Orders List */}
            <div className="flex-grow overflow-x-auto">
              <div className="hidden lg:grid grid-cols-3 gap-4 text-[14px] text-center font-bold pb-2">
                <div className="col-span-1">PRODUCT NAME</div>
                <div className="col-span-1 text-center">UNIT PRICE</div>
                <div className="col-span-1 text-center">STATUS</div>
              </div>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-center border-b pt-4 pb-4"
                >
                  {/* Product Info */}
                  <div className="col-span-1 flex items-center gap-4">
                    <img
                      src={order.image}
                      alt={order.productName}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {order.brand}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {order.productName}
                      </p>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="col-span-1 text-left sm:text-center">
                    <p className="text-gray-800 text-sm sm:text-base">
                      ₹{order.unitPrice}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 text-left sm:text-center mt-2 sm:mt-0">
                    <div className="flex items-center sm:justify-center">
                      <span
                        className={`w-2 h-2 rounded-full ${order.dotColor} mr-2`}
                      ></span>
                      <p
                        className={`font-semibold text-sm sm:text-base ${order.statusColor}`}
                      >
                        {order.status}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.description}
                    </p>
                    <Link
                      to={"/WriteReview"}
                      className="text-xs text-primary font-bold mt-1 inline-block"
                    >
                      ⭐ Rate & Review Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Sidebar (Desktop) */}
            <aside className="hidden lg:block w-full lg:w-80 flex-shrink-0 mb-16 lg:mb-0">
              <div className="bg-white p-4 sm:p-6 border rounded-md shadow-md">
                <h3 className="font-bold text-gray-800 mb-4 text-base sm:text-lg">
                  Price Details
                </h3>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
                    Order Status
                  </h4>
                  {["On the way", "Delivered", "Cancelled", "Returned"].map(
                    (label, idx) => (
                      <label
                        key={idx}
                        className="flex items-center text-xs sm:text-sm text-gray-600 mb-2"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">{label}</span>
                      </label>
                    )
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
                    Order Time
                  </h4>
                  {["Last 30 days", "Last 60 days", "2025"].map(
                    (label, idx) => (
                      <label
                        key={idx}
                        className="flex items-center text-xs sm:text-sm text-gray-600 mb-2"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="relative bg-white w-72 max-w-full h-full shadow-lg p-6 z-50 animate-slideIn">
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setIsFilterOpen(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-gray-800 mb-4 text-base sm:text-lg">
              Price Details
            </h3>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
                Order Status
              </h4>
              {["On the way", "Delivered", "Cancelled", "Returned"].map(
                (label, idx) => (
                  <label
                    key={idx}
                    className="flex items-center text-xs sm:text-sm text-gray-600 mb-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{label}</span>
                  </label>
                )
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3 text-sm sm:text-base">
                Order Time
              </h4>
              {["Last 30 days", "Last 60 days", "2025"].map((label, idx) => (
                <label
                  key={idx}
                  className="flex items-center text-xs sm:text-sm text-gray-600 mb-2"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
