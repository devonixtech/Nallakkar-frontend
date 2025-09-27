// import { Outlet } from "react-router-dom";
// import CategoryNavbar from "../components/layout/CategoryNavbar";
// import Footer from "../components/layout/Footer";
// import MobileBottomNav from "../components/layout/MobileBottomNav"; // 👈 import here

// export default function MainLayout() {
//   return (
//     <>
//       {/* Desktop Navbar */}
//       <div className="hidden md:block">
//         <CategoryNavbar />
//       </div>

//       {/* Page Content */}
//       <main className="min-h-[calc(100vh-200px)] pt-0 lg:pt-20">
//         <Outlet />
//       </main>

//       {/* Desktop Footer */}
//       <div className="hidden md:block">
//         <Footer />
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className="md:hidden fixed bottom-0 left-0 w-full border-t bg-white z-50">
//         <MobileBottomNav />
//       </div>
//     </>
//   );
// }


import { Outlet, useLocation } from "react-router-dom";
import CategoryNavbar from "../components/layout/CategoryNavbar";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";

export default function MainLayout() {
  const location = useLocation();

  // jahan footer hide karna hai
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

  const shouldHideFooter = hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <CategoryNavbar />
      </div>

      {/* Page Content */}
      <main className="min-h-[calc(100vh-200px)] pt-0 lg:pt-20">
        <Outlet />
      </main>

      {/* Desktop Footer (conditionally render) */}
      {!shouldHideFooter && (
        <div className="hidden md:block">
          <Footer />
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full border-t bg-white z-50">
        <MobileBottomNav />
      </div>
    </>
  );
}
