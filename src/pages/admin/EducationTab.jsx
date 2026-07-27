import { useState, useEffect } from 'react';
import { ConfirmModal } from './AdminDashboard';
import EducationCard from '../../components/EducationCard';

const EducationTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ institution: '', degree: '', year: '', percentage: '', description: '', instLogo: '', instLink: '', skills: '' });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = sessionStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/education`, {
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
    setForm({ institution: '', degree: '', year: '', percentage: '', description: '', instLogo: '', instLink: '', skills: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      institution: item.institution,
      degree: item.degree,
      year: item.year,
      percentage: item.percentage || '',
      description: item.description || '',
      instLogo: item.instLogo || '',
      instLink: item.instLink || '',
      skills: Array.isArray(item.skills) ? item.skills.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      const session = sessionStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const url = editingItem
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/education/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/education`;
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/education/${deleteTarget._id}`, {
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
          <h2 className="text-2xl font-semibold text-zinc-50">Education</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage educational qualifications</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">Add Education</button>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id} className="relative group/item">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-zinc-500">{item.year}</p>
                <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="btn btn-outline text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">edit</span>
                  </button>
                  <button onClick={() => setDeleteTarget(item)} className="btn btn-outline !text-red-400 hover:!bg-red-400/10 text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">delete</span>
                  </button>
                </div>
              </div>
              <EducationCard
                year={item.year}
                name={item.degree}
                perc={item.percentage || ''}
                instName={item.institution}
                instLogo={item.instLogo || 'https://res.cloudinary.com/dz53e3szr/image/upload/v1774435010/ksr_logo_jej2x4.webp'}
                instLink={item.instLink || '#'}
                desc={item.description || ''}
                skills={item.skills || []}
              />
            </li>
          ))}
          {items.length === 0 && <p className="text-zinc-400">No items found.</p>}
        </ul>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-800 rounded-2xl p-6 w-full max-w-lg ring-1 ring-zinc-50/5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-zinc-50">{editingItem ? 'Edit' : 'Add'} Education</h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-zinc-200">
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Institution</label>
                <input className="text-field" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} required />
              </div>
              <div>
                <label className="label">Degree</label>
                <input className="text-field" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} required />
              </div>
              <div>
                <label className="label">Year</label>
                <input className="text-field" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
              </div>
              <div>
                <label className="label">Percentage / Grade</label>
                <input className="text-field" value={form.percentage} onChange={(e) => setForm({ ...form, percentage: e.target.value })} />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="text-field" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="label">Institute Logo URL</label>
                <input className="text-field" value={form.instLogo} onChange={(e) => setForm({ ...form, instLogo: e.target.value })} />
              </div>
              <div>
                <label className="label">Institute Link</label>
                <input className="text-field" value={form.instLink} onChange={(e) => setForm({ ...form, instLink: e.target.value })} />
              </div>
              <div>
                <label className="label">Skills (comma separated)</label>
                <input className="text-field" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
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
        title="Delete Education"
        message={`Are you sure you want to delete "${deleteTarget?.degree}" from ${deleteTarget?.institution}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default EducationTab;
