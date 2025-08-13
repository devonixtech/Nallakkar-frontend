// src/layouts/HomeLayout.jsx
import { Outlet } from "react-router-dom";
import MainNavbar from "../components/layout/MainNavbar";
import Footer from "../components/layout/Footer";

export default function HomeLayout() {
  return (
    <>
      <MainNavbar />
      <main className="min-h-[calc(100vh-200px)] pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
