import api from "../lib/axios.js";

export const login = async (data) => {
  const res = await api.post("/auth/login", {
    email: data.email,
    password: data.password,
  });

  return res;
};

export const register = async (data) => {
  const res = await api.post("/auth/register", {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return res.data;
};
