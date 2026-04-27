import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => {
    if (!response.data.success) {
      return Promise.reject(response.data);
    }

    return response.data;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      message: "Network error",
      error: { details: error.message },
    });
  },
);

export default api;
