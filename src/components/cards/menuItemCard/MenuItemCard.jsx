import { useState } from "react";
import { Pencil, Trash2, Check, X, ChefHat } from "lucide-react";
import styles from "./MenuItemCard.module.css";

export default function MenuItemCard({
  item,
  onDelete,
  onEdit,
  isUpdating,
  updateError,
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: item.name,
    price: item.price,
    category: item.category,
    image: item.image || "",
  });

  const handleSave = () => {
    onEdit(item.id, {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image || "",
    });
    setEditing(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {item.image ? (
          <img src={item.image} alt={item.name} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <ChefHat size={32} />
          </div>
        )}
        <div className={styles.categoryBadge}>{item.category}</div>
      </div>

      <div className={styles.content}>
        {editing ? (
          <div className={styles.editForm}>
            <input
              className={styles.input}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Name"
            />
            <input
              className={styles.input}
              type="number"
              min={0}
              step="0.01"
              value={form.price}
              onChange={(e) =>
                setForm((p) => ({ ...p, price: e.target.value }))
              }
              placeholder="Price"
            />
            <input
              className={styles.input}
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              placeholder="Category"
            />
            <input
              className={styles.input}
              value={form.image}
              onChange={(e) =>
                setForm((p) => ({ ...p, image: e.target.value }))
              }
              placeholder="Image URL"
            />
            {updateError && (
              <p className={styles.errorText}>{updateError.message}</p>
            )}
            <div className={styles.editActions}>
              <button
                className={`${styles.iconBtn} ${styles.saveBtn}`}
                onClick={handleSave}
                disabled={isUpdating}
              >
                {isUpdating ? "..." : <Check size={14} />}
              </button>
              <button
                className={`${styles.iconBtn} ${styles.cancelBtn}`}
                onClick={handleCancel}
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.headerRow}>
              <h3 className={styles.name}>{item.name}</h3>
              <span className={styles.price}>${item.price.toFixed(2)}</span>
            </div>

            {item.recipe && item.recipe.length > 0 && (
              <div className={styles.recipe}>
                <span className={styles.recipeLabel}>Recipe:</span>
                <ul className={styles.recipeList}>
                  {item.recipe.map((ing, idx) => (
                    <li key={idx}>
                      {ing.ingredientName} — {ing.quantity} {ing.unit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.actions}>
              <button
                className={styles.iconBtn}
                onClick={() => setEditing(true)}
                aria-label="Edit item"
              >
                <Pencil size={14} />
              </button>
              <button
                className={`${styles.iconBtn} ${styles.deleteBtn}`}
                onClick={() => onDelete(item.id)}
                aria-label="Delete item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

