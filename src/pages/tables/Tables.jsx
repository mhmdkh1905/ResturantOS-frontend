import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TableCard from "../../components/cards/tableCard/TableCard.jsx";
import AddTableModal from "../../components/modals/addTableModal/AddTableModal.jsx";

import Toast from "../../components/ui/Toast.jsx";

import { useTables } from "../../hooks/useTables.js";

import styles from "./Tables.module.css";

function TablesSkeleton() {
  const sk = styles.skeleton;
  return (
    <div className={styles.page} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading tables…</span>
      <div className={styles.header}>
        <div>
          <div className={`${sk} ${styles.skTitle}`} aria-hidden />
          <div className={`${sk} ${styles.skSubtitle}`} aria-hidden />
        </div>
        <div className={`${sk} ${styles.skBtn}`} aria-hidden />
      </div>
      <div className={styles.grid} aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.skTile} />
        ))}
      </div>
    </div>
  );
}

export default function Tables() {
  const {
    tables,
    isLoading,
    addTable,
    deleteTable,
    updateTable,
    updateTableStatus,
    isError,
    error,
    addError,
    deleteError,
    updateError,
    updateStatusError,
    addSuccess,
    deleteSuccess,
    updateSuccess,
    updateStatusSuccess,
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

      setToast({
        message,
        type: "error",
      });
    }
  }, [anyError]);

  const successMessage =
    (addSuccess && "Table added successfully!") ||
    (deleteSuccess && "Table deleted successfully!") ||
    (updateSuccess && "Table updated successfully!") ||
    (updateStatusSuccess && "Table status updated!");

  useEffect(() => {
    if (successMessage) {
      setToast({
        message: successMessage,
        type: "success",
      });

      if (updateSuccess) {
        setActiveEditId(null);
      }
    }
  }, [successMessage, updateSuccess]);

  const freeCount = tables.filter((t) => t.status === "free").length;
  const occupiedCount = tables.filter((t) => t.status === "occupied").length;
  const reservedCount = tables.filter((t) => t.status === "reserved").length;

  const handleAdd = ({ number, seats }) => {
    addTable({ number, seats });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteTable(id);
  };

  const handleStatusChange = (id, status) => {
    updateTableStatus({ id, status });
  };

  const handleEdit = (id, seats) => {
    setActiveEditId(id);
    updateTable({ id, data: { seats } });
  };

  if (isLoading) return <TablesSkeleton />;

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
          {tables
            .slice()
            .sort((a, b) => a.number - b.number)
            .map((table) => (
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
