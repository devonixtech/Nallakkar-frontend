import { useState } from "react";
import axios from "axios";
import "./adminResetPassword.css";
import { BASE_URL } from "../../../config";

const AdminResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      return setError("New password and confirm password do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}admin/reset-password`,
        {
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        }
      );

      setMessage(res.data.message);
      setFormData({
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Password</h2>
        <p className="sub-text">Update your admin password securely</p>

        {error && <div className="error-msg">{error}</div>}
        {message && <div className="success-msg">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResetPassword;
