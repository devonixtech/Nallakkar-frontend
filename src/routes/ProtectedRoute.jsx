 // ProtectedRoute.jsx
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [showPopup, setShowPopup] = useState(!isLoggedIn);
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Outlet />;
  }
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "25px",
  borderRadius: "8px",
  width: "320px",
  textAlign: "center",
};

const btnPrimary = {
  padding: "10px 15px",
  background: "#ff9900",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  marginRight: "10px",
  cursor: "pointer",
};

const btnSecondary = {
  padding: "10px 15px",
  background: "#ddd",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

  return (
    <>
      {showPopup && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Login Required</h3>
            <p>Please login to your account to continue</p>

            <div style={{ marginTop: "20px" }}>
              <button onClick={() => navigate("/")} style={btnPrimary}>
                Login
              </button>
              <button onClick={() => navigate("/")} style={btnSecondary}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
