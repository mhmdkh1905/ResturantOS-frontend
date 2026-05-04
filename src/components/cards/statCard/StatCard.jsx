import styles from "./StatCard.module.css";

export default function StatCard({ label, value, icon, iconColor, iconBg }) {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
      </div>
      <div
        className={styles.iconBox}
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
    </div>
  );
}
