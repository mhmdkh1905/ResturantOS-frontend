import { useState, useRef, useEffect } from "react";
import { Users, Trash2, ChevronDown, Pencil, Check, X } from "lucide-react";
import styles from "./TableCard.module.css";

const STATUS_META = {
  free: { label: "Free" },
  occupied: { label: "Occupied" },
  reserved: { label: "Reserved" },
};

export default function TableCard({
  table,
  onDelete,
  onStatusChange,
  onEdit,
  isUpdating,
  updateError,
  updateStatusError,
}) {
  const [editing, setEditing] = useState(false);

  const [seatsVal, setSeatsVal] = useState(table.seats);

  const handleEditSave = () => {
    if (seatsVal >= 1) {
      onEdit(table.id, Number(seatsVal));
      setEditing(false);
    }
  };

  const handleEditCancel = () => {
    setSeatsVal(table.seats);
    setEditing(false);
  };

  const handleStatusToggle = () => {
    const nextStatus =
      table.status === "free"
        ? "occupied"
        : table.status === "occupied"
          ? "reserved"
          : "free";
    onStatusChange(table.id, nextStatus);
  };

  const getNextStatus = (current) => {
    if (current === "free") return "occupied";
    if (current === "occupied") return "reserved";
    return "free";
  };

  const meta = STATUS_META[table.status];

  return (
    <div className={`${styles.card} ${styles[table.status]}`}>
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={() => {
            setEditing(true);
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

      <div className={styles.statusWrapper}>
        <button
          className={`${styles.statusBadge} ${styles[`status_${table.status}`]}`}
          onClick={handleStatusToggle}
        >
          <span className={`${styles.dot} ${styles[`dot_${table.status}`]}`} />
          {meta.label}
        </button>
      </div>

      {editing ? (
        <>
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
              disabled={isUpdating}
            >
              {isUpdating ? "..." : <Check size={12} />}
            </button>
            <button
              className={`${styles.iconBtn} ${styles.cancelBtn}`}
              onClick={handleEditCancel}
            >
              <X size={12} />
            </button>
          </div>

          {updateError && (
            <p className={styles.errorText}>{updateError.message}</p>
          )}
          {updateStatusError && (
            <p className={styles.errorText}>{updateStatusError.message}</p>
          )}
        </>
      ) : (
        <div className={styles.seats}>
          <Users size={13} />
          {table.seats} seats
        </div>
      )}
    </div>
  );
}
