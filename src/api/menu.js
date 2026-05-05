import api from "../lib/axios.js";

export const getMenu = async () => {
  const res = await api.get("/menu");

  const menu = res.data?.data ?? res.data ?? [];
  const items = Array.isArray(menu) ? menu : [];

  return items.map((item) => ({
    _id: item._id,
    name: item.name ?? "",
    price: Number(item.price ?? 0),
    category: item.category ?? "Uncategorized",
    image: item.image ?? "",
    ingredients: item.ingredients || [],
    isAvailable: item.isAvailable ?? true,
  }));
};

export const createMenuItem = async (data) => {
  const payload = {
    name: data.name,
    price: data.price,
    category: data.category,
    isAvailable: data.isAvailable,
    ...(data.image?.trim() && { image: data.image.trim() }),
    ...(data.ingredients?.length > 0 && {
      ingredients: data.ingredients,
    }),
  };
  const res = await api.post("/menu", payload);
  return res.data;
};

export const updateMenuItem = async (id, data) => {
  const payload = {
    ...(data.name && { name: data.name }),
    ...(data.price !== undefined && { price: data.price }),
    ...(data.category && { category: data.category }),
    ...(data.image && { image: data.image }),
    ...(data.ingredients && { ingredients: data.ingredients }),
    ...(data.isAvailable !== undefined && {
      isAvailable: data.isAvailable,
    }),
  };
  const res = await api.put(`/menu/${id}`, payload);
  return res.data;
};

export const deleteMenuItem = async (id) => {
  const res = await api.delete(`/menu/${id}`);
  return res.message;
};
