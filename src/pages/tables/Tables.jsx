import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TableCard from "../../components/cards/tableCard/TableCard.jsx";
import AddTableModal from "../../components/modals/addTableModal/AddTableModal.jsx";
import Toast from "../../components/ui/Toast.jsx";

import { useTables } from "../../hooks/useTables.js";

import styles from "./Tables.module.css";

export default function Tables() {
  const {
    tables,
    isLoading,
    addTable,
    deleteTableAsync,
    updateTableAsync,
    updateTableStatus,
    isError,
    error,
    addError,
    deleteError,
    updateError,
    updateStatusError,
  } = useTables();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeEditId, setActiveEditId] = useState(null);

  const anyError =
    error || addError || deleteError || updateError || updateStatusError;

  useEffect(() => {
    if (anyError) {
      const details = anyError.error?.details;

      let message = anyError.message;

      if (Array.isArray(details)) {
        message = details.map((e) => e.message).join(", ");
      }

      queueMicrotask(() => setToast({ message, type: "error" }));
    }
  }, [anyError]);

  const freeCount = tables.filter((t) => t.status === "free").length;
  const occupiedCount = tables.filter((t) => t.status === "occupied").length;
  const reservedCount = tables.filter((t) => t.status === "reserved").length;

  const handleAdd = ({ number, seats }) => {
    addTable({ number, seats });
    setShowModal(false);
    setToast({ message: "Table added successfully!", type: "success" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTableAsync(id);
      setToast({ message: "Table deleted successfully!", type: "success" });
    } catch {
      // Error is already handled by the mutation's onError and displayed via toast
    }
  };

  const handleStatusChange = (id, status) => {
    updateTableStatus({ id, status });
    setToast({ message: "Table status updated!", type: "success" });
  };

  const handleEdit = async (id, seats) => {
    setActiveEditId(id);
    try {
      await updateTableAsync({ id, data: { seats } });
      setToast({ message: "Table updated successfully!", type: "success" });
      setActiveEditId(null);
    } catch {
      // Error is already handled by the mutation's onError and displayed via toast
    }
  };

  if (isLoading) return <p className={styles.loading}>Loading tables...</p>;

  if (isError) {
    return <p className={styles.error}>{error.message}</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Tables</h1>
          <p className={styles.subtitle}>
            {freeCount} free · {occupiedCount} occupied · {reservedCount}{" "}
            reserved
          </p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add Table
        </button>
      </div>

      {tables.length === 0 ? (
        <div className={styles.empty}>
          No tables yet. Add one to get started.
        </div>
      ) : (
        <div className={styles.grid}>
          {tables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
              isUpdating={activeEditId === table.id}
              updateError={activeEditId === table.id ? updateError : null}
              updateStatusError={updateStatusError}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddTableModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
