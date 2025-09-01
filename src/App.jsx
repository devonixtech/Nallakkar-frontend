import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./Components/layout/ScrollToTop"; // import the new component
import { store } from "./Redux/store";
import { Provider } from "react-redux";
export default function App() {
  return (
    <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop /> {/* 👈 add this right inside BrowserRouter */}
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
    </Provider>
  );
}
