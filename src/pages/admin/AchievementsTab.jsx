import { useState, useEffect } from 'react';
import { ConfirmModal } from './AdminDashboard';
import AchievementsCard from '../../components/AchievementsCard';

const AchievementsTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', image: '', tags: '' });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = sessionStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements`, {
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
    setForm({ title: '', description: '', date: '', image: '', tags: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description || '',
      date: item.date,
      image: item.image || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : ''
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
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements`;
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(',').map(s => s.trim()).filter(Boolean)
        }),
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/achievements/${deleteTarget._id}`, {
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
          <h2 className="text-2xl font-semibold text-zinc-50">Achievements</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage your achievements and awards</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">Add Achievement</button>
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
                <p className="text-xs text-zinc-500">{item.date}</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="btn btn-outline text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">edit</span>
                  </button>
                  <button onClick={() => setDeleteTarget(item)} className="btn btn-outline !text-red-400 hover:!bg-red-400/10 text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">delete</span>
                  </button>
                </div>
              </div>
              <AchievementsCard
                imgSrc={item.image || ''}
                title={item.title}
                date={item.date}
                tags={item.tags || []}
                desc={item.description || ''}
                achiId={item._id}
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
              <h3 className="text-xl font-semibold text-zinc-50">{editingItem ? 'Edit' : 'Add'} Achievement</h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-zinc-200">
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Title</label>
                <input className="text-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="text-field" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="label">Date</label>
                <input className="text-field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div>
                <label className="label">Image URL</label>
                <input className="text-field" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
              <div>
                <label className="label">Tags (comma separated)</label>
                <input className="text-field" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
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
        title="Delete Achievement"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AchievementsTab;
