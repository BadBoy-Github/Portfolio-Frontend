import { useState, useEffect } from 'react';

const TechStacksTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ category: '', items: '' });
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks`, {
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
    setForm({ category: '', items: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({ category: item.category, items: item.items.join(', ') });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      category: form.category,
      items: form.items.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      const url = editingItem
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks`;
      const method = editingItem ? 'PUT' : 'POST';
      const token = localStorage.getItem('adminToken');
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
        return;
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError('Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchItems();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-zinc-50">Tech Stacks</h2>
        <button onClick={openAdd} className="btn btn-primary">Add Tech Stack</button>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-zinc-50">{item.category}</h3>
                <p className="text-zinc-400 text-sm mt-1">{item.items.join(', ')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="btn btn-outline">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="btn btn-outline !text-red-400 hover:!bg-red-400/10">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-zinc-400">No items found.</p>}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-lg ring-1 ring-zinc-50/5">
            <h3 className="text-xl font-semibold text-zinc-50 mb-4">{editingItem ? 'Edit' : 'Add'} Tech Stack</h3>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Category</label>
                <input className="text-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
              </div>
              <div>
                <label className="label">Items (comma separated)</label>
                <textarea className="text-field" rows={3} value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} required />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStacksTab;
