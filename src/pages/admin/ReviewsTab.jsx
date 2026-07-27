import { useState, useEffect } from 'react';
import { ConfirmModal } from './AdminDashboard';
import ReviewCard from '../../components/ReviewCard';

const ReviewsTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', company: '', comment: '', rating: 5, image: '' });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = sessionStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditingItem(null);
    setForm({ name: '', role: '', company: '', comment: '', rating: 5, image: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      role: item.role || '',
      company: item.company || '',
      comment: item.comment || '',
      rating: item.rating || 5,
      image: item.image || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const session = sessionStorage.getItem('adminSession');
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
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || 'Failed to save');
        return;
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError('Failed to save');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const session = sessionStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/reviews/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchItems();
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-50">Reviews</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage testimonials and reviews</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">Add Review</button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <div key={i} className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 h-32 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="relative group">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-zinc-500">{item.name}</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="btn btn-outline text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">edit</span>
                  </button>
                  <button onClick={() => setDeleteTarget(item)} className="btn btn-outline !text-red-400 hover:!bg-red-400/10 text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">delete</span>
                  </button>
                </div>
              </div>
              <ReviewCard
                content={item.comment || ''}
                imgSrc={item.image || ''}
                name={item.name}
                company={item.company || item.role || ''}
                rating={item.rating || 5}
              />
            </div>
          ))}
          {items.length === 0 && <p className="text-zinc-400 col-span-full">No items found.</p>}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-lg ring-1 ring-zinc-50/5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-zinc-50">{editingItem ? 'Edit' : 'Add'} Review</h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-zinc-200">
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input className="text-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="label">Role</label>
                <input className="text-field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
              </div>
              <div>
                <label className="label">Company</label>
                <input className="text-field" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <div>
                <label className="label">Comment</label>
                <textarea className="text-field" rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
              </div>
              <div>
                <label className="label">Rating (1-5)</label>
                <input type="number" min="1" max="5" className="text-field" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 1 })} />
              </div>
              <div>
                <label className="label">Image URL</label>
                <input className="text-field" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Review"
        message={`Are you sure you want to delete the review from "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default ReviewsTab;
