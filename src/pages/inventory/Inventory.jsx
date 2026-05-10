import { useState, useEffect } from "react";
import { Plus, AlertTriangle, Search } from "lucide-react";
import InventoryRow from "../../components/rows/inventoryRow/InventoryRow.jsx";
import AddItemModal from "../../components/modals/addItemModal/AddItemModal.jsx";
import Toast from "../../components/ui/Toast.jsx";
import styles from "./Inventory.module.css";

import { useInventory } from "../../hooks/useInventory.js";

function InventorySkeleton() {
  const sk = styles.skeleton;
  const rowDefs = ["24%", "10%", "8%", "10%", "14%", "10%", "18%", "6%"];

  return (
    <div className={styles.page} role="status" aria-live="polite">
      <span className={styles.srOnly}>Loading inventory…</span>
      <div className={styles.header}>
        <div>
          <div className={`${sk} ${styles.skTitle}`} aria-hidden />
          <div className={`${sk} ${styles.skSubtitle}`} aria-hidden />
        </div>
        <div className={`${sk} ${styles.skBtn}`} aria-hidden />
      </div>

      <div className={`${sk} ${styles.skSearch}`} aria-hidden />

      <div className={`${styles.tableWrapper} ${styles.skTableOuter}`}>
        <div className={styles.skHeadRow}>
          {rowDefs.map((w, i) => (
            <div
              key={i}
              className={`${sk} ${styles.skHeadChip}`}
              style={{ width: w }}
              aria-hidden
            />
          ))}
        </div>
        <div className={styles.skBody}>
          {Array.from({ length: 9 }).map((_, ri) => (
            <div key={ri} className={styles.skDataRow}>
              {rowDefs.map((w, ci) => (
                <div
                  key={ci}
                  className={`${sk} ${styles.skCell}`}
                  style={{ width: w }}
                  aria-hidden
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Inventory() {
  const {
    inventory,
    isLoading,
    isError,
    error,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    addSuccess,
    addError,
    updateSuccess,
    updateError,
    deleteSuccess,
    deleteError,
  } = useInventory();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const lowStockCount = inventory.filter((i) => i?.isLowStock).length;

  const filtered = inventory.filter((i) => {
    const name = (i.ingredientName || "").toLowerCase();
    const supplier = (i.supplier || "").toLowerCase();
    const q = search.toLowerCase();

    return name.includes(q) || supplier.includes(q);
  });

  const handleAdd = (item) => {
    addInventoryItem(item);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteInventoryItem(id);
  };

  const handleEdit = (id, updated) => {
    updateInventoryItem({ id, data: updated });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const anyerror = addError || updateError || deleteError;

  useEffect(() => {
    if (anyerror) {
      showToast(anyerror.message || "An error occurred", "error");
    }
  }, [anyerror]);

  const successMessage =
    (addSuccess && "Item added successfully!") ||
    (updateSuccess && "Item updated successfully!") ||
    (deleteSuccess && "Item deleted successfully!");

  useEffect(() => {
    if (successMessage) {
      showToast(successMessage, "success");
    }
  }, [successMessage]);

  if (isLoading) {
    return <InventorySkeleton />;
  }

  if (isError) {
    return (
      <p className={styles.error}>Error loading inventory: {error.message}</p>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inventory</h1>
          <p className={styles.subtitle}>
            Ingredients, thresholds, supplier costs — in one ledger.
          </p>
          {lowStockCount > 0 && (
            <p className={styles.lowStock}>
              <AlertTriangle size={14} />
              {lowStockCount} item{lowStockCount > 1 ? "s" : ""} low on stock
            </p>
          )}
        </div>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <div className={styles.searchWrapper}>
        <Search size={15} className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Threshold</th>
              <th>Stock Level</th>
              <th>Cost/Unit</th>
              <th>Supplier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <InventoryRow
                key={item._id}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className={styles.empty}>No items found.</p>
        )}
      </div>

      {showModal && (
        <AddItemModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
