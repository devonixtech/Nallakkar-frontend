 import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../config";
const SignupForm = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ Send as FormData
      const data = new FormData();
      data.append("email", formData.email);
      data.append("mobileNumber", formData.mobileNumber);
      data.append("password", formData.password);

      const res = await axios.post(
        `${BASE_URL}user/signUp`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("Signup successful ✅");
      setFormData({
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });

      // Auto-switch to login after 2s (optional)
      setTimeout(() => {
        switchToLogin();
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-[37px] font-semibold text-center text-primary leading-tight">
        Create an account
      </h2>
      <p className="text-center mb-4 text-[16px] text-primary font-normal leading-tight">
        Please enter your details
      </p>

      {/* Form */}
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2"
        />
<div className="flex items-center w-full rounded-md shadow-md border-l-2 border-r-2 overflow-hidden">
  <span className="px-3 py-2 bg-gray-100 text-gray-600">+91</span>
  <input
    type="text"
    placeholder="Enter mobile number"
    value={formData.mobileNumber.replace("+91", "")} // show only digits in the box
    onChange={(e) =>
      setFormData({
        ...formData,
        mobileNumber: `+91${e.target.value}`, // store with +91
      })
    }
    required
    className="flex-1 p-2 outline-none"
  />
</div>


        <input
          type="password"
          placeholder="Create a Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
          className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2"
        />

        <p className="text-[13px]">
          By continuing you agree to Nallakkar's{" "}
          <span className="text-red-500 cursor-pointer">Terms of Use</span> and{" "}
          <span className="text-red-500 cursor-pointer">Privacy Policy</span>
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-[24px] text-white py-2 hover:bg-rose disabled:opacity-50"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {message && (
        <p className="text-center mt-3 text-sm text-red-500">{message}</p>
      )}

      {/* Social Login */}
      <div className="flex gap-3 mt-4">
        <button className="flex items-center justify-center gap-2 rounded-md border py-2 px-4 flex-1 bg-white shadow-md">
          <FcGoogle size={20} /> Google
        </button>
        <button className="flex items-center justify-center gap-2 rounded-md border py-2 px-4 flex-1 bg-white shadow-md">
          <FaFacebook size={20} className="text-[#1877F2]" /> Facebook
        </button>
      </div>

      <p className="text-center text-[12px] mt-4">
        Already have an account?{" "}
        <button onClick={switchToLogin} className="text-rose cursor-pointer">
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
