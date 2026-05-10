import { Clock, Users, CheckCircle2, Loader2 } from "lucide-react";
import styles from "./OrderCard.module.css";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "var(--status-pending)",
    bg: "var(--status-pending-bg)",
  },
  preparing: {
    label: "Preparing",
    color: "var(--status-preparing)",
    bg: "var(--status-preparing-bg)",
  },
  ready: {
    label: "Ready",
    color: "var(--status-ready)",
    bg: "var(--status-ready-bg)",
  },
  served: {
    label: "Served",
    color: "var(--status-served)",
    bg: "var(--status-served-bg)",
  },
};

const getOrderNotes = (order = {}) => order.note ?? order.notes ?? "";



export default function OrderCard({
  order,
  onUpdateStatus,
  onComplete,
  isUpdating,
  showActions = false,
  showEmptyNotes = false,
}) {
  const tableLabel =
    order.tableNumber ??
    (typeof order.tableId === "object"
      ? (order.tableId?.number ??
        order.tableId?.tableNumber ??
        order.tableId?._id ??
        "N/A")
      : (order.tableId ?? "N/A"));

  const handleStatusClick = (nextStatus) => {
    onUpdateStatus?.(order.id, nextStatus);
  };

  const handleComplete = () => {
    onComplete?.(order.id);
  };

  const rawStatus = (order.status || "").toLowerCase();

 


  const total = Number(order.totalPrice ?? order.total ?? 0);

  const statusClassMap = {
    pending: "new",
    preparing: "preparing",
    ready: "ready",
    served: "served",
  };

  const uiStatus = statusClassMap[rawStatus] || "new";

  const status = STATUS_CONFIG[rawStatus] || STATUS_CONFIG.pending;
  const notes = String(getOrderNotes(order)).trim();

  const canPrepare = rawStatus === "pending";
  const canReady = rawStatus === "preparing";
  const canDeliver = rawStatus === "ready";

  return (
    <div className={`${styles.card} ${styles[uiStatus] || styles.new}`}>
      <div className={styles.header}>
        <div className={styles.tableInfo}>
          <Users size={16} />
          <span className={styles.table}>Table #{tableLabel}</span>
        </div>
      </div>

      <div className={styles.statusBadge}>
        <div className={styles.dot} style={{ backgroundColor: status.color }} />
        <span>{status.label}</span>
      </div>

      <div className={styles.items}>
        {(order.items || []).map((item, idx) => {
          const name =
            item?.name ??
            item?.menuItem?.name ??
            item?.menuItemId?.name ??
            item?.menuItemId?.title ??
            "Item";
          const qty = item?.qty ?? item?.quantity ?? 1;

          return (
            <div key={idx} className={styles.item}>
              <span className={styles.itemName}>{name}</span>
              <span className={styles.qty}>x{qty}</span>
            </div>
          );
        })}
      </div>

      {(notes || showEmptyNotes) && (
        <div className={styles.notes}>
          <span className={styles.notesLabel}>Notes</span>
          <p>{notes || "No notes"}</p>
        </div>
      )}

      {total > 0 && (
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>${total.toFixed(2)}</span>
        </div>
      )}

      {showActions && (
        <div className={styles.actions}>
          {canPrepare && (
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => handleStatusClick("preparing")}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className={styles.spin} size={16} />
              ) : (
                "Prepare"
              )}
            </button>
          )}
          {canReady && (
            <button
              className={`${styles.btn} ${styles.btnSuccess}`}
              onClick={() => handleStatusClick("ready")}
              disabled={isUpdating}
            >
              Mark Ready
            </button>
          )}
          {canDeliver && (
            <button
              className={`${styles.btn} ${styles.btnComplete}`}
              onClick={handleComplete}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className={styles.spin} size={16} />
              ) : (
                <CheckCircle2 size={16} />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
