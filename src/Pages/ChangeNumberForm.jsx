// ChangeNumberForm.jsx
import React, { useState } from "react";

const ChangeNumberForm = ({ goToNumberOtp }) => {
  const [phone, setPhone] = useState("");

  const handleNumberClick = (num) => {
    if (phone.length < 10) {
      setPhone((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    setPhone((prev) => prev.slice(0, -1));
  };

  return (
    <div className="w-full">
      <h2 className="text-[24px] font-poppins font-semibold text-center mb-4 text-primary">
        Change Mobile Number
      </h2>

      <input
        type="text"
        value={phone}
        readOnly
        placeholder="Phone Number"
        className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary mb-3 placeholder:opacity-[55%]"
      />
      <p className="text-[15px] text-primary font-normal opacity-[55%] mb-4">
        Current Phone Number: 6360******
      </p>

      <button
        className="bg-primary text-[16px] text-white py-2 w-full font-medium hover:bg-rose transition mb-4"
        onClick={goToNumberOtp}
        disabled={phone.length !== 10}
      >
        Generate OTP
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
            className="bg-white border-l-2 border-r-2 rounded-md shadow-md h-12 flex items-center justify-center text-lg font-semibold hover:bg-gray-100"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChangeNumberForm;
