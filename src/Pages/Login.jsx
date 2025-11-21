 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}admin/login`,
        {
          email,
          password,
        }
      );
        console.log(res)
      // Save token or role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");

      navigate("/admin/dashboard");

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
