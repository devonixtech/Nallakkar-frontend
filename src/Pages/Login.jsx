 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
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

  // API call using axios
  const handleLogin = async () => {
    try {
      setLoading(true);

      let payload = {};
      if (detectedType === "mobile") {
        payload.emailOrMobile = `+91${emailOrMobile}`;
      } else {
        payload.emailOrMobile = emailOrMobile;
      }

      const res = await axios.post(
        "https://nallkarbackend-production.up.railway.app/api/user/requestOtp",
        payload
      );

      setLoading(false);

      if (res.status === 200) {
        alert("OTP sent successfully!");
        navigate("/verify-otp", {
          state: { emailOrMobile: payload.emailOrMobile },
        });
      }
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | E-Commerce</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Email or Mobile
              </label>
              <div className="flex">
                {detectedType === "mobile" && (
                  <span className="px-3 py-2 border rounded-l bg-gray-100">
                    +91
                  </span>
                )}
                <input
                  type="text"
                  placeholder="Enter email or mobile"
                  value={emailOrMobile}
                  onChange={(e) => handleChange(e.target.value)}
                  className={`w-full px-4 py-2 border ${
                    detectedType === "mobile" ? "rounded-r" : "rounded"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading || !detectedType}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
