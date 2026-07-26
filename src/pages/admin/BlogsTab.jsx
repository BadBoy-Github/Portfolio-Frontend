import { useState, useEffect } from 'react';

const BlogsTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ id: '', title: '', subtitle: '', date: '', readTime: '', tags: '', image: '', content: '' });
  const [error, setError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs`, {
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
    setForm({ id: '', title: '', subtitle: '', date: '', readTime: '', tags: '', image: '', content: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle || '',
      date: item.date,
      readTime: item.readTime || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      image: item.image || '',
      content: item.content || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      const url = editingItem
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs`;
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs/${id}`, {
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
        <h2 className="text-2xl font-semibold text-zinc-50">Blogs</h2>
        <button onClick={openAdd} className="btn btn-primary">Add Blog</button>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-zinc-50">{item.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">{item.subtitle}</p>
                <p className="text-zinc-500 text-sm mt-1">{item.date} • {item.readTime}</p>
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
          <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-lg ring-1 ring-zinc-50/5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-zinc-50 mb-4">{editingItem ? 'Edit' : 'Add'} Blog</h3>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">ID</label>
                <input className="text-field" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required disabled={!!editingItem} />
              </div>
              <div>
                <label className="label">Title</label>
                <input className="text-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <input className="text-field" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
              </div>
              <div>
                <label className="label">Date</label>
                <input className="text-field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </div>
              <div>
                <label className="label">Read Time</label>
                <input className="text-field" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} />
              </div>
              <div>
                <label className="label">Tags (comma separated)</label>
                <input className="text-field" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              </div>
              <div>
                <label className="label">Image URL</label>
                <input className="text-field" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              </div>
              <div>
                <label className="label">Content (HTML)</label>
                <textarea className="text-field" rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
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

export default BlogsTab;
