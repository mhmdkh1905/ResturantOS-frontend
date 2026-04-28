import styles from "./SettingsSection.module.css";

export default function SettingsSection({ label, children }) {
  return (
    <div className={styles.section}>
      <p className={styles.sectionLabel}>{label}</p>
      {children}
    </div>
  );
}
