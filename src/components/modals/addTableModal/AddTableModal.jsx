import { useState } from "react";
import { X } from "lucide-react";
import styles from "./AddTableModal.module.css";

export default function AddTableModal({ onAdd, onClose }) {
  const [tableNumber, setTableNumber] = useState("");
  const [seats, setSeats] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tableNumber) return;
    onAdd({ number: Number(tableNumber), seats: Number(seats) });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Table</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Table Number</label>
            <input
              type="number"
              className={styles.input}
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              min={1}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Seats</label>
            <input
              type="number"
              className={styles.input}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              min={1}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Add Table
          </button>
        </form>
      </div>
    </div>
  );
}
