import { useState } from "react";
import { X } from "lucide-react";
import styles from "./AddItemModal.module.css";

const UNITS = ["piece", "kg", "liter", "g", "ml", "box"];

const EMPTY = {
  ingredientName: "",
  quantity: "",
  unit: "piece",
  minThreshold: "",
  costPerUnit: "",
  supplier: "",
};

export default function AddItemModal({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ingredientName: form.ingredientName,
      quantity: Number(form.quantity),
      unit: form.unit,
      minThreshold: Number(form.minThreshold),
      costPerUnit: Number(form.costPerUnit),
      supplier: form.supplier,
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Item</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              required
              value={form.ingredientName}
              onChange={(e) => set("ingredientName", e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Quantity</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                required
                value={form.quantity}
                onChange={(e) => set("quantity", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Unit</label>
              <select
                className={styles.input}
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
              >
                {UNITS.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Threshold</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                required
                value={form.minThreshold}
                onChange={(e) => set("minThreshold", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Cost / Unit ($)</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                step="0.01"
                required
                value={form.costPerUnit}
                onChange={(e) => set("costPerUnit", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Supplier</label>
            <input
              className={styles.input}
              required
              value={form.supplier}
              onChange={(e) => set("supplier", e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
