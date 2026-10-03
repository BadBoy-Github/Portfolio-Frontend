import { useState, useEffect, useRef } from 'react';
import { IoAdd } from "react-icons/io5";
import { ConfirmModal, FormModal } from './AdminDashboard';
import AdminShell from './AdminShell';
import CertificationsCard from '../../components/CertificationsCard';

const CertificatesTab = ({ addToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', company: '', year: '', description: '', imgSrc: '', logo: '', technologiesLearned: [] });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragItem = useRef(null);

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/certificates`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        const sorted = (data.data || [])
          .slice()
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setItems(sorted);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditingItem(null);
    setForm({ title: '', company: '', year: '', description: '', imgSrc: '', logo: '', technologiesLearned: [] });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      company: item.company,
      year: item.year,
      description: item.description,
      imgSrc: item.imgSrc || '',
      logo: item.logo || '',
      technologiesLearned: Array.isArray(item.technologiesLearned) ? item.technologiesLearned : (typeof item.technologiesLearned === 'string' ? item.technologiesLearned.split(',').map(s => s.trim()).filter(Boolean) : [])
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      id: editingItem ? editingItem.id : generateId(),
      ...form,
      order: editingItem ? editingItem.order : items.length,
    };

    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const url = editingItem
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/certificates/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/certificates`;
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Failed to save');
        addToast(data.message || 'Failed to save certificate', 'error');
        return;
      }
      setModalOpen(false);
      fetchItems();
      addToast(
        editingItem ? 'Certificate updated successfully' : 'Certificate added successfully',
        'success'
      );
    } catch (err) {
      setError('Failed to save');
      addToast('Failed to save certificate', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/certificates/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchItems();
        addToast('Certificate deleted successfully', 'success');
      }
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = "move";
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragItem.current === null || dragItem.current === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (dropIndex) => {
    if (dragItem.current === null) return;
    const updated = [...items];
    const [moved] = updated.splice(dragItem.current, 1);
    updated.splice(dropIndex, 0, moved);
    setItems(updated);
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const saveOrder = async () => {
    const session = localStorage.getItem('adminSession');
    const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
    try {
      await Promise.all(
        items.map((item, index) =>
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/certificates/${item._id}/order`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ order: index }),
            },
          ),
        ),
      );
      addToast("Certificate order updated successfully", "success");
      fetchItems();
    } catch (err) {
      addToast("Failed to save order", "error");
    }
  };

  const addItem = (field, value) => {
    if (!value.trim()) return;
    setForm({ ...form, [field]: [...form[field], value.trim()] });
  };

  const removeItem = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated });
  };

  const tagHandleDragStart = (field, index) => {
    dragItem.current = { field, index };
    setDragOverIndex(null);
  };

  const tagHandleDragOver = (e, field, index) => {
    e.preventDefault();
    if (
      !dragItem.current ||
      dragItem.current.field !== field ||
      dragItem.current.index === index
    )
      return;
    setDragOverIndex(index);
  };

  const tagHandleDrop = (field, dropIndex) => {
    if (!dragItem.current || dragItem.current.field !== field) return;
    const items = [...form[field]];
    const draggedIndex = dragItem.current.index;
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(dropIndex, 0, draggedItem);
    setForm({ ...form, [field]: items });
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const tagHandleDragEnd = () => {
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const TagInput = ({ label, field, placeholder }) => {
    const [input, setInput] = useState("");
    return (
      <div className="input-box">
        <label className="label">{label}</label>
        <div className="flex gap-2 mb-2">
          <input
            className="text-field flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem(field, input);
                setInput("");
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              addItem(field, input);
              setInput("");
            }}
            className="btn btn-icon btn-add"
          >
            <span className="material-symbols-rounded text-[16px]">add</span>
            <span className="sr-only">Add {label}</span>
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, [field]: [] })}
            className="btn btn-icon btn-clear"
          >
            <span className="material-symbols-rounded text-[16px]">
              refresh
            </span>
            <span className="sr-only">Clear all {label}</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form[field].map((item, index) => (
            <span
              key={index}
              draggable
              onDragStart={() => tagHandleDragStart(field, index)}
              onDragOver={(e) => tagHandleDragOver(e, field, index)}
              onDrop={() => tagHandleDrop(field, index)}
              onDragEnd={tagHandleDragEnd}
              className={`tag-chip ${dragOverIndex === index ? "tag-chip-over" : ""}`}
            >
              <span className="material-symbols-rounded text-[16px] text-ink-faint cursor-grab active:cursor-grabbing">
                drag_indicator
              </span>
              {item}
              <button
                type="button"
                onClick={() => removeItem(field, index)}
                className="material-symbols-rounded text-[16px] text-ink-faint hover:text-marker transition-colors"
              >
                close
                <span className="sr-only">Remove {item}</span>
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <AdminShell
      title="Certificates"
      count={items.length}
      subtitle="Manage your certifications"
      actions={
        <>
          <button onClick={saveOrder} className="btn btn-outline">
            <span className="material-symbols-rounded text-[16px]">save</span>
            Save Order
          </button>
          <button onClick={openAdd} className="btn btn-primary">
            <IoAdd className="text-[18px]" /> Add Certificate
          </button>
        </>
      }
    >

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="admin-skeleton h-32" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item._id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`admin-card ${dragOverIndex === index ? "admin-drop" : ""}`}
            >
              <div className="admin-card-grab">
                <span className="material-symbols-rounded text-[16px] cursor-grab active:cursor-grabbing">
                  drag_indicator
                </span>
              </div>
              <div className="admin-card-actions">
                <button
                  onClick={() => openEdit(item)}
                  className="btn btn-outline btn-icon"
                >
                  <span className="material-symbols-rounded text-[16px]">
                    edit
                  </span>
                  <span className="sr-only">Edit {item.title}</span>
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="btn btn-outline btn-icon btn-danger"
                >
                  <span className="material-symbols-rounded text-[16px]">
                    delete
                  </span>
                  <span className="sr-only">Delete {item.title}</span>
                </button>
              </div>
              <CertificationsCard
                imgSrc={item.imgSrc || item.imgSrc || ""}
                title={item.title}
                company={item.company}
                logo={
                  item.logo ||
                  "https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/ai_gqzbmi.webp"
                }
                certNumber={items.length-index}
              />
            </div>
          ))}
          {items.length === 0 && (
            <p className="admin-empty">No items found.</p>
          )}
        </div>
      )}

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editingItem ? "Edit" : "Add"} Certificate`}
        error={error}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">Title</label>
            <input
              className="text-field"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Company</label>
            <input
              className="text-field"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Year</label>
            <input
              className="text-field"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Description</label>
            <textarea
              className="text-field"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="input-box">
            <label className="label">Image URL</label>
            <input
              className="text-field"
              value={form.imgSrc}
              onChange={(e) => setForm({ ...form, imgSrc: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Logo URL</label>
            <input
              className="text-field"
              value={form.logo}
              onChange={(e) => setForm({ ...form, logo: e.target.value })}
            />
          </div>
          <TagInput
            label="Technologies Learned"
            field="technologiesLearned"
            placeholder="Add a technology"
          />
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </FormModal>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Certificate"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
};

export default CertificatesTab;
