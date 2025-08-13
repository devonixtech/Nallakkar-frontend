// OtpForm.jsx
import React, { useState } from "react";

const NumberOtp = ({ changeNumber, getVerified }) => {
  const [otp, setOtp] = useState("");

  const handleNumberClick = (num) => {
    if (otp.length < 4) {
      setOtp((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setOtp((prev) => prev.slice(0, -1));
  };

  return (
    <div className="w-full">
      <h2 className="text-[24px] font-poppins font-semibold text-center mb-4 text-primary">
        Enter OTP
      </h2>

      {/* OTP boxes */}
      <div className="flex justify-center gap-10 mb-4">
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            type="text"
            value={otp[i] || ""}
            readOnly
            className="w-14 border-l-2 border-r-2 h-14 rounded-md text-center shadow-md text-lg font-semibold outline-none"
          />
        ))}
      </div>

      <p className="text-[16px] text-gray-500 text-center mb-2">
        Resend OTP in <span className="font-bold text-primary">2:00</span>
      </p>

      <button
        onClick={getVerified}
        className="bg-[#1a214c] text-white text-[16px] py-2 w-full font-medium hover:bg-rose transition mb-3"
      >
        Submit
      </button>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-4 w-full mx-auto border-l-2 p-2 border-r-2 shadow-md">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "←"].map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (item === "←") handleBackspace();
              else if (item !== "") handleNumberClick(item);
            }}
            className="bg-white border-l-2 text-primary border-r-2 rounded-md shadow-md h-12 flex items-center justify-center text-lg font-semibold hover:bg-gray-100"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberOtp;
