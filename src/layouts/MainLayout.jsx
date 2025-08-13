// import { Outlet } from "react-router-dom";
// import CategoryNavbar from "../components/layout/CategoryNavbar";
// import Footer from "../components/layout/Footer";

// export default function MainLayout() {
//   return (
//     <>
//       <CategoryNavbar />
//       <main className="min-h-[calc(100vh-200px)]">
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   );
// }

import { Outlet } from "react-router-dom";
import CategoryNavbar from "../components/layout/CategoryNavbar";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav"; // 👈 import here

export default function MainLayout() {
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

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full border-t bg-white z-50">
        <MobileBottomNav />
      </div>
    </>
  );
}
