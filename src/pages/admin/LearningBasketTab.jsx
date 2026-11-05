import { useCallback, useEffect, useRef, useState } from "react";
import { IoAdd, IoClose, IoCreateOutline, IoSaveOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import AdminShell from "./AdminShell";
import { ConfirmModal } from "./AdminDashboard";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/learning-basket`;
const STATUS_OPTIONS = [
  { value: "dormant", label: "Dormant" },
  { value: "learning", label: "In Progress" },
  { value: "completed", label: "Completed" },
];
const STATUS_STYLES = {
  dormant: "bg-marker-soft text-marker",
  learning: "bg-ballpoint-soft text-ballpoint",
  completed: "bg-postit-soft text-gold",
};

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
  const [status, setStatus] = useState("learning");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editStatus, setEditStatus] = useState("learning");
  const [editSaving, setEditSaving] = useState(false);
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
          status,
          order: items.length,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add learning item.");
      }
      setItems((current) => [...current, result.data]);
      setValue("");
      setStatus("learning");
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

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditValue(item.value);
    setEditStatus(item.status || "learning");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditValue("");
    setEditStatus("learning");
  };

  const handleEditSave = async (event) => {
    event.preventDefault();
    const trimmedValue = editValue.trim();
    if (!trimmedValue || !editingId) return;

    setEditSaving(true);
    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({ value: trimmedValue, status: editStatus }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update learning item.");
      }
      setItems((current) =>
        current.map((item) =>
          item._id === editingId ? result.data : item,
        ),
      );
      cancelEditing();
      addToast("Learning item updated successfully", "success");
    } catch (editError) {
      addToast(editError.message || "Failed to update learning item", "error");
    } finally {
      setEditSaving(false);
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
          <div className="input-box sm:w-48">
            <label className="label" htmlFor="learning-basket-status">
              Status
            </label>
            <select
              id="learning-basket-status"
              className="text-field"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
                  draggable={editingId !== item._id}
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
                  {editingId === item._id ? (
                    <form
                      onSubmit={handleEditSave}
                      className="flex w-full flex-col gap-3 sm:flex-row sm:items-end"
                    >
                      <div className="input-box min-w-0 flex-1">
                        <label
                          className="label"
                          htmlFor={`edit-learning-value-${item._id}`}
                        >
                          Learning item
                        </label>
                        <input
                          id={`edit-learning-value-${item._id}`}
                          className="text-field"
                          value={editValue}
                          onChange={(event) => setEditValue(event.target.value)}
                          maxLength={240}
                          required
                        />
                      </div>
                      <div className="input-box sm:w-40">
                        <label
                          className="label"
                          htmlFor={`edit-learning-status-${item._id}`}
                        >
                          Status
                        </label>
                        <select
                          id={`edit-learning-status-${item._id}`}
                          className="text-field"
                          value={editStatus}
                          onChange={(event) => setEditStatus(event.target.value)}
                        >
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-icon"
                          aria-label="Save changes"
                          title="Save changes"
                          disabled={editSaving}
                        >
                          <IoSaveOutline />
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline btn-icon"
                          aria-label="Cancel editing"
                          title="Cancel"
                          onClick={cancelEditing}
                          disabled={editSaving}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <span
                        className="material-symbols-rounded shrink-0 cursor-grab text-ink-faint active:cursor-grabbing"
                        aria-hidden="true"
                      >
                        drag_indicator
                      </span>
                      <p className="min-w-0 flex-1 break-words font-hand text-lg text-ink">
                        {item.value}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 font-hand text-sm font-bold ${
                          STATUS_STYLES[item.status] || STATUS_STYLES.learning
                        }`}
                      >
                        {STATUS_OPTIONS.find(
                          (option) => option.value === item.status,
                        )?.label || "In Progress"}
                      </span>
                      <button
                        type="button"
                        onClick={() => startEditing(item)}
                        className="btn btn-outline btn-icon shrink-0"
                        aria-label={`Edit ${item.value}`}
                        title="Edit card"
                      >
                        <IoCreateOutline />
                      </button>
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
                    </>
                  )}
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
