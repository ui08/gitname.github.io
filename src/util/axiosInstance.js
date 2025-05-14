import axios from "axios";
import toast from "react-hot-toast";
import { getToken } from "./Authenticate/index"; // Ensure you have a refreshToken function for handling token refresh
import { getTenantkey } from "./Authenticate/TenantMasterconfig";
import { ENV } from "./Env";

const axiosInstance = axios.create({
  baseURL: ENV.API_URL, // Base URL
  headers: {
    "Content-Type": "application/json",
    tenantId: getTenantkey(),
  },
});

// Add request interceptor for adding Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Optionally log or handle missing token scenario
      console.warn("Authorization token is missing");
    }
    return config;
  },
  (error) => {
    // Log request errors
    console.error("Request error:", error.message);
    return Promise.reject(error); // Don't create a new Error, just propagate the original error
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if successful
  async (error) => {
    // Log error details
    console.error("Response error:", error.message);

    // Handle other types of errors globally (e.g., network errors, 500 Internal Server Error)
    if (error.response.data) {
      toast.error(error.response.data.message);
    } else {
      console.error("Network error or no response received");
    }

    // Show a user-friendly message or use a notification system like toast
    // toast.error("Something went wrong, please try again later");

    return Promise.reject(error); // Reject the error to be handled later
  }
);

export default axiosInstance;
