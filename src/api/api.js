import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

      const requestUrl = error.config?.url || "";
      const isLoginRequest = requestUrl.includes("/Approval/login");
      if (!isLoginRequest) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("gms-auth-store");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;