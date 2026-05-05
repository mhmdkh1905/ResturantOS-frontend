import { useState } from "react";
import { Pencil, Trash2, Check, X, ChefHat, Plus } from "lucide-react";
import { useInventory } from "../../../hooks/useInventory.js";
import styles from "./MenuItemCard.module.css";

const normalizeIngredients = (ingredients = []) =>
  ingredients.map((ing) => ({
    ingredientId:
      ing.ingredientId?._id ?? ing.ingredientId?.id ?? ing.ingredientId ?? "",
    quantity: ing.quantity ?? "",
  }));

const EMPTY_INGREDIENT = {
  ingredientId: "",
  quantity: "",
};

export default function MenuItemCard({
  item,
  onDelete,
  onEdit,
  isUpdating,
  updateError,
}) {
  const { inventory } = useInventory();
  const itemId = item._id || item.id;
  const price = Number(item.price ?? 0);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: item.name || "",
    price,
    category: item.category || "",
    image: item.image || "",
    isAvailable: item.isAvailable ?? true,
    ingredients: normalizeIngredients(item.ingredients),
  });

  const setIngredient = (idx, key, value) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === idx ? { ...ing, [key]: value } : ing,
      ),
    }));
  };

  const addIngredient = () => {
    setForm((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ...EMPTY_INGREDIENT }],
    }));
  };

  const removeIngredient = (idx) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = () => {
    onEdit(itemId, {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image,
      isAvailable: form.isAvailable,
      ingredients: form.ingredients
        .filter((ing) => ing.ingredientId && ing.quantity)
        .map((ing) => ({
          ingredientId: ing.ingredientId,
          quantity: Number(ing.quantity),
        })),
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      name: item.name || "",
      price,
      category: item.category || "",
      image: item.image || "",
      isAvailable: item.isAvailable ?? true,
      ingredients: normalizeIngredients(item.ingredients),
    });
    setEditing(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {item.image ? (
          <img src={item.image} alt={item.name || "Menu item"} className={styles.image} />
        ) : (
          <div className={styles.placeholder}>
            <ChefHat size={32} />
          </div>
        )}
        <div className={styles.categoryBadge}>{item.category || "Item"}</div>
      </div>

      <div className={styles.content}>
        {editing ? (
          <div className={styles.editForm}>
            <input
              className={`${styles.input} ${styles.fullWidth}`}
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
              className={`${styles.input} ${styles.fullWidth}`}
              value={form.image}
              onChange={(e) =>
                setForm((p) => ({ ...p, image: e.target.value }))
              }
              placeholder="Image URL"
            />

            <div className={`${styles.ingredientsEditor} ${styles.fullWidth}`}>
              <div className={styles.ingredientsHeader}>
                <span>Ingredients</span>
                <button
                  type="button"
                  className={styles.addIngredientBtn}
                  onClick={addIngredient}
                >
                  <Plus size={13} />
                  Add
                </button>
              </div>

              {form.ingredients.length === 0 && (
                <p className={styles.emptyIngredients}>No ingredients set.</p>
              )}

              {form.ingredients.map((ing, idx) => (
                <div key={idx} className={styles.ingredientEditRow}>
                  <select
                    className={styles.input}
                    value={ing.ingredientId}
                    onChange={(e) =>
                      setIngredient(idx, "ingredientId", e.target.value)
                    }
                  >
                    <option value="">Select ingredient</option>
                    {inventory.map((inv) => (
                      <option key={inv._id} value={inv._id}>
                        {inv.ingredientName}
                      </option>
                    ))}
                  </select>
                  <input
                    className={styles.input}
                    type="number"
                    min={0}
                    step="0.01"
                    value={ing.quantity}
                    onChange={(e) =>
                      setIngredient(idx, "quantity", e.target.value)
                    }
                    placeholder="Qty"
                  />
                  <button
                    type="button"
                    className={`${styles.iconBtn} ${styles.deleteBtn}`}
                    onClick={() => removeIngredient(idx)}
                    aria-label="Remove ingredient"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            {updateError && (
              <p className={`${styles.errorText} ${styles.fullWidth}`}>
                {updateError.message}
              </p>
            )}
            <div className={`${styles.editActions} ${styles.fullWidth}`}>
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
              <h3 className={styles.name}>{item.name || "Untitled item"}</h3>
              <span className={styles.price}>${price.toFixed(2)}</span>
            </div>

            {item.ingredients && item.ingredients.length > 0 && (
              <div className={styles.recipe}>
                <span className={styles.recipeLabel}>Ingredients:</span>
                <ul className={styles.recipeList}>
                  {item.ingredients.map((ing, idx) => (
                    <li key={idx}>
                      {ing.ingredientId?.ingredientName || "Ingredient"} —{" "}
                      {ing.quantity}
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
                onClick={() => onDelete(itemId)}
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
