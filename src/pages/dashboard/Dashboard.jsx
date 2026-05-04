import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  DollarSign,
  Flame,
  Package,
  ChefHat,
  Grid2x2,
  BarChart2,
  Plus,
} from "lucide-react";
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
  { label: "Analytics", icon: BarChart2, to: "/analytics", color: "#10b981" },
];

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();
  const navigate = useNavigate();

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (isError) return <p className={styles.error}>Error loading dashboard</p>;

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
