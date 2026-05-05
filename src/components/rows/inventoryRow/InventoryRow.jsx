import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import styles from "./InventoryRow.module.css";

const UNITS = ["piece", "kg", "liter", "g", "ml", "box"];

export default function InventoryRow({ item, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...item });

  const isLow = item.quantity <= item.minThreshold;
  const stockPct = Math.min((item.quantity / item.minThreshold) * 100, 100);

  const handleSave = () => {
    onEdit(item._id, {
      ingredientName: form.ingredientName,
      quantity: Number(form.quantity),
      unit: form.unit,
      minThreshold: Number(form.minThreshold),
      costPerUnit: Number(form.costPerUnit),
      supplier: form.supplier,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...item });
    setEditing(false);
  };

  const field = (key, type = "text", width = "80px") => (
    <input
      className={styles.editInput}
      style={{ width }}
      type={type}
      value={form[key]}
      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
    />
  );

  if (editing) {
    return (
      <tr className={styles.editingRow}>
        <td>{field("ingredientName", "text", "120px")}</td>
        <td>{field("quantity", "number", "60px")}</td>
        <td>
          <select
            className={styles.editInput}
            style={{ width: "70px" }}
            value={form.unit}
            onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))}
          >
            {UNITS.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </td>
        <td>{field("minThreshold", "number", "60px")}</td>
        <td>—</td>
        <td>{field("costPerUnit", "number", "70px")}</td>
        <td>{field("supplier", "text", "140px")}</td>
        <td>
          <div className={styles.actionBtns}>
            <button
              className={`${styles.btn} ${styles.saveBtn}`}
              onClick={handleSave}
            >
              <Check size={14} />
            </button>
            <button
              className={`${styles.btn} ${styles.cancelBtn}`}
              onClick={handleCancel}
            >
              <X size={14} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className={styles.nameCell}>
        {isLow && <AlertTriangle size={13} className={styles.warnIcon} />}
        <span className={isLow ? styles.lowName : ""}>
          {item.ingredientName}
        </span>
      </td>
      <td className={isLow ? styles.lowQty : styles.qty}>{item.quantity}</td>
      <td className={styles.muted}>{item.unit}</td>
      <td className={styles.muted}>{item.minThreshold}</td>
      <td className={styles.stockCell}>
        <div className={styles.barTrack}>
          <div
            className={`${styles.barFill} ${isLow ? styles.barLow : ""}`}
            style={{ width: `${stockPct}%` }}
          />
        </div>
      </td>
      <td className={styles.muted}>${item.costPerUnit.toFixed(2)}</td>
      <td className={styles.muted}>{item.supplier}</td>
      <td>
        <div className={styles.actionBtns}>
          <button
            className={`${styles.btn} ${styles.editBtn}`}
            onClick={() => setEditing(true)}
          >
            <Pencil size={14} />
          </button>
          <button
            className={`${styles.btn} ${styles.deleteBtn}`}
            onClick={() => onDelete(item._id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
