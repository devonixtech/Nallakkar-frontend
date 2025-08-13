import React from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon (colorful)
import { FaFacebook } from "react-icons/fa";

const LoginForm = ({ switchToSignup, goToOtp }) => {
  return (
    <div>
      {/* Title */}
      <h2 className="text-[37px] font-bold text-center text-[#1a214c]">
        Welcome Back
      </h2>
      <p className="text-[16px] mb-5 text-center text-primary">Please enter your details</p>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter your Email/Mobile number"
        className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
      />

      {/* Terms */}
      <p className="text-[13px] mb-4 mt-2">
        By continuing you agree to Nallakkar's{" "}
        <span className="text-red-500 cursor-pointer">Terms of Use</span> and{" "}
        <span className="text-red-500 cursor-pointer">Privacy Policy</span>
      </p>

      {/* Request OTP */}
      <button
        onClick={goToOtp}
        className="bg-primary text-white text-[24px] py-2 w-full font-medium hover:opacity-90 transition mb-4 hover:bg-rose"
      >
        Request OTP
      </button>

      {/* OR divider */}
      <div className="flex items-center mb-4 text-primary">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-sm">or Login with</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Social Buttons */}
      <div className="flex gap-3">
        <button className="flex items-center justify-center gap-2 rounded-md border-l-2 border-r-2 py-2 px-4 flex-1 bg-white shadow-md hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
          <FcGoogle size={20} /> Google
        </button>
        <button className="flex items-center justify-center gap-2 rounded-md border-l-2 border-r-2 py-2 px-4 flex-1 bg-white shadow-md hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
          <FaFacebook size={20} className="text-[#1877F2]" /> Facebook
        </button>
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
