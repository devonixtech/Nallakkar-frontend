import { useState } from "react";
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/logo.png"; // Replace with your N logo image
import { Link } from "react-router-dom";

export default function CategoryNavbar() {
  const [category, setCategory] = useState("All Categories");

  return (
    <nav className="fixed z-40 font-[Montserrat] bg-white w-full h-[80px] flex items-center justify-between px-4 md:px-[5rem] border-b-2 shadow-md">
      {/* Left Section */}
      <div className="flex items-center space-x-10">
        {/* Logo */}

        <div className="flex items-center gap-3">
          <Link to="/MainHome">
            <img src={logo} alt="logo" className="h-14 md:h-16" />
          </Link>
        </div>

        {/* Menu Links */}
        <div className="flex space-x-6 text-sm font-semibold text-gray-800">
          <Link to={"/category/kids"} className="hover:text-gray-900">
            Kids
          </Link>
          <Link to="/category/women" className="hover:text-gray-900">
            Women
          </Link>
          <a href="#" className="hover:text-gray-900">
            Toys
          </a>
          <a href="#" className="hover:text-gray-900">
            Home Decors
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center ml-[14rem] gap-4">
        {/* Categories + Search combined */}
        <div className="relative group flex items-center border border-gray-300 rounded-full px-4 py-2 w-[200px] lg:w-[320px] bg-white">
          {/* Desktop-only categories trigger */}
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-primary font-semibold whitespace-nowrap focus:outline-none"
            aria-haspopup="menu"
            aria-expanded="false"
          >
            All Categories
            <IoIosArrowDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
          </button>

          {/* Dropdown menu (desktop only) */}
          <div
            className="absolute left-0 top-[110%] w-56 bg-white border border-gray-200 rounded-xl shadow-2xl
                     opacity-0 scale-95 pointer-events-none
                     group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                     transition-all duration-200 ease-out z-50"
            role="menu"
          >
            <ul className="py-2 text-sm text-primary">
              <li>
                <Link
                  to="/category/kids"
                  className="flex items-center justify-between px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                >
                  Kids <span className="text-[10px] text-rose-400">NEW</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/women"
                  className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  to="/category/toys"
                  className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                >
                  Toys
                </Link>
              </li>
              <li>
                <Link
                  to="/category/accessories"
                  className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/category/home-decor"
                  className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                >
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Divider */}
          <span className="mx-3 h-5 w-px bg-gray-200" />

          {/* Search input */}
          <input
            type="text"
            placeholder="Search for more products..."
            className="w-full text-sm outline-none text-gray-600 placeholder:text-gray-400 bg-transparent"
          />
          <FaSearch className="text-gray-400 text-sm w-11 ml-2 lg:ml-4" />
        </div>

        {/* Desktop LOGIN button */}
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6 text-sm">
        <span className="text-gray-800 font-medium">Hi, Naveena</span>
        <FaUser className="text-gray-800 text-lg cursor-pointer" />
        <FaHeart className="text-gray-800 text-lg cursor-pointer" />
        <FaShoppingCart className="text-gray-800 text-lg cursor-pointer" />
      </div>
    </nav>
  );
}
