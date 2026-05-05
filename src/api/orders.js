import api from "../lib/axios.js";
import { getStatusString } from "../lib/utils.js";

const toBackendStatus = (status) => {
  const s = getStatusString(status);
  if (!s) return status;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getOrderNotes = (order = {}) =>
  order.notes ??
  order.note ??
  order.orderNotes ??
  order.specialInstructions ??
  order.instructions ??
  order.comment ??
  order.comments ??
  "";

const ORDER_NOTES_CACHE_KEY = "restaurant_os_order_notes";

const readOrderNotesCache = () => {
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(localStorage.getItem(ORDER_NOTES_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
};

const writeOrderNoteCache = (orderId, notes) => {
  if (typeof window === "undefined" || !orderId || !notes?.trim()) return;

  const cache = readOrderNotesCache();
  cache[orderId] = notes.trim();
  localStorage.setItem(ORDER_NOTES_CACHE_KEY, JSON.stringify(cache));
};

const tryUpdateOrderStatus = async ({ orderId, status }) => {
  const attempts = [
    () => api.patch(`/orders/${orderId}`, { status }),
    () => api.put(`/orders/${orderId}`, { status }),
    () => api.patch(`/orders/${orderId}/status`, { status }),
    () => api.put(`/orders/${orderId}/status`, { status }),

    () => api.patch(`/orders/status/${orderId}`, { status }),
    () => api.put(`/orders/status/${orderId}`, { status }),
    () => api.patch(`/orders/${orderId}/update-status`, { status }),
    () => api.patch(`/orders/${orderId}/state`, { status }),

    () => api.patch(`/orders/status`, { orderId, status }),
    () => api.put(`/orders/status`, { orderId, status }),
  ];

  const tried = [];
  let lastErr;
  for (const attempt of attempts) {
    try {
      const res = await attempt();
      return res.data;
    } catch (err) {
      lastErr = err;

      const url = err?.config?.url;
      tried.push(url || "unknown");
    }
  }

  const msg =
    lastErr?.message ||
    lastErr?.error?.details ||
    "Failed to update order status";
  throw new Error(`${msg}. Tried: ${[...new Set(tried)].join(", ")}`);
};

export const getOrders = async () => {
  const res = await api.get("/orders");
  const orders = res.data?.data ?? res.data ?? [];
  const notesCache = readOrderNotesCache();

  return orders.map((item) => ({
    id: item._id,

    tableId: item.tableId?._id ?? item.tableId ?? "N/A",

    tableNumber:
      item.tableId?.number ??
      item.tableId?.tableNumber ??
      item.tableId?.tableNo ??
      item.tableId?.table ??
      item.tableNumber ??
      item.tableNo ??
      item.table ??
      undefined,
    items: item.items,
    notes: getOrderNotes(item) || notesCache[item._id] || "",
    createdAt: item.createdAt,
    status: getStatusString(item.status),
    total: item.total ?? item.totalPrice ?? 0,
    totalPrice: item.totalPrice ?? item.total ?? 0,
  }));
};

export const updateOrderStatus = async (orderId, status) => {
  const backendStatus = toBackendStatus(status);
  return await tryUpdateOrderStatus({ orderId, status: backendStatus });
};

export const completeOrder = async (orderId) => {
  const backendStatus = toBackendStatus("served");
  return await tryUpdateOrderStatus({ orderId, status: backendStatus });
};

export const createOrder = async (orderData) => {
  const payload = {
    ...orderData,
    notes: getOrderNotes(orderData),
    note: getOrderNotes(orderData),
    specialInstructions: getOrderNotes(orderData),
  };

  const res = await api.post("/orders", payload);

  const created = res.data?.data ?? res.data ?? {};
  const createdId = created._id || created.id || `order_${Date.now()}`;
  const createdNotes = getOrderNotes(created) || getOrderNotes(orderData);

  writeOrderNoteCache(createdId, createdNotes);

  return {
    id: createdId,
    tableId: created.tableId?._id ?? created.tableId ?? orderData.tableId,
    tableNumber:
      created.tableId?.number ??
      created.tableId?.tableNumber ??
      created.tableNumber ??
      created.tableNo ??
      created.table,
    items: created.items || orderData.items,
    notes: createdNotes,
    total: created.total ?? created.totalPrice ?? 0,
    totalPrice: created.totalPrice ?? created.total ?? 0,
    createdAt: created.createdAt || new Date().toISOString(),
    status: getStatusString(created.status, "pending"),
  };
};
