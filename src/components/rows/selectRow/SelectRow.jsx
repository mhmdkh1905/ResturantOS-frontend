import styles from "./SelectRow.module.css";

export default function SelectRow({
  icon,
  label,
  description,
  value,
  onChange,
  options,
}) {
  const selected = options.find((o) => o.value === value);

  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <span className={styles.icon}>{icon}</span>
        <div>
          <p className={styles.label}>{label}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.flag} {o.label}
            </option>
          ))}
        </select>
        <svg className={styles.chevron} viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          />
        </svg>
      </div>
    </div>
  );
}
