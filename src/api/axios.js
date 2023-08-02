// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Substitua pela URL da sua API
});

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = localStorage.getItem("token");
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      !(
        error.response &&
        (error.response.status === 401 || error.response.status === 403) &&
        originalRequest.url !== "/auth/login"
      )
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Session expired, redirecting to login");
      window.location.href = "/login";
    }
  }
);

export const setAuthorizationToken = (token) => {
  api.interceptors.request.use((config) => {
    config.headers["Authorization"] = token;
    return config;
  });
};

export default api;
