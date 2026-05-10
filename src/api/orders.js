import api from "../lib/axios.js";
import { getStatusString } from "../lib/utils.js";

const toBackendStatus = (status) => {
  const s = getStatusString(status);
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getOrders = async () => {
  const res = await api.get("/orders");
  const orders = res.data?.data ?? res.data ?? [];

  return orders.map((item) => ({
    id: item._id,
    tableId: item.tableId?._id ?? item.tableId ?? "N/A",
    tableNumber: item.tableId?.number ?? undefined,
    items: item.items,
    note: item.note ?? "",
    createdAt: item.createdAt,
    status: getStatusString(item.status),
    total: item.totalPrice ?? 0,
    totalPrice: item.totalPrice ?? 0,
  }));
};

export const updateOrderStatus = async (orderId, status) => {
  const res = await api.put(`/orders/${orderId}/status`, { status: toBackendStatus(status) });
  return res.data;
};

export const completeOrder = async (orderId) => {
  const res = await api.put(`/orders/${orderId}/status`, { status: "Served" });
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", {
    tableId: orderData.tableId,
    items: orderData.items,
    note: orderData.notes ?? orderData.note ?? "",
  });

  const created = res.data?.data ?? res.data ?? {};

  return {
    id: created._id,
    tableId: created.tableId?._id ?? created.tableId ?? orderData.tableId,
    tableNumber: created.tableId?.number ?? undefined,
    items: created.items || orderData.items,
    note: created.note ?? orderData.note ?? "",
    total: created.totalPrice ?? 0,
    totalPrice: created.totalPrice ?? 0,
    createdAt: created.createdAt || new Date().toISOString(),
    status: getStatusString(created.status, "pending"),
  };
};
