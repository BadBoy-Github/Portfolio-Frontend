import { useCallback, useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import PropTypes from "prop-types";
import AdminShell from "./AdminShell";
import { ConfirmModal } from "./AdminDashboard";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/learning-basket`;

const getAdminToken = () => {
  const session = localStorage.getItem("adminSession");
  return session
    ? JSON.parse(session).token
    : localStorage.getItem("adminToken");
};

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const LearningBasketTab = ({ addToast }) => {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragItem = useRef(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${getAdminToken()}` },
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load learning cards.");
      }
      setItems(
        (result.data || [])
          .slice()
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
      );
    } catch (fetchError) {
      setError(fetchError.message || "Failed to load learning cards.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAdd = async (event) => {
    event.preventDefault();
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setError("Enter a learning item before adding it.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({
          id: createId(),
          value: trimmedValue,
          order: items.length,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add learning item.");
      }
      setItems((current) => [...current, result.data]);
      setValue("");
      addToast("Learning item added successfully", "success");
    } catch (saveError) {
      setError(saveError.message || "Failed to add learning item.");
      addToast(saveError.message || "Failed to add learning item", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await fetch(`${API_URL}/${deleteTarget._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getAdminToken()}` },
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to remove learning item.");
      }
      setItems((current) =>
        current.filter((item) => item._id !== deleteTarget._id),
      );
      addToast("Learning item removed", "success");
    } catch (deleteError) {
      addToast(deleteError.message || "Failed to remove learning item", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleDrop = async (dropIndex) => {
    if (dragItem.current === null || dragItem.current === dropIndex) return;
    const previousItems = items;
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(dragItem.current, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);
    setItems(updatedItems);
    dragItem.current = null;
    setDragOverIndex(null);

    try {
      const response = await fetch(`${API_URL}/order`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({
          ids: updatedItems.map((item) => item._id),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save card order.");
      }
      setItems(result.data || updatedItems);
      addToast("Learning card order saved", "success");
    } catch (orderError) {
      setItems(previousItems);
      addToast(orderError.message || "Failed to save card order", "error");
    }
  };

  return (
    <AdminShell
      title="Learning Basket"
      count={items.length}
      subtitle="Add and arrange the learning cards shown on your public page."
    >
      <section className="mb-8 rounded-wobbly-lg border-2 border-ink bg-paper-card p-5 shadow-hard-sm sm:p-6">
        <h2 className="font-display text-xl font-bold text-ink">
          Add a learning card
        </h2>
        <p className="mb-5 mt-1 font-hand text-lg text-ink-soft">
          Enter one skill, idea, or learning note to show in your basket.
        </p>
        <form
          onSubmit={handleAdd}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="input-box flex-1">
            <label className="label" htmlFor="learning-basket-value">
              Learning item
            </label>
            <input
              id="learning-basket-value"
              className="text-field"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="For example, React Server Components"
              maxLength={240}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <IoAdd className="text-[18px]" />
            {saving ? "Adding..." : "Add Card"}
          </button>
        </form>
        {error && (
          <p className="mt-3 font-hand text-lg text-marker" role="alert">
            {error}
          </p>
        )}
      </section>

      <section aria-labelledby="saved-learning-items">
        <h2
          id="saved-learning-items"
          className="mb-4 font-display text-xl font-bold text-ink"
        >
          Saved learning cards
        </h2>
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="admin-skeleton h-20" />
            ))}
          </div>
        ) : items.length ? (
          <>
            <p className="mb-3 font-hand text-base text-ink-soft">
              Drag cards to change their public order. Changes save automatically.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((item, index) => (
                <article
                  key={item._id}
                  draggable
                  onDragStart={(event) => {
                    dragItem.current = index;
                    event.dataTransfer.effectAllowed = "move";
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    if (dragItem.current !== index) setDragOverIndex(index);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleDrop(index);
                  }}
                  onDragEnd={() => {
                    dragItem.current = null;
                    setDragOverIndex(null);
                  }}
                  className={`admin-card flex items-center gap-3 ${
                    dragOverIndex === index ? "admin-drop" : ""
                  }`}
                >
                  <span
                    className="material-symbols-rounded shrink-0 cursor-grab text-ink-faint active:cursor-grabbing"
                    aria-hidden="true"
                  >
                    drag_indicator
                  </span>
                  <p className="min-w-0 flex-1 break-words font-hand text-lg text-ink">
                    {item.value}
                  </p>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    className="btn btn-outline btn-icon btn-danger shrink-0"
                    aria-label={`Remove ${item.value}`}
                    title="Remove card"
                  >
                    <span className="material-symbols-rounded text-[16px]">
                      delete
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="admin-empty">No learning cards saved yet.</p>
        )}
      </section>

      <ConfirmModal
        open={!!deleteTarget}
        title="Remove Learning Card"
        message={`Are you sure you want to remove "${deleteTarget?.value}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
};

LearningBasketTab.propTypes = {
  addToast: PropTypes.func.isRequired,
};

export default LearningBasketTab;
