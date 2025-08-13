import React, { useEffect } from "react";
import shopping from "../../assets/shopping.png";
import logo from "../../assets/whitelogo.png";
// Facebook icon (blue)
import { RxCross2 } from "react-icons/rx"; // Close icon

const AuthModal = ({ children, onClose }) => {
  useEffect(() => {
    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Restore scroll when modal closes/unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 z-50 flex items-center justify-center px-4">
      {/* Outer Card */}
      <div className="relative flex w-full max-w-[900px] bg-white overflow-hidden shadow-lg h-auto md:h-[500px]">
        {/* Left Side (Image with Padding & Rounded Corners) */}
        <div className="hidden md:flex flex-[2.3] bg-white items-center justify-center p-4">
          <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={shopping}
              alt="Auth visual"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <img src={logo} alt="Logo" className="w-24" />
            </div>
          </div>
        </div>

        {/* Right Side (Form Area) */}
        <div className="w-full md:flex-[2.7] p-6 md:p-8 relative flex flex-col justify-center">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            <RxCross2 size={22} />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
