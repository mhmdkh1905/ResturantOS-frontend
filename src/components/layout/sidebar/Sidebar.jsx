import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  ChefHat,
  Grid2x2,
  Package,
  Users,
  Settings,
} from "lucide-react";
import NavItem from "./NavItem.jsx";
import { getUser } from "../../../utils/auth.js";
import logo from "../../../assets/logo.png";
import styles from "./Sidebar.module.css";

const navLinks = [
  {
    to: "/app/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    roles: ["admin"],
    end: true,
  },
  {
    to: "/app/orders",
    icon: ShoppingCart,
    roles: ["admin", "waiter"],
    label: "Orders",
  },
  {
    to: "/app/menu",
    icon: UtensilsCrossed,
    roles: ["admin", "waiter"],
    label: "Menu",
  },
  {
    to: "/app/kitchen",
    icon: ChefHat,
    roles: ["admin", "chef"],
    label: "Kitchen",
  },
  {
    to: "/app/tables",
    icon: Grid2x2,
    roles: ["admin", "waiter"],
    label: "Tables",
  },
  {
    to: "/app/inventory",
    icon: Package,
    roles: ["admin", "chef"],
    label: "Inventory",
  },
  { to: "/app/employees", icon: Users, roles: ["admin"], label: "Employees" },
];

export default function Sidebar({ isOpen, onClose }) {
  const user = getUser();
  const role = user?.role;

  const filteredLinks = navLinks.filter((item) => item.roles.includes(role));

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <img src={logo} alt="RestaurantOS logo" className={styles.logoImg} />
          <span className={styles.logoText}>RestaurantOS</span>
        </div>

        <nav className={styles.nav}>
          {filteredLinks.map((item) => (
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
