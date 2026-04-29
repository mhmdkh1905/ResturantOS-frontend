import { useState, useEffect, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import MenuItemCard from "../../components/cards/menuItemCard/MenuItemCard.jsx";
import AddMenuItemModal from "../../components/modals/addMenuItemModal/AddMenuItemModal.jsx";
import Toast from "../../components/ui/Toast.jsx";
import { useMenu } from "../../hooks/useMenu.js";
import styles from "./Menu.module.css";

const ALL_CATEGORIES = ["All", "Main Course", "Appetizer", "Dessert", "Drink", "Salad", "Soup"];

export default function Menu() {
  const {
    menuItems,
    isLoading,
    isError,
    error,
    addMenuItemAsync,
    deleteMenuItemAsync,
    updateMenuItemAsync,
    addError,
    deleteError,
    updateError,
  } = useMenu();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeEditId, setActiveEditId] = useState(null);

  const categories = useMemo(() => {
    const unique = [...new Set(menuItems.map((i) => i.category))];
    return ["All", ...unique.filter((c) => c !== "All")];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menuItems, search, activeCategory]);

  const anyError = error || addError || deleteError || updateError;

  useEffect(() => {
    if (anyError) {
      let message = anyError.message;
      const details = anyError.error?.details;
      if (Array.isArray(details)) {
        message = details.map((e) => e.message).join(", ");
      }
      queueMicrotask(() => setToast({ message, type: "error" }));
    }
  }, [anyError]);

  const handleAdd = async (item) => {
    try {
      await addMenuItemAsync(item);
      setShowModal(false);
      setToast({ message: "Menu item added successfully!", type: "success" });
    } catch {
      // Error is already handled by the mutation's onError and displayed via toast
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenuItemAsync(id);
      setToast({ message: "Menu item deleted successfully!", type: "success" });
    } catch {
      // Error is already handled by the mutation's onError and displayed via toast
    }
  };

  const handleEdit = async (id, data) => {
    setActiveEditId(id);
    try {
      await updateMenuItemAsync({ id, data });
      setToast({ message: "Menu item updated successfully!", type: "success" });
      setActiveEditId(null);
    } catch {
      // Error is already handled by the mutation's onError and displayed via toast
    }
  };

  if (isLoading) return <p className={styles.loading}>Loading menu...</p>;
  if (isError) return <p className={styles.error}>{error.message}</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Menu</h1>
          <p className={styles.subtitle}>
            {menuItems.length} item{menuItems.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Search size={15} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.categoryTabs}>
          {(categories.length > 1 ? categories : ALL_CATEGORIES).map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className={styles.empty}>
          {menuItems.length === 0
            ? "No menu items yet. Add one to get started."
            : "No items match your search."}
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isUpdating={activeEditId === item.id}
              updateError={activeEditId === item.id ? updateError : null}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddMenuItemModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
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

