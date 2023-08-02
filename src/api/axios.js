// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Substitua pela URL da sua API
});

api.interceptors.request.use((config) => {
  config.headers["Authorization"] = localStorage.getItem("token");
  return config;
});

export const setAuthorizationToken = (token) => {
  api.interceptors.request.use((config) => {
    config.headers["Authorization"] = token;
    return config;
  });
};

export default api;