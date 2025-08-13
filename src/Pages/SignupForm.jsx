import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SignupForm = ({ switchToLogin }) => {
  return (
    <div className="w-full">
      {/* Heading */}
      <h2 className="text-[37px] font-semibold text-center text-primary leading-tight">
        Create an account
      </h2>
      <p className="text-center mb-4 text-[16px] text-primary font-normal leading-tight">Please enter your details</p>

      {/* Form */}
      <form className="space-y-2">
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
        />
        <input
          type="text"
          placeholder="Mobile number"
          className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
        />
        <input
          type="password"
          placeholder="Create a Password"
          className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2 focus:outline-none placeholder-primary placeholder:opacity-[55%]"
        />

        {/* Terms */}
        <p className="text-[13px]">
          By continuing you agree to Nallakkar's{" "}
          <span className="text-red-500 cursor-pointer">Terms of Use</span> and{" "}
          <span className="text-red-500 cursor-pointer">Privacy Policy</span>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary text-[24px] text-white py-2 hover:bg-rose"
        >
          Sign Up
        </button>
      </form>

      {/* Social Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex items-center justify-center gap-2 rounded-md border-l-2 border-r-2 py-2 px-4 flex-1 bg-white shadow-md hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
          <FcGoogle size={20} /> Google
        </button>
        <button className="flex items-center justify-center gap-2 rounded-md border-l-2 border-r-2 py-2 px-4 flex-1 bg-white shadow-md hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
          <FaFacebook size={20} className="text-[#1877F2]" /> Facebook
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
