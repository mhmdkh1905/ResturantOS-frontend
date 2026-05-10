import { ShoppingCart, ChefHat, Grid2x2 } from "lucide-react";
import StatCard from "../../components/cards/statCard/StatCard.jsx";
import WeeklyRevenueChart from "../../components/charts/weeklyRevenueChart/WeeklyRevenueChart.jsx";
import RecentOrders from "../../components/rows/recentOrdersRow/RecentOrders.jsx";
import QuickLink from "../../components/quickLink/QuickLink.jsx";
import { useDashboard } from "../../hooks/useDashboard.js";

import styles from "./Dashboard.module.css";

const QUICK_LINKS = [
  { label: "Orders", icon: ShoppingCart, to: "/orders", color: "#f97316" },
  { label: "Kitchen", icon: ChefHat, to: "/kitchen", color: "#f97316" },
  { label: "Tables", icon: Grid2x2, to: "/tables", color: "#3b82f6" },
];

function DashboardSkeleton() {
  const sk = styles.skeleton;
  return (
    <div className={styles.page}>
      <span className={styles.srOnly}>Loading dashboard…</span>
      <div className={styles.header}>
        <div>
          <div className={`${sk} ${styles.skTitle}`} aria-hidden />
          <div className={`${sk} ${styles.skSubtitle}`} aria-hidden />
        </div>
      </div>

      <div className={styles.statGrid}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.skStat} aria-hidden />
        ))}
      </div>

      <div className={styles.midRow}>
        <div className={styles.skChart} aria-hidden />
        <div className={styles.skPanel} aria-hidden />
      </div>

      <div className={styles.quickGrid}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.skQuick} aria-hidden />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data, isLoading, isError, error, refetch } = useDashboard();

  if (isLoading) {
    return (
      <div role="status" aria-live="polite">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError) {
    const message =
      error?.message || "We couldn't load the dashboard. Try again.";
    return (
      <div className={styles.stateWrap}>
        <div className={`${styles.stateCard} ${styles.stateCardError}`}>
          <p className={styles.stateTitle}>Something went wrong</p>
          <p className={styles.stateHint}>{message}</p>
          <button
            type="button"
            className={styles.retryBtn}
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    totalOrders,
    todayIncome,
    activeOrders,
    lowStock,
    weeklyRevenue,
    recentOrders,
  } = data;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back 👋</h1>
          <p className={styles.subtitle}>Here's what's happening today</p>
        </div>
      </div>

      <div className={styles.statGrid}>
        <StatCard label="Total Orders" value={totalOrders} />
        <StatCard label="Today's Income" value={`$${todayIncome.toFixed(2)}`} />
        <StatCard label="Active Orders" value={activeOrders} />
        <StatCard label="Low Stock" value={lowStock} />
      </div>

      <div className={styles.midRow}>
        <WeeklyRevenueChart data={weeklyRevenue} />
        <RecentOrders orders={recentOrders} />
      </div>

      <div className={styles.quickGrid}>
        {QUICK_LINKS.map((link) => (
          <QuickLink key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
}
