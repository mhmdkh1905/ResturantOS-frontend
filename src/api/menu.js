import api from "../lib/axios.js";

export const getMenu = async () => {
  const res = await api.get("/menu");

  const menu = res.data.data;

  return menu.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.price,
    category: item.category,
    image: item.image,
    recipe: item.recipe || [],
    isAvailable: item.isAvailable,
  }));
};

export const createMenuItem = async (data) => {
  const payload = {
    name: data.name,
    price: data.price,
    category: data.category,
    isAvailable: data.isAvailable,
    ...(data.image?.trim() && { image: data.image.trim() }),
    ...(data.recipe?.length > 0 && {
      recipe: data.recipe.filter(
        (ing) => ing.ingredientName?.trim() && ing.quantity > 0,
      ),
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
    ...(data.recipe && { recipe: data.recipe }),
    ...(data.isAvailable && { isAvailable: data.isAvailable }),
  };
  const res = await api.put(`/menu/${id}`, payload);
  return res.data;
};

export const deleteMenuItem = async (id) => {
  const res = await api.delete(`/menu/${id}`);
  return res.message;
};
