// OtpForm.jsx
import React from "react";

const OtpForm = ({ changeNumber, goToSuccess }) => {
  return (
    <div className="w-full">
      <h2 className="text-[24px] font-poppins font-semibold text-center mb-4 text-primary">
        An OTP has been sent to your registered mobile number
      </h2>

      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary mb-3 placeholder:opacity-[55%]"
      />

      <button
        onClick={goToSuccess}
        className="bg-primary text-[24px] text-white py-2 w-full font-medium hover:opacity-90 transition mb-3"
      >
        Submit
      </button>

      <div className="flex justify-between text-sm">
        <button
          type="button"
          onClick={changeNumber}
          className="underline text-primary text-[16px] font-semibold font-poppins"
        >
          Change Mobile Number
        </button>
        <button
          type="button"
          className="underline text-primary text-[16px] font-semibold font-poppins"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpForm;
