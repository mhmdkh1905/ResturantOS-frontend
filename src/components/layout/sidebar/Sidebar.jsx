import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  ChefHat,
  Grid2x2,
  Package,
  Users,
  BarChart2,
  Settings,
} from "lucide-react";
import NavItem from "./NavItem.jsx";
import logo from "../../../assets/logo.png";
import styles from "./Sidebar.module.css";

const userRole = localStorage.getItem('userRole') || 'admin';

const navLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
];

if (['admin', 'waiter'].includes(userRole)) {
  navLinks.push({ to: "/orders", icon: ShoppingCart, label: "Orders" });
}

if (['admin', 'chef'].includes(userRole)) {
  navLinks.push({ to: "/kitchen", icon: ChefHat, label: "Kitchen" });
}

navLinks.push(
  { to: "/menu", icon: UtensilsCrossed, label: "Menu" },
  { to: "/tables", icon: Grid2x2, label: "Tables" },
  { to: "/inventory", icon: Package, label: "Inventory" },
  { to: "/employees", icon: Users, label: "Employees" },
  { to: "/analytics", icon: BarChart2, label: "Analytics" }
);

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <img src={logo} alt="RestaurantOS logo" className={styles.logoImg} />
          <span className={styles.logoText}>RestaurantOS</span>
        </div>

        <nav className={styles.nav}>
          {navLinks.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        <div className={styles.bottom}>
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </div>
      </aside>
    </>
  );
}
