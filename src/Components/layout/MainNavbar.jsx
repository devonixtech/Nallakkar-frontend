import { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import SuccessModal from "../Custom/SuccessModal";

import AuthModal from "../Custom/AuthModal";
import LoginForm from "../../Pages/LoginForm";
import SignupForm from "../../Pages/SignupForm";
import OtpForm from "../../Pages/OtpForm";
import ChangeNumberForm from "../../Pages/ChangeNumberForm";
import NumberOtp from "../../Pages/NumberOtp";
import NumberVerifiedModal from "../Custom/NumberVerifiedModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("/"); // track clicked/active item

  const location = useLocation();

  // Sync active state with current route
  useEffect(() => {
    setActive(location.pathname || "/");
  }, [location.pathname]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const closeSuccessModal = () => {
    setModalType("login"); // or null if you don't want to open any modal after success
    setIsModalOpen(false);
  };

  // Utility for nav link classes
  const navClass = (path) =>
    `transition-colors duration-200 ${
      active === path ? "text-rose" : "text-primary hover:text-[#EC3557]"
    }`;

  return (
    <>
      <header className="fixed z-40 font-[Montserrat] bg-white w-full h-[80px] flex items-center justify-between px-4 md:px-[5rem] border-b-2 shadow-md">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => setActive("/")}>
            <img src={logo} alt="logo" className="h-14 md:h-16" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((s) => !s)}
            className="p-2 rounded-md active:scale-95 transition-transform"
          >
            {isMenuOpen ? (
              <FaTimes className="text-2xl text-primary" />
            ) : (
              <FaBars className="text-2xl text-primary" />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex text-[15px] font-bold md:gap-6 lg:gap-8 ml-[-2rem] lg:ml-[-11rem]">
          <Link to="/" className={navClass("/")} onClick={() => setActive("/")}>
            Home
          </Link>
          <Link
            to="/about"
            className={navClass("/about")}
            onClick={() => setActive("/about")}
          >
            About Us
          </Link>
          <Link
            to="/ContactSection"
            className={navClass("/ContactSection")}
            onClick={() => setActive("/ContactSection")}
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Right: Categories dropdown + Search + Login */}
        <div className="hidden md:flex items-center gap-4">
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
          <button
            onClick={() => openModal("login")}
            className="bg-[#0B1C39] text-white px-4 py-1 hover:bg-[#EC3557] text-sm font-semibold rounded-sm transition-colors"
          >
            LOGIN
          </button>
        </div>

        {/* Mobile Menu (animated, slightly left aligned) */}
        <div
          className={`md:hidden absolute top-[80px] left-0 w-full origin-top transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 pointer-events-none"
          }`}
        >
          <div className="-ml-1 bg-white border border-gray-100 shadow-xl rounded-lg p-4">
            <nav className="flex flex-col gap-3 text-[15px] font-bold">
              <Link
                to="/"
                className={navClass("/")}
                onClick={() => {
                  setActive("/");
                  setIsMenuOpen(false);
                }}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={navClass("/about")}
                onClick={() => {
                  setActive("/about");
                  setIsMenuOpen(false);
                }}
              >
                About Us
              </Link>
              <Link
                to="/ContactSection"
                className={navClass("/ContactSection")}
                onClick={() => {
                  setActive("/ContactSection");
                  setIsMenuOpen(false);
                }}
              >
                Contact Us
              </Link>

              {/* Mobile Search */}
              {/* <div className="mt-2 flex items-center border border-gray-300 rounded-full px-3 py-2 bg-white">
                <div className="flex items-center gap-1 text-xs text-gray-600 font-semibold whitespace-nowrap">
                  All Categories <IoIosArrowDown className="text-xs" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="ml-2 w-full text-sm outline-none text-gray-600 placeholder:text-gray-400 bg-transparent"
                />
                <FaSearch className="text-gray-400 text-sm ml-2" />
              </div> */}

              {/* Mobile LOGIN button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openModal("login");
                }}
                className="mt-3 bg-[#0B1C39] text-white w-full py-2 font-semibold text-sm active:scale-[0.98] transition-all duration-200 hover:bg-[#EC3557]"
              >
                LOGIN
              </button>
            </nav>
          </div>
        </div>
      </header>

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
            <OtpForm changeNumber={() => setModalType("changeNumber")} />
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

      {/* Success modal rendered separately */}
      {modalType === "success" && <SuccessModal onClose={closeSuccessModal} />}

      {modalType === "verified" && (
        <NumberVerifiedModal onClose={closeSuccessModal}></NumberVerifiedModal>
      )}
    </>
  );
}
