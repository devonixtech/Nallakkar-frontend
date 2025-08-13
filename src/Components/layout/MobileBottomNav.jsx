// import { useState } from "react";
// import {
//   FaUser,
//   FaHeart,
//   FaShoppingCart,
//   FaHome,
//   FaSearch,
//   FaList,
// } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";

// export default function MobileBottomNav() {
//   const location = useLocation();
//   const [active, setActive] = useState(location.pathname);

//   // Modal & sheet state
//   const [showCategories, setShowCategories] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);

//   const navItems = [
//     { to: "/MainHome", icon: <FaHome />, label: "Home", type: "link" },
//     {
//       icon: <FaList />,
//       label: "Categories",
//       onClick: () => setShowCategories(true),
//       type: "button",
//     },
//     {
//       icon: <FaSearch />,
//       label: "Search",
//       onClick: () => setShowSearch(true),
//       type: "button",
//     },
//     { to: "/wishlist", icon: <FaHeart />, label: "Wishlist", type: "link" },
//     { to: "/cart", icon: <FaShoppingCart />, label: "Cart", type: "link" },
//     { to: "/profile", icon: <FaUser />, label: "Profile", type: "link" },
//   ];

//   return (
//     <>
//       {/* Bottom Nav */}
//       <div className="fixed bottom-0 left-0 w-full bg-white shadow-t z-50 flex justify-around py-2 border-t border-gray-200 md:hidden">
//         {navItems.map((item) => {
//           const isActive = active === item.to;

//           const content = (
//             <div className="flex flex-col items-center group focus:outline-none">
//               <div
//                 className={`text-xl transition-transform duration-200 group-hover:scale-125 ${
//                   isActive ? "text-rose-500" : "text-gray-500"
//                 }`}
//               >
//                 {item.icon}
//               </div>
//               <span
//                 className={`text-[10px] mt-1 ${
//                   isActive ? "text-rose-500 font-semibold" : "text-gray-500"
//                 }`}
//               >
//                 {item.label}
//               </span>
//             </div>
//           );

//           return item.type === "link" ? (
//             <Link
//               key={item.label}
//               to={item.to}
//               onClick={() => setActive(item.to)}
//               className="flex flex-col items-center"
//             >
//               {content}
//             </Link>
//           ) : (
//             <button
//               key={item.label}
//               onClick={item.onClick}
//               className="flex flex-col items-center"
//             >
//               {content}
//             </button>
//           );
//         })}
//       </div>

//       {/* Categories Bottom Sheet */}
//       {showCategories && (
//         <div className="fixed inset-0 z-50 bg-black/50 flex flex-col justify-end">
//           <div className="bg-white rounded-t-2xl p-4">
//             <div className="flex justify-between items-center border-b pb-2 mb-4">
//               <h2 className="text-lg font-semibold">Categories</h2>
//               <button
//                 className="text-gray-500"
//                 onClick={() => setShowCategories(false)}
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-4 text-center">
//               {["Kids", "Women", "Toys", "Home Decors"].map((cat) => (
//                 <Link
//                   key={cat}
//                   to={`/category/${cat.toLowerCase().replace(" ", "-")}`}
//                   className="p-3 rounded-lg border hover:bg-gray-100"
//                   onClick={() => setShowCategories(false)}
//                 >
//                   {cat}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Search Full-Screen Modal */}
//       {showSearch && (
//         <div className="fixed inset-0 z-50 bg-white flex flex-col">
//           <div className="p-4 border-b flex items-center">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
//               autoFocus
//             />
//             <button
//               className="ml-2 text-gray-500"
//               onClick={() => setShowSearch(false)}
//             >
//               ✕
//             </button>
//           </div>
//           <div className="flex-1 p-4 overflow-y-auto">
//             <p className="text-gray-500 text-center mt-10">
//               Start typing to search products...
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { Home, Heart, ShoppingCart, Search, List, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileBottomNav() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  // Sync active state with route changes
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // Modal & sheet state
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { to: "/MainHome", icon: <Home size={22} />, label: "Home", type: "link" },
    {
      icon: <List size={22} />,
      label: "Categories",
      onClick: () => setShowCategories(true),
      type: "button",
    },
    {
      icon: <Search size={22} />,
      label: "Search",
      onClick: () => setShowSearch(true),
      type: "button",
    },
    {
      to: "/wishlist",
      icon: <Heart size={22} />,
      label: "Wishlist",
      type: "link",
    },
    {
      to: "/cart",
      icon: <ShoppingCart size={22} />,
      label: "Cart",
      type: "link",
    },
    {
      to: "/profile",
      icon: <User size={22} />,
      label: "Profile",
      type: "link",
    },
  ];

  return (
    <>
      {/* Bottom Nav with Horizontal Scroll */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-t z-50 border-t border-gray-200 md:hidden overflow-x-auto">
        <div className="flex gap-14 px-4 py-2 min-w-max">
          {navItems.map((item) => {
            const isActive = active === item.to;

            const content = (
              <div className="flex flex-col items-center focus:outline-none">
                <div
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isActive ? " text-darkpink" : "bg-transparent text-gray-500"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-[10px] mt-1 ${
                    isActive ? "text-darkpink font-semibold" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );

            return item.type === "link" ? (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setActive(item.to)}
                className="flex flex-col items-center"
              >
                {content}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex flex-col items-center"
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Bottom Sheet */}
      {showCategories && (
        <div className="fixed inset-0 z-50 bg-black/50 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Categories</h2>
              <button
                className="text-gray-500"
                onClick={() => setShowCategories(false)}
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              {["Kids", "Women", "Toys", "Home Decors"].map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                  className="p-3 rounded-lg border hover:bg-gray-100"
                  onClick={() => setShowCategories(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Full-Screen Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="p-4 border-b flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
              autoFocus
            />
            <button
              className="ml-2 text-gray-500"
              onClick={() => setShowSearch(false)}
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <p className="text-gray-500 text-center mt-10">
              Start typing to search products...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
