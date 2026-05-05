import api from "../lib/axios.js";

export const getInventory = async () => {
  const res = await api.get("/inventory");

  const inventories = res.data.data;

  return inventories.map((item) => ({
    _id: item._id,
    ingredientName: item.ingredientName,
    quantity: item.quantity,
    unit: item.unit,
    minThreshold: item.minThreshold,
    costPerUnit: item.costPerUnit,
    supplier: item.supplier,
    isLowStock: item.isLowStock,
  }));
};

export const createInventoryItem = async (data) => {
  const res = await api.post("/inventory", {
    ingredientName: data.ingredientName,
    quantity: data.quantity,
    unit: data.unit,
    minThreshold: data.minThreshold,
    costPerUnit: data.costPerUnit,
    supplier: data.supplier,
  });
  return res.data;
};

export const updateInventoryItem = async (id, data) => {
  const payload = {
    ...(data.ingredientName !== undefined && {
      ingredientName: data.ingredientName,
    }),
    ...(data.quantity !== undefined && { quantity: data.quantity }),
    ...(data.unit !== undefined && { unit: data.unit }),
    ...(data.minThreshold !== undefined && {
      minThreshold: data.minThreshold,
    }),
    ...(data.costPerUnit !== undefined && { costPerUnit: data.costPerUnit }),
    ...(data.supplier !== undefined && { supplier: data.supplier }),
  };
  const res = await api.put(`/inventory/${id}`, payload);

  return res.data;
};

export const deleteInventoryItem = async (id) => {
  const res = await api.delete(`/inventory/${id}`);
  return res.message;
};

export const getInventoryByName = async (name) => {
  const res = await api.get(`/inventory/name/${name}`);
  return res.data.map((item) => ({
    _id: item._id,
    ingredientName: item.ingredientName,
    quantity: item.quantity,
    unit: item.unit,
    minThreshold: item.minThreshold,
    costPerUnit: item.costPerUnit,
    supplier: item.supplier,
    isLowStock: item.isLowStock,
  }));
};

export const getInventoryById = async (id) => {
  const res = await api.get(`/inventory/${id}`);
  const item = res.data;
  return {
    _id: item._id,
    ingredientName: item.ingredientName,
    quantity: item.quantity,
    unit: item.unit,
    minThreshold: item.minThreshold,
    costPerUnit: item.costPerUnit,
    supplier: item.supplier,
    isLowStock: item.isLowStock,
  };
};
