import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // <-- no curly braces

import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const LoginForm = ({ switchToSignup, goToOtp }) => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [detectedType, setDetectedType] = useState(""); // "email" | "mobile"
  const [loading, setLoading] = useState(false);

  // Detect email vs mobile
  const handleChange = (value) => {
    setEmailOrMobile(value);

    if (/^\d{10}$/.test(value)) {
      setDetectedType("mobile");
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setDetectedType("email");
    } else {
      setDetectedType("");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) return alert("Google login failed");

      const decoded = jwtDecode(credentialResponse.credential); // <-- note .default
      const { email, name } = decoded;

      const res = await axios.post(`${BASE_URL}user/checkGoogleDetails`, {
        email,
        googleSignIn: true,
      });

      localStorage.setItem("authToken", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("isLoggedIn", "true");

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    alert("Google login failed");
  };

  // Request OTP API
  const handleRequestOtp = async () => {
    if (!detectedType) {
      alert("Enter valid email or 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        emailOrMobile:
          detectedType === "mobile" ? `+91${emailOrMobile}` : emailOrMobile,
      };
      localStorage.setItem("emailOrMobile", payload.emailOrMobile);
      const res = await axios.post(`${BASE_URL}user/requestOtp`, payload);

      console.log("login", res);

      setLoading(false);

      if (res.status === 200) {
        toast.success("OTP sent successfully!");
        goToOtp(payload.emailOrMobile);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div>
      {/* Title */}
      <h2 className="text-[37px] font-bold text-center text-[#1a214c]">
        Welcome Back
      </h2>
      <p className="text-[16px] mb-5 text-center text-primary">
        Please enter your details
      </p>

      {/* Input */}
      <div className="flex mb-2">
        {detectedType === "mobile" && (
          <span className="px-3 py-2 border rounded-l bg-gray-100">+91</span>
        )}
        <input
          type="text"
          placeholder="Enter your Email/Mobile number"
          value={emailOrMobile}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%] ${
            detectedType === "mobile" ? "rounded-r" : "rounded"
          }`}
        />
      </div>

      {/* Terms */}
      <p className="text-[13px] mb-4">
        By continuing you agree to Nallakkar's{" "}
        <span className="text-red-500 cursor-pointer">Terms of Use</span> and{" "}
        <span className="text-red-500 cursor-pointer">Privacy Policy</span>
      </p>

      {/* Request OTP */}
      <button
        onClick={handleRequestOtp}
        disabled={loading || !detectedType}
        className="bg-primary text-white text-[24px] py-2 w-full font-medium hover:opacity-90 transition mb-4 hover:bg-rose disabled:opacity-50"
      >
        {loading ? "Sending OTP..." : "Request OTP"}
      </button>

      {/* OR divider */}
      <div className="flex items-center mb-4 text-primary">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-sm">or Login with</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Social Buttons */}
     
     <div className="w-full">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={handleGoogleError}
    useOneTap={false}
    render={(renderProps) => (
      <button
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
        className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition text-primary font-medium"
      >
        <span className="flex items-center justify-center">
          <FcGoogle size={22} className="mt-[1px]" />
        </span>
        <span className="leading-none">Continue with Google</span>
      </button>
    )}
  />
</div>



       

      {/* Create account */}
      <p className="text-center text-[12px] mt-5">
        New to Nallakkar?{" "}
        <button
          type="button"
          onClick={switchToSignup}
          className="text-red-500 cursor-pointer"
        >
          Create an account
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

// 7693803028
