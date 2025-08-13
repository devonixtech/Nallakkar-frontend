// src/components/Custom/SuccessModal.jsx
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";

const SuccessModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 z-50 flex items-center justify-center px-4">
      {/* Modal Box */}
      <div className="bg-white max-w-[900px] w-full h-auto md:h-[500px] shadow-lg relative p-8">
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <RxCross2 size={22} />
        </button> */}

        {/* Content Wrapper (flex center vertically) */}
        <div className="h-full flex flex-col items-center justify-center text-center">
          {/* Icon */}
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />

          {/* Heading */}
          <h2 className="text-lg md:text-xl font-semibold text-primary mb-2 max-w-[80%] mx-auto">
            Successfully your account has been created
          </h2>

          {/* Sub text */}
          <p className="text-gray-500 text-sm md:text-base mb-6 max-w-[80%] mx-auto">
            You’re successfully logged in! Your account is now active and ready
            for you to explore.
          </p>

          {/* Okay button */}
          <button
            onClick={onClose}
            className="bg-[#0B1C39] hover:bg-[#EC3557] text-white px-8 py-2 rounded-sm font-medium"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
