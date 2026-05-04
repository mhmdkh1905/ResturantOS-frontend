import { Link } from "react-router-dom";
import styles from "./RecentOrders.module.css";

const STATUS_META = {
  ready: { label: "Ready", color: "#10b981", bg: "#ecfdf5" },
  served: { label: "Served", color: "#9333ea", bg: "#f3e8ff" },
  pending: { label: "Pending", color: "#f97316", bg: "#fff7ed" },
  preparing: { label: "Preparing", color: "#eab308", bg: "#fefce8" },
};

export default function RecentOrders({ orders }) {
  console.log(orders);
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Recent Orders</h2>
        <Link to="/orders" className={styles.viewAll}>
          View all
        </Link>
      </div>

      <div className={styles.list}>
        {orders.map((order) => {
          const meta =
            STATUS_META[order.status.toLowerCase()] ?? STATUS_META.pending;
          return (
            <div key={order.id} className={styles.row}>
              <div className={styles.orderInfo}>
                <p className={styles.orderId}>{order.id}</p>
                <p className={styles.tableLabel}>Table {order.table}</p>
              </div>
              <div className={styles.right}>
                <span
                  className={styles.badge}
                  style={{ color: meta.color, background: meta.bg }}
                >
                  <span
                    className={styles.dot}
                    style={{ background: meta.color }}
                  />
                  {meta.label}
                </span>
                <span className={styles.total}>${order.total.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
