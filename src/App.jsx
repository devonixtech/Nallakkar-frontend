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
import { ToastContainer } from "react-toastify"; // 👈 import toast container
import "react-toastify/dist/ReactToastify.css"; // 👈 import toast CSS

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />

          {/* ✅ Global toaster setup */}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}
