import { useState, useEffect, useRef } from 'react';
import { IoAdd } from "react-icons/io5";
import { ConfirmModal, FormModal } from './AdminDashboard';
import AdminShell from './AdminShell';
import ReviewCard from '../../components/ReviewCard';
import { Star } from "lucide-react";

const ReviewsTab = ({ addToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', company: '', content: '', imgSrc: '', rating: 5 });
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews`, {
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
    setForm({ name: '', company: '', content: '', imgSrc: '', rating: 5 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      company: item.company || '',
      content: item.content || '',
      imgSrc: item.imgSrc || '',
      rating: item.rating ?? 5
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
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews`;
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
        addToast(data.message || 'Failed to save review', 'error');
        return;
      }
      setModalOpen(false);
      fetchItems();
      addToast(
        editingItem ? 'Review updated successfully' : 'Review added successfully',
        'success'
      );
    } catch (err) {
      setError('Failed to save');
      addToast('Failed to save review', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchItems();
        addToast('Review deleted successfully', 'success');
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
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews/${item._id}/order`,
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
      addToast("Review order updated successfully", "success");
      fetchItems();
    } catch (err) {
      addToast("Failed to save order", "error");
    }
  };

  return (
     <AdminShell
      title="Reviews"
      count={items.length}
      subtitle="Manage testimonials and reviews"
      actions={
        <>
          <button onClick={saveOrder} className="btn btn-outline">
            <span className="material-symbols-rounded text-[16px]">save</span>
            Save Order
          </button>
          <button onClick={openAdd} className="btn btn-primary">
            <IoAdd className="text-[18px]" /> Add Review
          </button>
        </>
      }
    >

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3].map(i => <div key={i} className="admin-skeleton h-32" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
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
                <button onClick={() => openEdit(item)} className="btn btn-outline btn-icon">
                  <span className="material-symbols-rounded text-[16px]">edit</span>
                  <span className="sr-only">Edit review by {item.name}</span>
                </button>
                <button onClick={() => setDeleteTarget(item)} className="btn btn-outline btn-icon btn-danger">
                  <span className="material-symbols-rounded text-[16px]">delete</span>
                  <span className="sr-only">Delete review by {item.name}</span>
                </button>
              </div>
              <ReviewCard
                content={item.content || ''}
                imgSrc={item.imgSrc || ''}
                name={item.name}
                company={item.company || ''}
                rating={item.rating ?? 5}
              />
            </div>
          ))}
          {items.length === 0 && <p className="admin-empty">No items found.</p>}
        </div>
      )}

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={`${editingItem ? 'Edit' : 'Add'} Review`} error={error}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">Name</label>
            <input className="text-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Company</label>
            <input className="text-field" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  className="transition-all duration-200"
                >
                  <Star
                    size={28}
                    className={`cursor-pointer transition-transform duration-100 hover:scale-110 ${
                      star <= form.rating
                        ? 'text-gold fill-gold'
                        : 'text-ink-faint'
                    }`}
                  />
                </button>
              ))}
              <span className="font-hand text-lg text-ink-soft ml-2">{form.rating}/5</span>
            </div>
          </div>
          <div className="input-box">
            <label className="label">Content</label>
            <textarea className="text-field" rows={3} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Image URL</label>
            <input className="text-field" value={form.imgSrc} onChange={(e) => setForm({ ...form, imgSrc: e.target.value })} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </FormModal>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Review"
        message={`Are you sure you want to delete the review from "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </AdminShell>
  );
};

export default ReviewsTab;
