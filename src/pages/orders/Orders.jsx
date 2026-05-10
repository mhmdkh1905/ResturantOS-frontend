import { useState } from "react";
import { Search, Filter, Plus, RefreshCw } from "lucide-react";
import { useOrders } from "../../hooks/useOrders.js";
import { useTables } from "../../hooks/useTables.js";
import CreateOrderModal from "../../components/modals/createOrderModal/CreateOrderModal.jsx";
import OrderCard from "../../components/cards/orderCard/OrderCard.jsx";
import styles from "./Orders.module.css";

function OrdersSkeletonCard() {
  const sk = styles.shimmer;
  return (
    <div className={styles.skOrderCard} aria-hidden>
      <div className={styles.skOrderTop}>
        <div className={`${sk} ${styles.skOrderLineL}`} />
        <div className={`${sk} ${styles.skOrderLineR}`} />
      </div>
      <div className={`${sk} ${styles.skOrderBadge}`} />
      <div className={styles.skOrderLines}>
        <div className={`${sk} ${styles.skOrderRow}`} />
        <div className={`${sk} ${styles.skOrderRow}`} />
      </div>
      <div className={`${sk} ${styles.skOrderNotes}`} />
    </div>
  );
}

function OrdersSkeleton() {
  const sk = styles.shimmer;
  return (
    <div className={styles.page} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading orders…</span>
      <div className={styles.header}>
        <div>
          <div className={`${sk} ${styles.skTitle}`} aria-hidden />
          <div className={`${sk} ${styles.skSubtitle}`} aria-hidden />
        </div>
        <div className={styles.headerActions}>
          <div className={`${sk} ${styles.skIconBtn}`} aria-hidden />
          <div className={`${sk} ${styles.skNewOrderBtn}`} aria-hidden />
        </div>
      </div>

      <div className={styles.statCards}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.skStatCard} aria-hidden>
            <div className={`${sk} ${styles.skStatLabel}`} />
            <div className={`${sk} ${styles.skStatValue}`} />
          </div>
        ))}
      </div>

      <div className={styles.filters}>
        <div className={`${sk} ${styles.skSearch}`} aria-hidden />
        <div className={styles.skFilterBtns}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`${sk} ${styles.skFilterChip}`} aria-hidden />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <OrdersSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Orders() {
  const { orders, loading, error, refetch, createOrder } = useOrders();
  const { tables } = useTables();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTable, setSearchTable] = useState("");

  const tableNumberById = new Map((tables || []).map((t) => [t.id, t.number]));

  const ordersWithTableNumber = orders.map((order) => ({
    ...order,
    tableNumber: order.tableNumber ?? tableNumberById.get(order.tableId),
  }));

  const filteredOrders = ordersWithTableNumber.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const tableNum = order.tableNumber ?? "";
    const matchesTable =
      !searchTable || tableNum.toString().includes(searchTable);
    return matchesStatus && matchesTable;
  });

  const activeCount = orders.filter((o) =>
    ["pending", "preparing"].includes(o.status),
  ).length;
  const totalToday = orders.reduce(
    (sum, o) => sum + (o.totalPrice || o.total || 0),
    0,
  );
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const preparingCount = orders.filter((o) => o.status === "preparing").length;
  const readyCount = orders.filter((o) => o.status === "ready").length;

  if (loading) {
    return <OrdersSkeleton />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Orders</h1>

        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} onClick={refetch} title="Refresh">
            <RefreshCw size={18} />
          </button>
          <button
            className={styles.newOrderBtn}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} /> New Order
          </button>
        </div>
      </div>

      <div className={styles.statCards}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Pending</div>
          <div className={styles.statValue}>{pendingCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Preparing</div>
          <div className={styles.statValue}>{preparingCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Ready</div>
          <div className={styles.statValue}>{readyCount}</div>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search by table number..."
            value={searchTable}
            onChange={(e) => setSearchTable(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterBtns}>
          <button
            className={`${styles.filterBtn} ${filterStatus === "all" ? styles.active : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            <Filter size={16} /> All
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === "pending" ? styles.active : ""}`}
            onClick={() => setFilterStatus("pending")}
          >
            Pending <span className={styles.pill}>{pendingCount}</span>
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === "preparing" ? styles.active : ""}`}
            onClick={() => setFilterStatus("preparing")}
          >
            Preparing <span className={styles.pill}>{preparingCount}</span>
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === "ready" ? styles.active : ""}`}
            onClick={() => setFilterStatus("ready")}
          >
            Ready <span className={styles.pill}>{readyCount}</span>
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

      {showSuccess && (
        <div className={styles.successToast}>
          ✅ Order created successfully! Refreshing...
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className={styles.empty}>
          {orders.length === 0 ? (
            <>
              <h3>No orders yet</h3>
              <p>Create the first order with the button above.</p>
            </>
          ) : (
            <>
              <h3>No orders match your filters</h3>
              <p>Try adjusting your search or status filter.</p>
            </>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} isUpdating={false} />
          ))}
        </div>
      )}

      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setShowSuccess(false);
        }}
        onCreate={async (orderData) => {
          try {
            await createOrder(orderData);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
          } catch (err) {
            console.error("Order creation failed", err);
          }
        }}
      />
    </div>
  );
}
