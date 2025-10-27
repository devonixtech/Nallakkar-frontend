// OtpForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const OtpForm = ({ changeNumber }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const emailOrMobile = localStorage.getItem("emailOrMobile"); 
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}user/verifyOtp`, {
        emailOrMobile,
        otp,
      });

      alert("OTP Verified Successfully!");
      console.log(response);
      localStorage.setItem("authToken", response.data.data.token);
      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("isLoggedIn", "true");
      // window.dispatchEvent(new Event("storage"));
      navigate("/MainHome");
    } catch (error) {
      console.error(
        "❌ OTP Verification Failed:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[24px] font-poppins font-semibold text-center mb-4 text-primary">
        An OTP has been sent to your registered mobile number
      </h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary mb-3 placeholder:opacity-[55%]"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-primary text-[24px] text-white py-2 w-full font-medium hover:opacity-90 transition mb-3 disabled:opacity-60"
      >
        {loading ? "Verifying..." : "Submit"}
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
