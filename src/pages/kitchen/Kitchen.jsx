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

function SkeletonOrderCard() {
  const sk = styles.shimmer;
  return (
    <div className={styles.skCard} aria-hidden>
      <div className={styles.skCardTop}>
        <div className={`${sk} ${styles.skCardLineMd}`} />
        <div className={`${sk} ${styles.skCardLineSm}`} />
      </div>
      <div className={`${sk} ${styles.skBadge}`} />
      <div className={styles.skLines}>
        <div className={`${sk} ${styles.skRow}`} />
        <div className={`${sk} ${styles.skRow}`} />
        <div className={`${sk} ${styles.skRowShort}`} />
      </div>
      <div className={styles.skActions}>
        <div className={`${sk} ${styles.skBtnGhost}`} />
      </div>
    </div>
  );
}

function KitchenSkeleton() {
  const sk = styles.shimmer;
  const colConfigs = [
    { key: "p", className: `${styles.column} ${styles.colPending}` },
    { key: "r", className: `${styles.column} ${styles.colPreparing}` },
    { key: "d", className: `${styles.column} ${styles.colReady}` },
  ];

  return (
    <div className={styles.page} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading kitchen…</span>
      <div className={styles.header}>
        <div>
          <div className={`${sk} ${styles.skTitle}`} aria-hidden />
          <div className={`${sk} ${styles.skSubtitle}`} aria-hidden />
        </div>
        <div className={styles.headerActions}>
          <div className={`${sk} ${styles.skIconBtn}`} aria-hidden />
        </div>
      </div>

      <div className={styles.kanban}>
        {colConfigs.map((col) => (
          <div key={col.key} className={col.className}>
            <div className={styles.columnHeader}>
              <div className={`${sk} ${styles.skColTitle}`} aria-hidden />
              <div className={`${sk} ${styles.skCountPill}`} aria-hidden />
            </div>
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonOrderCard key={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

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
    return <KitchenSkeleton />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Kitchen</h1>
          <p className={styles.subtitle}>Prep board · live queue</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} onClick={refetch} title="Refresh">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.errorBanner} role="alert">
          <p className={styles.errorText}>
            <span className={styles.errorLabel}>Could not load orders.</span>{" "}
            {String(error)}
          </p>
          <button type="button" className={styles.retryBtn} onClick={refetch}>
            Retry
          </button>
        </div>
      )}

      <div className={styles.kanban}>
        <div className={`${styles.column} ${styles.colPending}`}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>Pending</h3>
            <span className={`${styles.columnCount} ${styles.countPending}`}>
              {pendingCount}
            </span>
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

        <div className={`${styles.column} ${styles.colPreparing}`}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>Preparing</h3>
            <span className={`${styles.columnCount} ${styles.countPreparing}`}>
              {preparingCount}
            </span>
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

        <div className={`${styles.column} ${styles.colReady}`}>
          <div className={styles.columnHeader}>
            <h3 className={styles.columnTitle}>Ready</h3>
            <span className={`${styles.columnCount} ${styles.countReady}`}>
              {readyCount}
            </span>
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
