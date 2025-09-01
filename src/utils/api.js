 import axios from "axios";
import { BASE_URL } from "../../config";   

// Create Axios instance
 const api = axios.create({ baseURL: BASE_URL });
// Request interceptor: Adds Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Attach token to headers if it exists
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Optional: Set content-type automatically (e.g., for FormData)
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (config.data && typeof config.data === "object") {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);  // Reject the promise if an error occurs in the request
  }
);

// Response interceptor: Optional - Handle response globally (e.g., for logging, error handling)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // You can add any global error handling logic here (e.g., logging, redirecting to login)
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized Error (e.g., token expired)
      console.log("Unauthorized. Redirecting to login...");
      // Redirect to login or show a login modal
    }
    return Promise.reject(error);  // Reject the promise with the error
  }
);

export default api;