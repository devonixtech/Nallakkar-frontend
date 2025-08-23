import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Simulated login function
  const handleLogin = (isAdmin) => {
    // Future: API call here for login

    if (isAdmin) {
      navigate("/admin/dashboard"); // 🔐 Admin dashboard
    } else {
      navigate("/user/dashboard"); // 👤 User dashboard or home
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
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              onClick={() => handleLogin(false)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login as User
            </button>

            <button
              onClick={() => handleLogin(true)}
              className="w-full mt-2 bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
            >
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
