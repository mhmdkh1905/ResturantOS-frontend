import { Clock, Users, CheckCircle2, Loader2 } from "lucide-react";
import { getStatusString } from "../../../lib/utils.js";
import styles from "./OrderCard.module.css";

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "var(--status-pending)", bg: "var(--status-pending-bg)" },
  preparing: { label: "Preparing", color: "var(--status-preparing)", bg: "var(--status-preparing-bg)" },
  ready: { label: "Ready", color: "var(--status-ready)", bg: "var(--status-ready-bg)" },
  served: { label: "Served", color: "var(--status-served)", bg: "var(--status-served-bg)" },
};

export default function OrderCard({ order, onUpdateStatus, onComplete, isUpdating }) {
  const timeAgo = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const tableLabel =
    order.tableNumber ??
    (typeof order.tableId === "object"
      ? (order.tableId?.number ?? order.tableId?.tableNumber ?? order.tableId?._id ?? "N/A")
      : (order.tableId ?? "N/A"));

  const handleStatusClick = (nextStatus) => {
    onUpdateStatus(order.id, nextStatus);
  };

  const handleComplete = () => {
    onComplete(order.id);
  };


  const rawStatus = getStatusString(order.status);
  const status = STATUS_CONFIG[rawStatus] || STATUS_CONFIG.pending;

  const safeStatus = rawStatus;
  const canPrepare = safeStatus === 'pending';
  const canReady = safeStatus === 'preparing';
  const canDeliver = safeStatus === 'ready';

  return (
    <div className={`${styles.card} ${styles[safeStatus] || styles.new}`}>

      <div className={styles.header}>
        <div className={styles.tableInfo}>
          <Users size={16} />
          <span className={styles.table}>Table #{tableLabel}</span>
        </div>
        <div className={styles.time}>
          <Clock size={14} />
          <span>{timeAgo}</span>
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

      <div className={styles.actions}>
        {canPrepare && (
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`} 
            onClick={() => handleStatusClick('preparing')}
            disabled={isUpdating}
          >
            {isUpdating ? <Loader2 className={styles.spin} size={16} /> : 'Prepare'}
          </button>
        )}
        {canReady && (
          <button 
            className={`${styles.btn} ${styles.btnSuccess}`} 
            onClick={() => handleStatusClick('ready')}
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
            {isUpdating ? <Loader2 className={styles.spin} size={16} /> : <CheckCircle2 size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

