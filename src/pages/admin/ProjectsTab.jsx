import { useState, useEffect } from 'react';
import { ConfirmModal, FormModal } from './AdminDashboard';
import ProjectCard from '../../components/ProjectCard';

const ProjectsTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', projectLink: '', gitUrl: '', techUsed: '', imgSrc: '', type: '', subheading: '', tags: '', sTags: '', live: '', code: '', uses: '', improvements: '', gallery: [], featured: false });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = localStorage.getItem('adminSession');
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
    setForm({ title: '', description: '', projectLink: '', gitUrl: '', techUsed: '', imgSrc: '', type: '', subheading: '', tags: '', sTags: '', live: '', code: '', uses: '', improvements: '', gallery: [], featured: false });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
      projectLink: item.projectLink || '',
      gitUrl: item.gitUrl || '',
      techUsed: Array.isArray(item.techUsed) ? item.techUsed.join(', ') : '',
      imgSrc: item.imgSrc || '',
      type: item.type || '',
      subheading: item.subheading || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
      sTags: Array.isArray(item.sTags) ? item.sTags.join(', ') : '',
      live: item.live || '',
      code: item.code || '',
      uses: item.uses || '',
      improvements: item.improvements || '',
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      featured: item.type === 'featured'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      techUsed: form.techUsed.split(',').map(s => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      sTags: form.sTags.split(',').map(s => s.trim()).filter(Boolean),
      type: form.featured ? 'featured' : '',
      gallery: form.gallery.filter(url => url.trim() !== '')
    };

    try {
      const session = localStorage.getItem('adminSession');
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
      const session = localStorage.getItem('adminSession');
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

  const addGalleryField = () => {
    setForm({ ...form, gallery: [...form.gallery, ''] });
  };

  const updateGalleryField = (index, value) => {
    const updated = [...form.gallery];
    updated[index] = value;
    setForm({ ...form, gallery: updated });
  };

  const removeGalleryField = (index) => {
    const updated = form.gallery.filter((_, i) => i !== index);
    setForm({ ...form, gallery: updated });
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
          {(() => {
            const featuredItems = items.filter((item) => item.type === 'featured');
            return featuredItems.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-zinc-50 mb-1">Featured Projects</h3>
                <div className="border-b border-zinc-700 mb-4" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {featuredItems.map((item) => (
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
                        imgSrc={item.imgSrc || ''}
                        title={item.title}
                        tags={item.techUsed || []}
                        projectLink={item.projectLink || '#'}
                        code={item.code || 'False'}
                        live={item.live || 'False'}
                        gitUrl={item.gitUrl || '#'}
                        projectId={item._id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

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
                      imgSrc={item.imgSrc || ''}
                      title={item.title}
                      tags={item.techUsed || []}
                      projectLink={item.projectLink || '#'}
                      code={item.code || 'False'}
                      live={item.live || 'False'}
                      gitUrl={item.gitUrl || '#'}
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
            <label className="label">Title</label>
            <input className="text-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Description</label>
            <textarea className="text-field" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Project Link</label>
            <input className="text-field" value={form.projectLink} onChange={(e) => setForm({ ...form, projectLink: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">GitHub URL</label>
            <input className="text-field" value={form.gitUrl} onChange={(e) => setForm({ ...form, gitUrl: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Tech Used (comma separated)</label>
            <input className="text-field" value={form.techUsed} onChange={(e) => setForm({ ...form, techUsed: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Image URL</label>
            <input className="text-field" value={form.imgSrc} onChange={(e) => setForm({ ...form, imgSrc: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Type</label>
            <input className="text-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Subheading</label>
            <input className="text-field" value={form.subheading} onChange={(e) => setForm({ ...form, subheading: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Tags (comma separated)</label>
            <input className="text-field" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">STags (comma separated)</label>
            <input className="text-field" value={form.sTags} onChange={(e) => setForm({ ...form, sTags: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Live</label>
            <input className="text-field" value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Code</label>
            <input className="text-field" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Uses</label>
            <input className="text-field" value={form.uses} onChange={(e) => setForm({ ...form, uses: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Improvements</label>
            <input className="text-field" value={form.improvements} onChange={(e) => setForm({ ...form, improvements: e.target.value })} />
          </div>
          <div className="input-box">
            <div className="flex items-center gap-2 mb-2">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              <label htmlFor="featured" className="label mb-0">Featured Project</label>
            </div>
          </div>
          <div className="input-box">
            <label className="label">Gallery</label>
            {form.gallery.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  className="text-field flex-1"
                  value={url}
                  onChange={(e) => updateGalleryField(index, e.target.value)}
                  placeholder="Image URL"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryField(index)}
                  className="btn btn-outline !text-red-400 hover:!bg-red-400/10"
                >
                  <span className="material-symbols-rounded text-[16px]">delete</span>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addGalleryField}
              className="btn btn-outline w-full"
            >
              <span className="material-symbols-rounded text-[16px]">add</span>
              Add Gallery Image
            </button>
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
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default ProjectsTab;
