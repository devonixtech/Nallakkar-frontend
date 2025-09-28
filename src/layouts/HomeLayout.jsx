// // src/layouts/HomeLayout.jsx
// import { Outlet } from "react-router-dom";
// import MainNavbar from "../components/layout/MainNavbar";
// import Footer from "../components/layout/Footer";

// export default function HomeLayout() {
//   return (
//     <>
//       <MainNavbar />
//       <main className="min-h-[calc(100vh-200px)] pt-20">
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   );
// }


// src/layouts/HomeLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import MainNavbar from "../components/layout/MainNavbar";
import Footer from "../components/layout/Footer";

export default function HomeLayout() {
  const location = useLocation();

  const hideFooterRoutes = [
    "/wishlist",
    "/cart",
    "/buyNow",
    "/SelectAddress",
    "/AddDeliveryAddress",
    "/ProductOverview",
    "/PaymentPage",
    "/PaymentSuccess",
    "/OrderConfirmation",
    "/WriteReview",
  ];

  // check if current path starts with any route from hideFooterRoutes
  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
console.log("Current Path:", location.pathname);
console.log("Should Hide Footer:", shouldHideFooter);
  return (
    <>
      <MainNavbar />
      <main className="min-h-[calc(100vh-200px)] pt-20">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
