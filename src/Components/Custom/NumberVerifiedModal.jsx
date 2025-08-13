// src/components/Custom/NumberVerifiedModal.jsx
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const NumberVerifiedModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-[900px] w-full p-8 h-auto md:h-[500px] shadow-lg relative">
        <div className="h-full flex flex-col items-center justify-center text-center">
          {/* Icon */}
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

          {/* Heading */}
          <h2 className="text-xl font-semibold text-primary mb-2">
            Number Verified
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 text-sm mb-6">
            Your number has been successfully verified. Enjoy secure access to
            your account.
          </p>

          {/* Okay button */}
          <button
            onClick={onClose}
            className="bg-[#1a214c] hover:bg-[#EC3557] text-white px-8 py-2 rounded-sm font-medium"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberVerifiedModal;
