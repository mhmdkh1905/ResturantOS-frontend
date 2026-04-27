import { useState } from "react";
import { X } from "lucide-react";
import styles from "./AddEmployeeModal.module.css";

const ROLES = ["Admin", "Chef", "Waiter"];
const EMPTY = {
  name: "",
  role: "Waiter",
  phoneNumber: "",
  email: "",
  workedHours: "",
  salaryPerHour: "",
};

export default function AddEmployeeModal({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name: form.name,
      role: form.role,
      phoneNumber: form.phoneNumber,
      email: form.email,
      workedHours: Number(form.workedHours),
      salaryPerHour: Number(form.salaryPerHour),
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Employee</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <input
              className={styles.input}
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Role</label>
            <select
              className={styles.input}
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Phone</label>
              <input
                className={styles.input}
                required
                value={form.phoneNumber}
                onChange={(e) => set("phoneNumber", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Hours Worked</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                required
                value={form.workedHours}
                onChange={(e) => set("workedHours", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Salary / Hour ($)</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                required
                value={form.salaryPerHour}
                onChange={(e) => set("salaryPerHour", e.target.value)}
              />
            </div>
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
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
