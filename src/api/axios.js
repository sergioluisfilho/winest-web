import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: process.env.APP_API_BASE_URL,
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `${token}` : "";
  return config;
});

api.interceptors.response.use(
  function (response) {
    // Do something with the response data
    return response;
  },
  function (error) {
    // Handle error responses here
    if (error.response && error.response.status === 401) {
      // Clear token and current user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    }

    return Promise.reject(error);
  }
);

export default api;
