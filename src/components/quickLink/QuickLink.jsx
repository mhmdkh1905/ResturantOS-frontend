import { useNavigate } from "react-router-dom";
import styles from "./QuickLink.module.css";

export default function QuickLink({ label, icon: Icon, to, color }) {
  const navigate = useNavigate();
  return (
    <button className={styles.card} onClick={() => navigate(to)}>
      <div
        className={styles.iconBox}
        style={{ background: `${color}18`, color }}
      >
        <Icon size={20} />
      </div>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
