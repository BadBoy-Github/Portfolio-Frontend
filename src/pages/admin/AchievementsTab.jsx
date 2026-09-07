import { useState, useEffect, useRef } from 'react';
import { IoAdd } from "react-icons/io5";
import { ConfirmModal, FormModal } from './AdminDashboard';
import AchievementsCard from '../../components/AchievementsCard';

const AchievementsTab = ({ addToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', date: '', imgSrc: '', tags: [], keyPoints: '' });
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements`, {
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
    setForm({ title: '', subtitle: '', date: '', imgSrc: '', tags: [], keyPoints: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      subtitle: item.subtitle || '',
      date: item.date,
      imgSrc: item.imgSrc || '',
      tags: Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? item.tags.split(',').map(s => s.trim()).filter(Boolean) : []),
      keyPoints: Array.isArray(item.keyPoints) ? item.keyPoints.join('; ') : ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      id: editingItem ? editingItem.id : generateId(),
      ...form,
      keyPoints: form.keyPoints.split(';').map(s => s.trim()).filter(Boolean),
      order: editingItem ? editingItem.order : items.length,
    };

    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const url = editingItem
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements`;
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
        addToast(data.message || 'Failed to save achievement', 'error');
        return;
      }
      setModalOpen(false);
      fetchItems();
      addToast(
        editingItem ? 'Achievement updated successfully' : 'Achievement added successfully',
        'success'
      );
    } catch (err) {
      setError('Failed to save');
      addToast('Failed to save achievement', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchItems();
        addToast('Achievement deleted successfully', 'success');
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
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements/${item._id}/order`,
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
      addToast("Achievement order updated successfully", "success");
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
            className="btn text-sky-400 border-sky-400 hover:bg-sky-400 hover:text-zinc-900"
          >
            <span className="material-symbols-rounded text-[16px]">add</span>
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, [field]: [] })}
            className="btn text-red-400 border-red-400 hover:bg-red-400 hover:text-zinc-900"
          >
            <span className="material-symbols-rounded text-[16px]">
              refresh
            </span>
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
              className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-zinc-700 text-zinc-200 font-medium cursor-grab active:cursor-grabbing transition-colors ${dragOverIndex === index ? "ring-2 ring-sky-500 bg-zinc-600" : "hover:bg-zinc-600"}`}
            >
              <span className="material-symbols-rounded text-[14px] text-zinc-400 cursor-grab active:cursor-grabbing">
                drag_indicator
              </span>
              {item}
              <button
                type="button"
                onClick={() => removeItem(field, index)}
                className="material-symbols-rounded text-[14px] text-zinc-400 hover:text-red-400 transition-colors"
              >
                close
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-8 pb-4 md:pb-8">
       <div className="flex items-center justify-between mb-6 sticky top-0 z-20 bg-zinc-900/80 backdrop-blur-xl pt-8 pb-4 border-b border-zinc-700">
         <div>
           <h2 className="text-2xl font-semibold text-zinc-50 flex items-center gap-2">
             Achievements <span className="text-sky-400">({items.length})</span>
           </h2>
           <p className="text-zinc-400 text-sm mt-1">
             Manage your achievements and awards
           </p>
         </div>
         <div className="flex items-center gap-2">
           <button onClick={saveOrder} className="btn btn-outline">
             <span className="material-symbols-rounded text-[16px]">save</span>
             Save Order
           </button>
           <button onClick={openAdd} className="btn btn-primary">
             <IoAdd className="text-[18px]" />
             Add Achievement
           </button>
         </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 h-32 animate-pulse"
            />
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
              className={`relative group cursor-grab active:cursor-grabbing transition-all ${dragOverIndex === index ? "ring-2 ring-sky-500" : ""}`}
            >
              <div className="flex items-center gap-2 text-zinc-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-rounded text-[16px] cursor-grab active:cursor-grabbing">
                  drag_indicator
                </span>
              </div>
              <div className="flex items-center justify-end mb-2">
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(item)}
                    className="btn btn-outline text-xs py-1 px-2"
                  >
                    <span className="material-symbols-rounded text-[16px]">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="btn btn-outline !text-red-400 hover:!bg-red-400/10 text-xs py-1 px-2"
                  >
                    <span className="material-symbols-rounded text-[16px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>
              <AchievementsCard
                imgSrc={item.imgSrc || ""}
                title={item.title}
                date={item.date}
                tags={item.tags || []}
                desc={item.subtitle || ""}
                achiId={item._id}
              />
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-zinc-400 col-span-full">No items found.</p>
          )}
        </div>
      )}

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editingItem ? "Edit" : "Add"} Achievement`}
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
            <label className="label">Subtitle</label>
            <input
              className="text-field"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Date</label>
            <input
              className="text-field"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
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
          <TagInput
            label="Tags"
            field="tags"
            placeholder="Add a tag"
          />
          <div className="input-box">
            <label className="label">Key Points</label>
            <textarea
              className="text-field"
              rows={3}
              value={form.keyPoints}
              onChange={(e) =>
                setForm({ ...form, keyPoints: e.target.value })
              }
              placeholder="Separate each point with a semicolon (;)"
            />
          </div>
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
        title="Delete Achievement"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AchievementsTab;
