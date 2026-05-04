import api from "../lib/axios.js";
import { getStatusString } from "../lib/utils.js";

const toBackendStatus = (status) => {
  const s = getStatusString(status);
  if (!s) return status;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const tryUpdateOrderStatus = async ({ orderId, status }) => {
  const attempts = [
    // Most common REST patterns
    () => api.patch(`/orders/${orderId}`, { status }),
    () => api.put(`/orders/${orderId}`, { status }),
    () => api.patch(`/orders/${orderId}/status`, { status }),
    () => api.put(`/orders/${orderId}/status`, { status }),

    // Alternative patterns seen in some backends
    () => api.patch(`/orders/status/${orderId}`, { status }),
    () => api.put(`/orders/status/${orderId}`, { status }),
    () => api.patch(`/orders/${orderId}/update-status`, { status }),
    () => api.patch(`/orders/${orderId}/state`, { status }),

    // Body-driven endpoint variant
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
      // Best effort: capture attempted URL if present
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
  return res.data.map((item) => ({
    id: item._id,
    // Keep the real tableId for API updates/relations
    tableId: item.tableId?._id ?? item.tableId ?? "N/A",
    // Use tableNumber purely for display when available
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
    createdAt: item.createdAt,
    status: getStatusString(item.status),
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
  // Handle slim frontend payload {tableId, items[{menuItemId, quantity}], notes}
  // Backend computes totals/status/etc.
  console.log("Sending slim orderData to backend:", orderData);
  const res = await api.post("/orders", orderData);
  console.log("Create order response:", res.data);

  // Return normalized frontend format from backend response
  return {
    id: res.data._id || `order_${Date.now()}`,
    tableId: res.data.tableId || orderData.tableId,
    items: res.data.items || orderData.items,
    notes: res.data.notes || orderData.notes || "",
    total: res.data.total || 0,
    createdAt: res.data.createdAt || new Date().toISOString(),
    status: getStatusString(res.data.status, "pending"),
  };
};
