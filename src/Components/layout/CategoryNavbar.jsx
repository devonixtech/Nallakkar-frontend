import { useEffect, useState } from "react";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from "../../Redux/slices/categorySlice";
import { fetchAllSubcategories } from "../../Redux/slices/subcategorySlice";
import { fetchAllProducts } from "../../Redux/slices/productSlice";

// Auth modals
import AuthModal from "../Custom/AuthModal";
import SuccessModal from "../Custom/SuccessModal";
import LoginForm from "../../Pages/LoginForm";
import SignupForm from "../../Pages/SignupForm";
import OtpForm from "../../Pages/OtpForm";
import ChangeNumberForm from "../../Pages/ChangeNumberForm";
import NumberOtp from "../../Pages/NumberOtp";
import NumberVerifiedModal from "../Custom/NumberVerifiedModal";

export default function CategoryNavbar() {
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategoryId") || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Auth & Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authUser = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllSubcategories());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   setIsLoggedIn(loggedIn);
  // }, []);

  const categories = useSelector((state) => state?.ctegory?.categories || []);
  const subcategories = useSelector(
    (state) => state?.subcategory?.subcategories || []
  );
  const products = useSelector((state) => state?.product?.products || []);

  // Search filtering
  const filteredCategories =
    searchQuery.trim() === ""
      ? []
      : categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const filteredSubcategories =
    searchQuery.trim() === ""
      ? []
      : subcategories.filter((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const filteredProducts =
  searchQuery.trim() === ""
    ? []
    : products.filter(
        (prod) =>
          prod.status === 1 && // ✅ only active products
          prod.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const hasResults =
    filteredCategories.length > 0 ||
    filteredSubcategories.length > 0 ||
    filteredProducts.length > 0;

  // Navigation handlers
  const handleCategoryClick = (id) => {
    localStorage.setItem("selectedCategoryId", id);
    setSelectedCategory(id);
    setSearchQuery("");
    setShowSearchDropdown(false);
    navigate("/category/kids" );
    window.dispatchEvent(new Event("storage"));
  };

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const closeSuccessModal = () => {
    setModalType("login");
    setIsModalOpen(false);
  };

  const userName = authUser?.name || null;
  const linkClass = (id) =>
    `${selectedCategory == id ? "text-darkpink font-bold" : ""}`;

  return (
    <>
      <nav className="fixed z-40 font-[Montserrat] bg-white w-full h-[80px] flex items-center justify-between px-4 md:px-[5rem] border-b-2 shadow-md">
        {/* Left Section */}
        <div className="flex items-center space-x-10">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} alt="logo" className="h-14 md:h-16" />
            </Link>
          </div>

          {/* Category Links (always visible) */}
          <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-800">
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
          </div>
        </div>

        {/* Search Section */}
        <div className="hidden lg:flex items-center gap-4 relative">
          <div className="relative group flex items-center border border-gray-300 rounded-full px-4 py-2 w-[200px] lg:w-[320px] bg-white">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-primary font-semibold whitespace-nowrap focus:outline-none"
            >
              All Categories
              <IoIosArrowDown className="text-xs transition-transform duration-200 group-hover:rotate-180" />
            </button>

            <div
              className="absolute left-0 top-[110%] w-56 bg-white border border-gray-200 rounded-xl shadow-2xl
                     opacity-0 scale-95 pointer-events-none
                     group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                     transition-all duration-200 ease-out z-50"
            >
              <ul className="py-2 text-sm text-primary">
                {categories?.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={`/category/kids`}
                      className="block px-4 py-2 hover:bg-rose-50 hover:text-[#EC3557]"
                      onClick={() => handleCategoryClick(cat.id)}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <span className="mx-3 h-5 w-px bg-gray-200" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(e.target.value.length > 0);
              }}
              className="w-full text-sm outline-none text-gray-600 placeholder:text-gray-400 bg-transparent"
            />
            <FaSearch className="text-gray-400 text-sm w-11 ml-2 lg:ml-4" />
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-[3.4rem] left-0 w-[320px] bg-white border border-gray-200 rounded-xl shadow-2xl max-h-[300px] overflow-y-auto z-50">
              {hasResults ? (
                <ul className="py-2 text-sm text-primary">
                  {filteredCategories.length > 0 && (
                    <>
                      <li className="px-4 py-1 text-xs font-bold text-gray-500">
                        Categories
                      </li>
                      {filteredCategories.map((cat) => (
                        <li
                          key={cat.id}
                          onClick={() => handleCategoryClick(cat.id)}
                          className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
                        >
                          {cat.name}
                        </li>
                      ))}
                    </>
                  )}

                  {filteredSubcategories.length > 0 && (
                    <>
                      <li className="px-4 py-1 text-xs font-bold text-gray-500">
                        Subcategories
                      </li>
                      {filteredSubcategories.map((sub) => (
                        <li
                          key={sub.id}
                          onClick={() => handleCategoryClick(sub?.categoryId)}
                          className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
                        >
                          {sub.name}
                        </li>
                      ))}
                    </>
                  )}

                  {filteredProducts.length > 0 && (
                    <>
                      <li className="px-4 py-1 text-xs font-bold text-gray-500">
                        Products
                      </li>
                      {filteredProducts.map((prod) => (
                        <li
                          key={prod.id}
                          onClick={() => handleCategoryClick(prod?.categoryId)}
                          className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
                        >
                          {prod.title}
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              ) : (
                <div className="p-4 text-sm text-gray-500">No items found.</div>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 text-sm">
          {isLoggedIn ? (
            <>
              <span className="text-gray-800 font-medium">
                Hi, {userName || "User"}
              </span>
              <Link to={"/profile"}>
                <FaUser className="text-gray-800 text-lg cursor-pointer" />
              </Link>
              <Link to={"/wishlist"}>
                <FaHeart className="text-gray-800 text-lg cursor-pointer" />
              </Link>
              <Link to={"/cart"}>
                <FaShoppingCart className="text-gray-800 text-lg cursor-pointer" />
              </Link>
            </>
          ) : (
            <button
              onClick={() => openModal("login")}
              className="bg-[#0B1C39] text-white px-4 py-1 hover:bg-[#EC3557] text-sm font-semibold rounded-sm transition-colors"
            >
              LOGIN
            </button>
          )}
        </div>
      </nav>

      {/* Auth Modals */}
      {isModalOpen && modalType !== "success" && modalType !== "verified" && (
        <AuthModal onClose={closeModal}>
          {modalType === "login" && (
            <LoginForm
              switchToSignup={() => setModalType("signup")}
              goToOtp={() => setModalType("otp")}
            />
          )}
          {modalType === "signup" && (
            <SignupForm
              switchToLogin={() => setModalType("login")}
              goToSuccess={() => setModalType("success")}
            />
          )}
          {modalType === "otp" && (
            <OtpForm
              changeNumber={() => setModalType("changeNumber")}
              goToVerified={() => setModalType("verified")}
            />
          )}
          {modalType === "changeNumber" && (
            <ChangeNumberForm
              goToNumberOtp={() => setModalType("otpChangeNumber")}
            />
          )}
          {modalType === "otpChangeNumber" && (
            <NumberOtp getVerified={() => setModalType("verified")} />
          )}
        </AuthModal>
      )}

      {modalType === "success" && <SuccessModal onClose={closeSuccessModal} />}
      {modalType === "verified" && (
        <NumberVerifiedModal onClose={closeSuccessModal} />
      )}
    </>
  );
}
