// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes";
// import { HelmetProvider } from "react-helmet-async";
// import ScrollToTop from "./Components/layout/ScrollToTop"; // import the new component
// import { store } from "./Redux/store";
// import { Provider } from "react-redux";
// export default function App() {
//   return (
//     <Provider store={store}>
//     <HelmetProvider>
//       <BrowserRouter>
//         <ScrollToTop /> {/* 👈 add this right inside BrowserRouter */}
//         <AppRoutes />
//       </BrowserRouter>
//     </HelmetProvider>
//     </Provider>
//   );
// }




import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./Components/layout/ScrollToTop";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

// 🔥 AUTH MODAL CONTEXT
import {
  AuthModalProvider,
  useAuthModal,
} from "./Components/Custom/AuthModalContext";

import AuthModal from "./Components/Custom/AuthModal";
import LoginForm from "./Pages/LoginForm";
import OtpForm from "./Pages/OtpForm";
import SignupForm from "./Pages/SignupForm";

/* ---------------------------
   INNER APP (MODAL HANDLER)
---------------------------- */
function AppWithModal() {
  const { showLogin, setShowLogin } = useAuthModal();
  const [authScreen, setAuthScreen] = useState("login"); 
  // login | otp | register

  // ✅ CLOSE MODAL COMPLETELY
  const closeModal = () => {
    setShowLogin(false);
    setAuthScreen("login");
    localStorage.removeItem("emailOrMobile");
  };

  // ✅ OTP VERIFIED SUCCESS
  const handleOtpSuccess = () => {
    closeModal();                 // 🔥 MODAL CLOSE
    window.location.href = "/";   // optional redirect
  };

  return (
    <>
      <ScrollToTop />
      <AppRoutes />

      {/* ✅ GLOBAL AUTH MODAL */}
      {showLogin && (
        <AuthModal onClose={closeModal}>
          {authScreen === "login" && (
            <LoginForm
              goToOtp={() => setAuthScreen("otp")}
              switchToSignup={() => setAuthScreen("register")}
            />
          )}

          {authScreen === "otp" && (
            <OtpForm
              changeNumber={() => setAuthScreen("login")}
              goToVerified={handleOtpSuccess}
            />
          )}

          {authScreen === "register" && (
            <SignupForm
              switchToLogin={() => setAuthScreen("login")}
            />
          )}
        </AuthModal>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
    </>
  );
}

/* ---------------------------
   ROOT APP (PROVIDERS)
---------------------------- */
export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <AuthModalProvider>
          <BrowserRouter>
            <AppWithModal />
          </BrowserRouter>
        </AuthModalProvider>
      </HelmetProvider>
    </Provider>
  );
}
