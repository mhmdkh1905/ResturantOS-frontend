import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import styles from "./AddMenuItemModal.module.css";

const CATEGORIES = [
  "Main Course",
  "Appetizer",
  "Dessert",
  "Drink",
  "Salad",
  "Soup",
];
const UNITS = ["piece", "kg", "g", "liter", "ml", "cup", "tbsp", "tsp"];

const EMPTY = {
  name: "",
  price: "",
  category: "Main Course",
  image: "",
  recipe: [],
  isAvailable: true,
};

const EMPTY_INGREDIENT = {
  ingredientName: "",
  quantity: "",
  unit: "g",
};

export default function AddMenuItemModal({ onAdd, onClose }) {
  const [form, setForm] = useState(EMPTY);

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const addIngredient = () => {
    setForm((p) => ({
      ...p,
      recipe: [...p.recipe, { ...EMPTY_INGREDIENT }],
    }));
  };

  const removeIngredient = (idx) => {
    setForm((p) => ({
      ...p,
      recipe: p.recipe.filter((_, i) => i !== idx),
    }));
  };

  const setIngredient = (idx, key, val) => {
    setForm((p) => ({
      ...p,
      recipe: p.recipe.map((ing, i) =>
        i === idx ? { ...ing, [key]: val } : ing,
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      image: form.image.trim(),
      recipe: form.recipe
        .filter((ing) => ing.ingredientName.trim() && ing.quantity !== "")
        .map((ing) => ({
          ingredientName: ing.ingredientName.trim(),
          quantity: Number(ing.quantity),
          unit: ing.unit,
        })),
      isAvailable: form.isAvailable,
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add Menu Item</h2>
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
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Margherita Pizza"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Price ($)</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                step="0.01"
                required
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <select
                className={styles.input}
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Image URL</label>
            <input
              className={styles.input}
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className={styles.recipeSection}>
            <div className={styles.recipeHeader}>
              <label className={styles.label}>Recipe (Ingredients)</label>
              <button
                type="button"
                className={styles.addIngredientBtn}
                onClick={addIngredient}
              >
                <Plus size={14} />
                Add Ingredient
              </button>
            </div>

            {form.recipe.length === 0 && (
              <p className={styles.emptyRecipe}>No ingredients added yet.</p>
            )}

            {form.recipe.map((ing, idx) => (
              <div key={idx} className={styles.recipeRow}>
                <input
                  className={styles.input}
                  placeholder="Ingredient name"
                  required
                  value={ing.ingredientName}
                  onChange={(e) =>
                    setIngredient(idx, "ingredientName", e.target.value)
                  }
                />
                <input
                  className={styles.input}
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="Qty"
                  required
                  value={ing.quantity}
                  onChange={(e) =>
                    setIngredient(idx, "quantity", e.target.value)
                  }
                />
                <select
                  className={styles.input}
                  value={ing.unit}
                  onChange={(e) => setIngredient(idx, "unit", e.target.value)}
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={`${styles.iconBtn} ${styles.deleteBtn}`}
                  onClick={() => removeIngredient(idx)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Available</label>
            <div className={styles.toggleRow}>
              <button
                type="button"
                role="switch"
                aria-checked={form.isAvailable}
                className={`${styles.toggle} ${form.isAvailable ? styles.toggleOn : ""}`}
                onClick={() => set("isAvailable", !form.isAvailable)}
              >
                <span className={styles.thumb} />
              </button>
              <span
                className={`${styles.toggleLabel} ${form.isAvailable ? styles.toggleLabelOn : ""}`}
              >
                {form.isAvailable ? "Available" : "Unavailable"}
              </span>
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
