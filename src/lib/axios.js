import axios from "axios";

import { logout } from "../utils/auth.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/** Auth endpoints must not trigger session-clear + redirect (e.g. wrong password → 401). */
const shouldSkipUnauthorizedRedirect = (config) => {
  const url = config?.url || "";
  return (
    url.includes("/auth/login") ||
    url.includes("/auth/register") ||
    url.includes("/auth/logout")
  );
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const config = error.config;

    if (
      status === 401 &&
      config &&
      !shouldSkipUnauthorizedRedirect(config) &&
      typeof window !== "undefined"
    ) {
      logout();
      window.location.replace("/login");
    }

    return Promise.reject(error.response?.data || { message: "Network error" });
  },
);

export default api;
