 import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => {
    const payload = response.data;

    // Normalize inconsistent backend responses
    if (Array.isArray(payload)) {
      response.data = {
        success: true,
        data: payload,
      };
    } else if (
      payload &&
      typeof payload === "object" &&
      payload.success === undefined
    ) {
      response.data = {
        success: true,
        data: payload,
      };
    }

    if (!response.data.success) {
      console.error('Backend response missing success:true', response.data);

      return Promise.reject(response.data);
    }

    return response.data;
  },
  (error) => {
    console.error('Axios error:', error);

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
