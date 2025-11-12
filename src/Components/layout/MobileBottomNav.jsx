
import { useState, useEffect } from "react";
import { Home, Heart, ShoppingCart, List, User } from "lucide-react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import AuthModal from "../Custom/AuthModal";
import SuccessModal from "../Custom/SuccessModal";
import LoginForm from "../../Pages/LoginForm";
import SignupForm from "../../Pages/SignupForm";
import OtpForm from "../../Pages/OtpForm";
import ChangeNumberForm from "../../Pages/ChangeNumberForm";
import NumberOtp from "../../Pages/NumberOtp";
import NumberVerifiedModal from "../Custom/NumberVerifiedModal";
import { fetchAllCategories } from "../../Redux/slices/categorySlice";

export default function MobileBottomNav() {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [showCategories, setShowCategories] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // ✅ Auth Modal States (same as CategoryNavbar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      dispatch(fetchAllCategories());
    }, [dispatch]);
  const categories = useSelector((state) => state?.ctegory?.categories || []);
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  const closeSuccessModal = () => {
    setModalType("login");
    setIsModalOpen(false);
  };

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // ✅ Nav items (based on login state)
  const navItems = isLoggedIn
    ? [
        { to: "/", icon: <Home size={22} />, label: "Home", type: "link" },
        {
          icon: <List size={22} />,
          label: "Categories",
          onClick: () => setShowCategories(true),
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
      ]
    : [
        { to: "/", icon: <Home size={22} />, label: "Home", type: "link" },
        {
          icon: <List size={22} />,
          label: "Categories",
          onClick: () => setShowCategories(true),
          type: "button",
        },
        {
          icon: <User size={22} />,
          label: "Login",
          onClick: () => openModal("login"), // ✅ direct modal open
          type: "button",
        },
      ];
        const handleCategoryClick = (id) => {
    localStorage.setItem("selectedCategoryId", id);
    console.log("Selected Category ID set to:", id);
    setShowCategories(false)
    // setSelectedCategory(id);
    // setSearchQuery("");
    // setShowSearchDropdown(false);
    navigate("/category/kids" );
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-t z-50 border-t border-gray-200 md:hidden overflow-x-auto">
        <div className="flex justify-around px-2 py-2">
          {navItems.map((item, i) => {
            const isActive = active === item.to;
            const content = (
              <div className="flex flex-col items-center">
                <div
                  className={`p-2 rounded-full transition-all duration-200 ${
                    isActive ? "text-darkpink" : "text-gray-500"
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

            if (item.type === "link") {
              return (
                <Link
                  key={i}
                  to={item.to}
                  onClick={() => setActive(item.to)}
                  className="flex flex-col items-center"
                >
                  {content}
                </Link>
              );
            }

            if (item.type === "button") {
              return (
                <button
                  key={i}
                  onClick={item.onClick}
                  className="flex flex-col items-center"
                >
                  {content}
                </button>
              );
            }

            return null;
          })}
        </div>
      </div>

      {/* ✅ Categories Bottom Sheet */}
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
              {categories?.map((cat) => (
                <Link
                  key={cat?.id}
                  to={`/category/kids`}
                  className="p-3 rounded-lg border hover:bg-gray-100"
                  onClick={() =>  
                    handleCategoryClick(cat?.id)
                  }
                >
                  {cat?.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Auth Modals (same as CategoryNavbar) */}
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
