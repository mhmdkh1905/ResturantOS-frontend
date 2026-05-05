import { useState, useEffect, useCallback, useRef } from "react";
import {
  getOrders,
  updateOrderStatus,
  completeOrder,
  createOrder as createOrderApi,
} from "../api/orders.js";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = fetchOrders;

  const initialFetchRef = useRef(false);

  useEffect(() => {
    if (!initialFetchRef.current) {
      initialFetchRef.current = true;
      fetchOrders();
    }
  }, [fetchOrders]);

  const updateStatus = async (orderId, status) => {
    const prevOrders = orders;
    try {
      // Optimistic update
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: status.toLowerCase() } : o,
        ),
      );
      await updateOrderStatus(orderId, status);
    } catch (err) {
      setError(err.message);
      // Rollback optimistic update (avoid full refetch/refresh)
      setOrders(prevOrders);
    }
  };

  const markComplete = async (orderId) => {
    try {
      // Optimistic
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      await completeOrder(orderId);
      await refetch();
    } catch (err) {
      setError(err.message);
      refetch();
    }
  };

  const createOrder = async (orderData) => {
    try {
      console.log("Creating order with data:", orderData);
      const created = await createOrderApi(orderData);
      console.log("Order created successfully:", created);
      // Add real order after successful API call
      setOrders((prev) => [created, ...prev]);
      setError(null);
      return created;
    } catch (err) {
      console.error("Create order failed:", err);
      const errorMsg = err.message || "Failed to create order";
      setError(errorMsg);
      refetch();
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    refetch,
    updateStatus,
    markComplete,
    createOrder,
  };
}
