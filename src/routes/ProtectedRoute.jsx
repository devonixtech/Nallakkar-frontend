import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
  return  <Outlet /> 
};

export default ProtectedRoute;
