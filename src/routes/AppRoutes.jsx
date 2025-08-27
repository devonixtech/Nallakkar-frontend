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
import ProductDetailsPage from "../Pages/Categories/ProductDetailsPage";
import Cart from "../Pages/Cart";
import SelectAddress from "../Pages/SelectAddress";
import AddDeliveryAddress from "../Pages/AddDeliveryAddress";
import ProductOverview from "../Pages/ProductOverview";
import PaymentPage from "../Pages/PaymentPage";
import Profile from "../Pages/Profile";
import BuyNow from "../Pages/Categories/BuyNow";
import Categories from "../Pages/admin/Categories";
import AddCategory from "../Pages/admin/AddCategory";
import ProductDetails from "../Pages/admin/ProductDetails";
import OrderHistory from "../Pages/OrderHistroy";
import KidsWrapper from "../Pages/Categories/KidsWrapper";
import PaymentSuccess from "../Pages/PaymentSuccess";
import OrderConfirmation from "../Pages/OrderConfirmation";
import WriteReview from "../Pages/WriteReview";
import WomenWrapper from "../Pages/Categories/WomenWrapper";
import ToyWrapper from "../Pages/Categories/ToyWrapper";
import HomeDecorWrapper from "../Pages/Categories/HomeDecorWrapper";

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
        <Route path="/category/kids" element={<KidsWrapper />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/category/women" element={<WomenWrapper />} />
        <Route path="/category/toys" element={<ToyWrapper />} />
        <Route path="/category/home-decors" element={<HomeDecorWrapper />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buyNow" element={<BuyNow />} />
        <Route
          path="/SelectAddress"
          element={<SelectAddress></SelectAddress>}
        ></Route>
        <Route
          path="/AddDeliveryAddress"
          element={<AddDeliveryAddress></AddDeliveryAddress>}
        ></Route>
        <Route path="/ProductOverview" element={<ProductOverview />} />
        <Route
          path="/PaymentPage"
          element={<PaymentPage></PaymentPage>}
        ></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>

        <Route
          path="/orderHistory"
          element={<OrderHistory></OrderHistory>}
        ></Route>

        <Route
          path="/PaymentSuccess"
          element={<PaymentSuccess></PaymentSuccess>}
        ></Route>
        <Route
          path="/OrderConfirmation"
          element={<OrderConfirmation></OrderConfirmation>}
        ></Route>
        <Route path="WriteReview" element={<WriteReview></WriteReview>}></Route>
      </Route>

      {/* ✅ Admin Panel routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
        <Route path="categories" element={<Categories></Categories>}></Route>
        <Route
          path="categories/add"
          element={<AddCategory></AddCategory>}
        ></Route>
        <Route
          path="productsDetails"
          element={<ProductDetails></ProductDetails>}
        ></Route>
      </Route>
    </Routes>
  );
}
