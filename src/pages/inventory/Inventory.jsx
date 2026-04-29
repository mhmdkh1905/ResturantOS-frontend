import { useState, useEffect } from "react";
import { Plus, AlertTriangle, Search } from "lucide-react";
import InventoryRow from "../../components/rows/inventoryRow/InventoryRow.jsx";
import AddItemModal from "../../components/modals/addItemModal/AddItemModal.jsx";
import Toast from "../../components/ui/Toast.jsx";
import styles from "./Inventory.module.css";

import { useInventory } from "../../hooks/useInventory.js";

export default function Inventory() {
  const {
    inventory,
    addInventoryItemAsync,
    updateInventoryItemAsync,
    deleteInventoryItemAsync,
    addError,
    updateError,
    deleteError,
  } = useInventory();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const lowStockCount = inventory.filter((i) => i.isLowStock).length;

  const filtered = inventory.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.supplier.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = async (item) => {
    try {
      await addInventoryItemAsync(item);
      setShowModal(false);
      setToast({ message: "Item added successfully!", type: "success" });
    } catch {
      // Error is already handled by the mutation's onError and displayed via toast
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInventoryItemAsync(id);
      setToast({ message: "Item deleted successfully!", type: "success" });
    } catch {
      // Error is already handled by the mutation's onError and displayed via toast
    }
  };

  const handleEdit = async (id, updated) => {
    try {
      await updateInventoryItemAsync({ id, data: updated });
      setToast({ message: "Item updated successfully!", type: "success" });
    } catch {
      // Error is already handled by the mutation's onError and displayed via toast
    }
  };

  const hideToast = () => {
    setToast(null);
  };

  const anyerror = addError || updateError || deleteError;

  useEffect(() => {
    if (anyerror) {
      queueMicrotask(() =>
        setToast({ message: anyerror.message || "An error occurred", type: "error" })
      );
    }
  }, [anyerror]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inventory</h1>
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
                key={item.id}
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
