import api from "../lib/axios.js";

export const getInventory = async () => {
  const res = await api.get("/inventory");
  return res.data.map((item) => ({
    id: item._id,
    name: item.ingredientName,
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
    ...(data.ingredientName && { ingredientName: data.ingredientName }),
    ...(data.quantity && { quantity: data.quantity }),
    ...(data.unit && { unit: data.unit }),
    ...(data.minThreshold && { minThreshold: data.minThreshold }),
    ...(data.costPerUnit && { costPerUnit: data.costPerUnit }),
    ...(data.supplier && { supplier: data.supplier }),
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
    id: item._id,
    name: item.ingredientName,
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
    id: item._id,
    name: item.ingredientName,
    quantity: item.quantity,
    unit: item.unit,
    minThreshold: item.minThreshold,
    costPerUnit: item.costPerUnit,
    supplier: item.supplier,
    isLowStock: item.isLowStock,
  };
};
