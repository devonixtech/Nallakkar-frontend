import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
  return <Outlet />
};

export default PublicRoute;
