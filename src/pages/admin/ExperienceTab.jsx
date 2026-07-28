import { useState, useEffect } from 'react';
import { ConfirmModal, FormModal } from './AdminDashboard';
import ExperienceCard from '../../components/ExperienceCard';

const ExperienceTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', company: '', period: '', description: '', skills: '', link: '', role: '', instLogo: '', imgSrc: '', certifi: false });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = sessionStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/experience`, {
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
    setForm({ title: '', company: '', period: '', description: '', skills: '', link: '', role: '', instLogo: '', imgSrc: '', certifi: false });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      company: item.company,
      period: item.period,
      description: item.description,
      skills: Array.isArray(item.skills) ? item.skills.join(', ') : '',
      link: item.link || '',
      role: item.role || '',
      instLogo: item.instLogo || '',
      imgSrc: item.imgSrc || '',
      certifi: !!item.certifi
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
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/experience/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/experience`;
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/experience/${deleteTarget._id}`, {
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
          <h2 className="text-2xl font-semibold text-zinc-50">Experience</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage work experience and internships</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">Add Experience</button>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : (
        <ul className="space-y-0">
          {items.map((item) => (
            <li key={item._id} className="relative group/item">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-zinc-500">{item.period}</p>
                <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="btn btn-outline text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">edit</span>
                  </button>
                  <button onClick={() => setDeleteTarget(item)} className="btn btn-outline !text-red-400 hover:!bg-red-400/10 text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">delete</span>
                  </button>
                </div>
              </div>
              <ExperienceCard
                year={item.period}
                name={item.title}
                role={item.role || ''}
                instName={item.company}
                instLogo={item.instLogo || 'https://res.cloudinary.com/dz53e3szr/image/upload/v1774435128/skybrisk_logo_aladdz.webp'}
                instLink={item.link || '#'}
                desc={item.description}
                imgSrc={item.imgSrc || ''}
                certifi={!!item.certifi}
                skills={item.skills || []}
              />
            </li>
          ))}
          {items.length === 0 && <p className="text-zinc-400">No items found.</p>}
        </ul>
      )}

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={`${editingItem ? 'Edit' : 'Add'} Experience`} error={error}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">Title</label>
            <input className="text-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Company</label>
            <input className="text-field" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Period</label>
            <input className="text-field" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Description</label>
            <textarea className="text-field" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Skills (comma separated)</label>
            <input className="text-field" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Link</label>
            <input className="text-field" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Role</label>
            <input className="text-field" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Institute Logo URL</label>
            <input className="text-field" value={form.instLogo} onChange={(e) => setForm({ ...form, instLogo: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Certificate Image URL</label>
            <input className="text-field" value={form.imgSrc} onChange={(e) => setForm({ ...form, imgSrc: e.target.value })} />
          </div>
          <div className="input-box flex items-center gap-2">
            <input id="certifi" type="checkbox" checked={form.certifi} onChange={(e) => setForm({ ...form, certifi: e.target.checked })} />
            <label htmlFor="certifi" className="text-sm text-zinc-300">Has certificate</label>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </FormModal>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Experience"
        message={`Are you sure you want to delete "${deleteTarget?.title}" at ${deleteTarget?.company}? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default ExperienceTab;
