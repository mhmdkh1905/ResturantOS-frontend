import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

export default function NavItem({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${styles.navItem} ${isActive ? styles.active : ""}`
      }
    >
      <span className={styles.icon}>
        <Icon size={18} />
      </span>
      <span className={styles.label}>{label}</span>
    </NavLink>
  );
}
