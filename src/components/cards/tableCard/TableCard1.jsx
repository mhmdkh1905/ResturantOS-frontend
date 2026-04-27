import { useState, useRef, useEffect } from "react";
import { Users, Trash2, ChevronDown, Pencil, Check, X } from "lucide-react";
import styles from "./TableCard.module.css";

const STATUS_OPTIONS = ["free", "occupied", "reserved"];
const STATUS_META = {
  free: { label: "Free" },
  occupied: { label: "Occupied" },
  reserved: { label: "Reserved" },
};

export default function TableCard({ table, onDelete, onStatusChange, onEdit }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [seatsVal, setSeatsVal] = useState(table.seats);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleEditSave = () => {
    if (seatsVal >= 1) onEdit(table.id, Number(seatsVal));
    setEditing(false);
  };

  const handleEditCancel = () => {
    setSeatsVal(table.seats);
    setEditing(false);
  };

  const meta = STATUS_META[table.status];

  return (
    <div className={`${styles.card} ${styles[table.status]}`}>
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={() => {
            setEditing(true);
            setDropdownOpen(false);
          }}
          aria-label="Edit table"
        >
          <Pencil size={12} />
        </button>
        <button
          className={`${styles.iconBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(table.id)}
          aria-label="Delete table"
        >
          <Trash2 size={12} />
        </button>
      </div>

      <div
        className={`${styles.numberBadge} ${styles[`badge_${table.status}`]}`}
      >
        {table.number}
      </div>

      <div className={styles.statusWrapper} ref={dropdownRef}>
        <button
          className={`${styles.statusBadge} ${styles[`status_${table.status}`]}`}
          onClick={() => setDropdownOpen((p) => !p)}
        >
          <span className={`${styles.dot} ${styles[`dot_${table.status}`]}`} />
          {meta.label}
          <ChevronDown
            size={11}
            className={dropdownOpen ? styles.chevronOpen : ""}
          />
        </button>

        {dropdownOpen && (
          <div className={styles.dropdown}>
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                className={`${styles.dropdownItem} ${s === table.status ? styles.dropdownActive : ""}`}
                onClick={() => {
                  onStatusChange(table.id, s);
                  setDropdownOpen(false);
                }}
              >
                <span className={`${styles.dot} ${styles[`dot_${s}`]}`} />
                {STATUS_META[s].label}
              </button>
            ))}
          </div>
        )}
      </div>

      {editing ? (
        <div className={styles.editRow}>
          <Users size={13} />
          <input
            className={styles.seatsInput}
            type="number"
            min={1}
            value={seatsVal}
            onChange={(e) => setSeatsVal(e.target.value)}
            autoFocus
          />
          <button
            className={`${styles.iconBtn} ${styles.saveBtn}`}
            onClick={handleEditSave}
          >
            <Check size={12} />
          </button>
          <button
            className={`${styles.iconBtn} ${styles.cancelBtn}`}
            onClick={handleEditCancel}
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <div className={styles.seats}>
          <Users size={13} />
          {table.seats} seats
        </div>
      )}
    </div>
  );
}
