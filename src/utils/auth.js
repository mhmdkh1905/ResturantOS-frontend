export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined") return null;

    return JSON.parse(user);
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

export const isChef = () => {
  const user = getUser();
  return user?.role === "chef";
};

export const isWaiter = () => {
  const user = getUser();
  return user?.role === "waiter";
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
