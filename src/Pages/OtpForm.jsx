// src/components/Auth/OtpForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/slices/authSlice";
import { toast } from "react-toastify";

const OtpForm = ({ changeNumber , goToVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const emailOrMobile = localStorage.getItem("emailOrMobile");

  const dispatch = useDispatch();

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

      const { token, id, name, email, mobile } = response.data.data;

      // ✅ Store user info in Redux + localStorage
    const res =   dispatch(
        login({
          user: { id, name, email, mobile, emailOrMobile },
          token,
        })
      );

      localStorage.setItem("authToken", res?.payload.token);
      localStorage.setItem("user", JSON.stringify( res?.payload.user));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", res?.payload.user.id);
     toast.success("OTP Verified Successfully 🎉");

if (typeof goToVerified === "function") {
  goToVerified();   // ✅ closes modal
}
    } catch (error) {
        console.error("❌ OTP Verification Failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "OTP verification failed!"); // ❌ error toast
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
