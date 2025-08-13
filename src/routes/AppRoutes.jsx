// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Layouts
import HomeLayout from "../layouts/HomeLayout";
import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../Pages/Login";

// Pages
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import ProductDetails from "../pages/ProductDetails";

// Categories
import Kids from "../pages/Categories/Kids";
import Women from "../pages/Categories/Women";
import Toys from "../pages/Categories/Toys";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import ProductList from "../pages/Admin/ProductList";
import AddProduct from "../pages/Admin/AddProduct";
import Orders from "../pages/Admin/Orders";
import Users from "../pages/Admin/Users";
import AboutUs from "../Pages/AboutUs";
import PaymentSecurity from "../Pages/PaymentSecurity";
import ShippingPolicy from "../Pages/ShippingPolicy";
import TermsAndConditions from "../Pages/TermsAndConditions";
import FAQSection from "../Pages/FAQSection";
import ContactSection from "../Pages/ContactSection";
import MainHome from "../Pages/Categories/MainHome";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ✅ Home routes */}
      <Route path="/login" element={<Login />} />

      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/PaymentSecurity" element={<PaymentSecurity />} />
        <Route
          path="/ShippingPolicy"
          element={<ShippingPolicy></ShippingPolicy>}
        ></Route>
        <Route
          path="/TermsAndConditions"
          element={<TermsAndConditions></TermsAndConditions>}
        ></Route>
        <Route path="/FAQSection" element={<FAQSection></FAQSection>}></Route>
        <Route
          path="/ContactSection"
          element={<ContactSection></ContactSection>}
        ></Route>
      </Route>

      {/* ✅ Main user routes (with CategoryNavbar) */}
      <Route element={<MainLayout />}>
        <Route path="/MainHome" element={<MainHome></MainHome>}></Route>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/kids" element={<Kids />} />
        <Route path="/category/women" element={<Women />} />
        <Route path="/category/toys" element={<Toys />} />
      </Route>

      {/* ✅ Admin Panel routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}
