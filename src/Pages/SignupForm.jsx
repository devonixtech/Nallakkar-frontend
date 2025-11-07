import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useDispatch } from "react-redux";
import { googleSignUp } from "../Redux/slices/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"

const SignupForm = ({ switchToLogin }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Normal form signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const data = new FormData();
      data.append("email", formData.email);
      data.append("mobileNumber", formData.mobileNumber);
      data.append("password", formData.password);

      const res = await axios.post(`${BASE_URL}user/signUp`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
     
      setMessage("Signup successful ✅");
      setFormData({
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });

      // Auto-switch to login after 2s
      setTimeout(() => switchToLogin(), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Signup/Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const userData = {
        name: decoded.name,
        email: decoded.email,
        image: decoded.picture,
      };

      // Option 1: Use Redux thunk (recommended)
    await dispatch(googleSignUp(userData));
      // Option 2: Or direct axios call
      // const res = await axios.post(`${BASE_URL}user/google-signup`, userData);
          localStorage.setItem("authToken", res.payload.data.token);
      localStorage.setItem("user", JSON.stringify(res.payload.data));
      localStorage.setItem("isLoggedIn", "true");

      window.location.href = "/";
      setMessage("Google Signup/Login successful ✅");
      setTimeout(() => switchToLogin(), 2000);
    } catch (err) {
      console.error("Google auth error:", err);
      setMessage("Google Signup failed ❌");
    }
  };

  const handleGoogleError = () => {
    setMessage("Google Sign-In failed ❌");
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
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full rounded-md p-2 shadow-md border-l-2 border-r-2"
        />

        <div className="flex items-center w-full rounded-md shadow-md border-l-2 border-r-2 overflow-hidden">
          <span className="px-3 py-2 bg-gray-100 text-gray-600">+91</span>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={formData.mobileNumber.replace("+91", "")}
            onChange={(e) =>
              setFormData({
                ...formData,
                mobileNumber: `+91${e.target.value}`,
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
      <div className="flex gap-3 mt-4 justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
        />
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
