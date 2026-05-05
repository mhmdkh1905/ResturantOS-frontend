import { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import { useOrders } from "../../hooks/useOrders.js";
import { useTables } from "../../hooks/useTables.js";
import OrderCard from "../../components/cards/orderCard/OrderCard.jsx";
import styles from "./Kitchen.module.css";

const getOrderNotes = (order = {}) =>
  order.notes ??
  order.note ??
  order.orderNotes ??
  order.specialInstructions ??
  order.instructions ??
  order.comment ??
  order.comments ??
  "";

export default function Kitchen() {
  const { orders, loading, error, refetch, updateStatus, markComplete } =
    useOrders();
  const { tables } = useTables();

  const tableNumberById = useMemo(
    () => new Map((tables || []).map((t) => [t.id, t.number])),
    [tables],
  );

  const columns = useMemo(
    () => ({
      pending: orders.filter((o) => o.status === "pending"),
      preparing: orders.filter((o) => o.status === "preparing"),
      ready: orders.filter((o) => o.status === "ready"),
    }),
    [orders],
  );

  const pendingCount = columns.pending.length;
  const preparingCount = columns.preparing.length;
  const readyCount = columns.ready.length;

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Kitchen</h1>
          <p className={styles.subtitle}>Order preparation workflow</p>
        </div>
        <div className={styles.loading}>Loading kitchen orders...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Kitchen</h1>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} onClick={refetch} title="Refresh">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          Error: {error}. <button onClick={refetch}>Retry</button>
        </div>
      )}

      <div className={styles.kanban}>
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>Pending</h3>
            <span className={styles.columnCount}>{pendingCount}</span>
          </div>
          {columns.pending.length === 0 ? (
            <div className={styles.emptyColumn}>No pending orders</div>
          ) : (
            columns.pending.map((order) => (
              <OrderCard
                key={order.id}
                order={{
                  ...order,
                  notes: getOrderNotes(order),
                  tableNumber:
                    tableNumberById.get(order.tableId) ?? order.tableNumber,
                }}
                onUpdateStatus={updateStatus}
                onComplete={() => {}}
                isUpdating={false}
                showActions
                showEmptyNotes
              />
            ))
          )}
        </div>

        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>Preparing</h3>
            <span className={styles.columnCount}>{preparingCount}</span>
          </div>
          {columns.preparing.length === 0 ? (
            <div className={styles.emptyColumn}>No orders in preparation</div>
          ) : (
            columns.preparing.map((order) => (
              <OrderCard
                key={order.id}
                order={{
                  ...order,
                  notes: getOrderNotes(order),
                  tableNumber:
                    tableNumberById.get(order.tableId) ?? order.tableNumber,
                }}
                onUpdateStatus={updateStatus}
                onComplete={() => {}}
                isUpdating={false}
                showActions
                showEmptyNotes
              />
            ))
          )}
        </div>

        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>Ready</h3>
            <span className={styles.columnCount}>{readyCount}</span>
          </div>
          {columns.ready.length === 0 ? (
            <div className={styles.emptyColumn}>No ready orders</div>
          ) : (
            columns.ready.map((order) => (
              <OrderCard
                key={order.id}
                order={{
                  ...order,
                  notes: getOrderNotes(order),
                  tableNumber:
                    tableNumberById.get(order.tableId) ?? order.tableNumber,
                }}
                onUpdateStatus={() => {}}
                onComplete={markComplete}
                isUpdating={false}
                showActions
                showEmptyNotes
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
