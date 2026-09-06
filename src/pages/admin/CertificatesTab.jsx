import { useState, useEffect } from 'react';
import { IoAdd } from "react-icons/io5";
import { ConfirmModal, FormModal } from './AdminDashboard';
import CertificationsCard from '../../components/CertificationsCard';

const CertificatesTab = ({ addToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', company: '', year: '', description: '', imgSrc: '', logo: '', technologiesLearned: '' });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/certificates`, {
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
    setForm({ title: '', company: '', year: '', description: '', imgSrc: '', logo: '', technologiesLearned: '' });
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
      technologiesLearned: Array.isArray(item.technologiesLearned) ? item.technologiesLearned.join(', ') : ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
        body: JSON.stringify(form),
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

  return (
     <div className="px-4 md:px-8 pb-4 md:pb-8">
      <div className="flex items-center justify-between mb-6 sticky top-0 z-20 bg-zinc-900 pt-8 pb-4 border-b border-zinc-700">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-50 flex items-center gap-2">Certificates <span className="text-sky-400">({items.length})</span></h2>
          <p className="text-zinc-400 text-sm mt-1">Manage your certifications</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary"><IoAdd className="text-[18px]" /> Add Certificate</button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <div key={i} className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 h-32 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div key={item._id} className="relative group">
              <div className="flex items-center justify-end mb-2">
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="btn btn-outline text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">edit</span>
                  </button>
                  <button onClick={() => setDeleteTarget(item)} className="btn btn-outline !text-red-400 hover:!bg-red-400/10 text-xs py-1 px-2">
                    <span className="material-symbols-rounded text-[16px]">delete</span>
                  </button>
                </div>
              </div>
              <CertificationsCard
                imgSrc={item.imgSrc || item.imgSrc || ''}
                title={item.title}
                company={item.company}
                logo={item.logo || 'https://res.cloudinary.com/dz53e3szr/image/upload/v1774434456/ai_gqzbmi.webp'}
                certNumber={item.certNumber || idx + 1}
              />
            </div>
          ))}
          {items.length === 0 && <p className="text-zinc-400 col-span-full">No items found.</p>}
        </div>
      )}

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={`${editingItem ? 'Edit' : 'Add'} Certificate`} error={error}>
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
            <label className="label">Year</label>
            <input className="text-field" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Description</label>
            <textarea className="text-field" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Image URL</label>
            <input className="text-field" value={form.imgSrc} onChange={(e) => setForm({ ...form, imgSrc: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Logo URL</label>
            <input className="text-field" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Technologies Learned</label>
            <input className="text-field" value={form.technologiesLearned} onChange={(e) => setForm({ ...form, technologiesLearned: e.target.value })} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
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
    </div>
  );
};

export default CertificatesTab;
