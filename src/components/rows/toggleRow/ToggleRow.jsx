import styles from "./ToggleRow.module.css";

export default function ToggleRow({
  icon,
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <span className={styles.icon}>{icon}</span>
        <div>
          <p className={styles.label}>{label}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <button
        role="switch"
        aria-checked={checked}
        className={`${styles.toggle} ${checked ? styles.toggleOn : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
}
