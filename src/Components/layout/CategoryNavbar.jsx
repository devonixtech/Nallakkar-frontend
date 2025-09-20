import { useEffect, useState } from "react";
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/logo.png"; // Replace with your N logo image
import { Link, useLocation } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { fetchAllCategories } from "../../Redux/slices/categorySlice";
export default function CategoryNavbar() {
  const [category, setCategory] = useState("All Categories");
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategoryId") || null
  );
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
    const categories  = useSelector((state) => state?.ctegory?.categories);
 // ✅ Keep selectedCategory in sync with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setSelectedCategory(localStorage.getItem("selectedCategoryId"));
    };
    window.addEventListener("storage", handleStorageChange);

    // ✅ Also check on mount in case it was updated in same tab
    setSelectedCategory(localStorage.getItem("selectedCategoryId"));

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  console.log("abc",categories);
  // const linkClass = (path) =>
  //   `${location.pathname === path ? "text-darkpink font-bold" : ""}`;
   
 const handleCategoryClick = (id) => {
    localStorage.setItem("selectedCategoryId", id);
    setSelectedCategory(id); // ✅ immediately update state
    window.dispatchEvent(new Event("storage")); // ✅ notify same tab
  };
  const linkClass = (id) =>
    `${selectedCategory == id ? "text-darkpink font-bold" : ""}`;
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
          {/* <Link to="/category/kids" className={linkClass("/category/kids")}>
            Kids
          </Link> */}
            {categories?.map((cat) => (
            <Link
              to="/category/kids"
              key={cat.id}
              className={linkClass(cat.id)}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </Link>
          ))}
          {/* <Link to="/category/women" className={linkClass("/category/women")}>
            Women
          </Link>
          <Link to="/category/toys" className={linkClass("/category/toys")}>
            Toys
          </Link>
          <Link to="/category/home-decors" className={linkClass("/category/home-decors")}>
            Home Decors
          </Link> */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden lg:flex items-center ml-[14rem] gap-4">
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
               {categories?.map((cat) => (
                <li>
            <Link
              to="/category/kids"
              key={cat.id}
                className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </Link> </li>
          ))}
              {/* <li>
                <Link
                  to="/category/kids"
                  className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                >
                  Kids <span className="text-[10px] text-rose-400">NEW</span>
                </Link>
              </li> */}
              {/* <li>
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
                  to="/category/kids"
                  className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/category/home-decors"
                  className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                >
                  Home Decor
                </Link>
              </li> */}
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
        <Link to={"/profile"}>
          {" "}
          <FaUser className="text-gray-800 text-lg cursor-pointer" />
        </Link>

        <Link to={"/wishlist"}>
          <FaHeart className="text-gray-800 text-lg cursor-pointer" />
        </Link>

        <Link to={"/cart"}>
          <FaShoppingCart className="text-gray-800 text-lg cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
}
