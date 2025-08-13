import React from "react";

export default function ContactCard() {
  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white shadow-md rounded-xl p-6 max-w-4xl w-full">
        {/* Left Text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-2xl font-bold text-gray-900">
            Get in touch with us
          </h2>
          <p className="text-[#17171A] mt-1">
            Have a question about our latest styles or your order?<br />
            <span className="font-semibold">Reach out to us anytime</span> -
            we're here to help you shine!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-[#EF4252] text-white px-6 py-2 rounded-sm font-semibold hover:opacity-90 transition">
            Contact Us
          </button>
          <button className="bg-[#1B1F3B] text-white px-6 py-2 rounded-sm font-semibold hover:opacity-90 transition">
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}
