import { useState, useEffect } from 'react';
import { ConfirmModal, FormModal } from './AdminDashboard';
import ProjectCard from '../../components/ProjectCard';

const ProjectsTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', link: '', github: '', skills: '', image: '' });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = sessionStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/projects`, {
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
    setForm({ name: '', description: '', link: '', github: '', skills: '', image: '' });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      link: item.link || '',
      github: item.github || '',
      skills: Array.isArray(item.skills) ? item.skills.join(', ') : '',
      image: item.image || '',
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
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/projects/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/projects`;
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/projects/${deleteTarget._id}`, {
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
          <h2 className="text-2xl font-semibold text-zinc-50">Projects</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage your portfolio projects</p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">Add Project</button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <div key={i} className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 h-40 animate-pulse" />)}
        </div>
      ) : (
        <>
          {items.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-zinc-50 mb-1">Featured Projects</h3>
              <div className="border-b border-zinc-700 mb-4" />
              <div className="grid gap-4 sm:grid-cols-2">
                {items.slice(0, 3).map((item) => (
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
                    <ProjectCard
                      imgSrc={item.image || ''}
                      title={item.name}
                      tags={item.skills || []}
                      projectLink={item.link || '#'}
                      code={item.github ? 'True' : 'False'}
                      live={item.link ? 'True' : 'False'}
                      gitUrl={item.github || '#'}
                      projectId={item._id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {items.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-50 mb-1">All Projects</h3>
              <div className="border-b border-zinc-700 mb-4" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
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
                    <ProjectCard
                      imgSrc={item.image || ''}
                      title={item.name}
                      tags={item.skills || []}
                      projectLink={item.link || '#'}
                      code={item.github ? 'True' : 'False'}
                      live={item.link ? 'True' : 'False'}
                      gitUrl={item.github || '#'}
                      projectId={item._id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {items.length === 0 && <p className="text-zinc-400 col-span-full">No items found.</p>}
        </>
      )}

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={`${editingItem ? 'Edit' : 'Add'} Project`} error={error}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">Name</label>
            <input className="text-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Description</label>
            <textarea className="text-field" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Link</label>
            <input className="text-field" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">GitHub</label>
            <input className="text-field" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Skills (comma separated)</label>
            <input className="text-field" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Image URL</label>
            <input className="text-field" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </FormModal>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default ProjectsTab;
