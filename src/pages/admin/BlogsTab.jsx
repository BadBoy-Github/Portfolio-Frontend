import { useState, useEffect, useRef } from 'react';
import { IoAdd } from "react-icons/io5";
import { ConfirmModal, FormModal } from './AdminDashboard';
import BlogCard from '../../components/BlogCard';

const BlogsTab = ({ addToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ id: '', title: '', subtitle: '', date: '', readTime: '', tags: '', imageSrc: '', content: [] });
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

  const serializeBlocks = (blocks) => {
    return blocks.map(block => {
      if (block.type === 'h2') return `<h2>${block.value}</h2>`;
      if (block.type === 'p') return `<p>${block.value}</p>`;
      if (block.type === 'img') return `<img src="${block.value}" class="blog-image" />`;
      return '';
    }).join('\n');
  };

  const deserializeBlocks = (html) => {
    if (!html) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const blocks = [];
    doc.body.childNodes.forEach(node => {
      if (node.nodeType === 1) {
        if (node.tagName === 'H2') {
          blocks.push({ id: generateId(), type: 'h2', value: node.textContent });
        } else if (node.tagName === 'P') {
          blocks.push({ id: generateId(), type: 'p', value: node.innerHTML });
        } else if (node.tagName === 'IMG') {
          blocks.push({ id: generateId(), type: 'img', value: node.getAttribute('src') || '' });
        }
      }
    });
    return blocks;
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs`, {
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
    setForm({ id: '', title: '', subtitle: '', date: '', readTime: '', tags: '', imageSrc: '', content: [] });
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
      imageSrc: item.imageSrc || '',
      content: deserializeBlocks(item.content || ''),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      ...form,
      content: serializeBlocks(form.content),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      order: editingItem ? editingItem.order : items.length,
    };

    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const url = editingItem
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs`;
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
        addToast(data.message || 'Failed to save blog', 'error');
        return;
      }
      setModalOpen(false);
      fetchItems();
      addToast(
        editingItem ? 'Blog updated successfully' : 'Blog added successfully',
        'success'
      );
    } catch (err) {
      setError('Failed to save');
      addToast('Failed to save blog', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchItems();
        addToast('Blog deleted successfully', 'success');
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
    const draggedItem = updated[dragItem.current];
    updated.splice(dragItem.current, 1);
    updated.splice(dropIndex, 0, draggedItem);
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
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs/${item._id}/order`,
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
      addToast("Blog order updated successfully", "success");
      fetchItems();
    } catch (err) {
      addToast("Failed to save order", "error");
    }
  };

  const addBlock = (type) => {
    let value = '';
    if (type === 'h2') value = 'New Heading';
    if (type === 'p') value = 'New paragraph text';
    if (type === 'img') value = 'https://res.cloudinary.com/dz53e3szr/image/upload/v1774435128/skybrisk_logo_aladdz.webp';
    setForm({ ...form, content: [...form.content, { id: generateId(), type, value }] });
  };

  const removeBlock = (index) => {
    setForm({ ...form, content: form.content.filter((_, i) => i !== index) });
  };

  const updateBlock = (index, value) => {
    const updated = [...form.content];
    updated[index] = { ...updated[index], value };
    setForm({ ...form, content: updated });
  };

  const moveBlock = (from, to) => {
    const updated = [...form.content];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setForm({ ...form, content: updated });
  };

  const handleBlockDragStart = (e, index) => {
    dragItem.current = index;
    setDragOverIndex(null);
  };

  const handleBlockDragOver = (e, index) => {
    e.preventDefault();
    if (dragItem.current === null || dragItem.current === index) return;
    setDragOverIndex(index);
  };

  const handleBlockDrop = (dropIndex) => {
    if (dragItem.current === null) return;
    moveBlock(dragItem.current, dropIndex);
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const handleBlockDragEnd = () => {
    dragItem.current = null;
    setDragOverIndex(null);
  };

  return (
     <div className="px-4 md:px-8 pb-4 md:pb-8">
       <div className="flex items-center justify-between mb-6 sticky top-0 z-20 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-700/50 pt-8 pb-4">
         <div>
           <h2 className="text-2xl font-semibold text-zinc-50 flex items-center gap-2">Blogs <span className="text-sky-400">({items.length})</span></h2>
           <p className="text-zinc-400 text-sm mt-1">Manage blog posts and articles</p>
         </div>
         <div className="flex items-center gap-2">
           <button onClick={saveOrder} className="btn btn-outline">
             <span className="material-symbols-rounded text-[16px]">save</span>
             Save Order
           </button>
           <button onClick={openAdd} className="btn btn-primary"><IoAdd className="text-[18px]" /> Add Blog</button>
         </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => <div key={i} className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 h-40 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item._id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`relative group cursor-grab active:cursor-grabbing transition-all ${dragOverIndex === index ? "ring-2 ring-sky-500" : ""}`}
            >
              <div className="flex items-center gap-2 text-zinc-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-rounded text-[16px] cursor-grab active:cursor-grabbing">
                  drag_indicator
                </span>
              </div>
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
              <BlogCard
                blog={{
                  id: item.id,
                  title: item.title,
                  subtitle: item.subtitle || '',
                  date: item.date,
                  readTime: item.readTime || '',
                  tags: item.tags || [],
                  imageSrc: item.imageSrc || '',
                }}
              />
            </div>
          ))}
        </div>
      )}

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={`${editingItem ? 'Edit' : 'Add'} Blog`} error={error}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">ID</label>
            <input className="text-field" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required disabled={!!editingItem} />
          </div>
          <div className="input-box">
            <label className="label">Title</label>
            <input className="text-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Subtitle</label>
            <input className="text-field" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Date</label>
            <input className="text-field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div className="input-box">
            <label className="label">Read Time</label>
            <input className="text-field" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Tags (comma separated)</label>
            <input className="text-field" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Image URL</label>
            <input className="text-field" value={form.imageSrc} onChange={(e) => setForm({ ...form, imageSrc: e.target.value })} />
          </div>
          <div className="input-box">
            <label className="label">Content Blocks</label>
            <div className="flex gap-2 mb-3">
              <button type="button" onClick={() => addBlock('h2')} className="btn btn-outline text-xs">Heading</button>
              <button type="button" onClick={() => addBlock('p')} className="btn btn-outline text-xs">Paragraph</button>
              <button type="button" onClick={() => addBlock('img')} className="btn btn-outline text-xs">Image</button>
            </div>
            <div className="space-y-2">
              {form.content.map((block, index) => (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 cursor-grab active:cursor-grabbing" key={index}>
                  <span className="material-symbols-rounded text-zinc-400 cursor-grab active:cursor-grabbing shrink-0">drag_indicator</span>
                  {block.type === 'img' ? (
                    <input
                      className="text-field flex-1"
                      value={block.value}
                      onChange={(e) => updateBlock(index, e.target.value)}
                      placeholder="Image URL"
                    />
                  ) : (
                    <textarea
                      className="text-field flex-1"
                      rows={block.type === 'h2' ? 1 : 2}
                      value={block.value}
                      onChange={(e) => updateBlock(index, e.target.value)}
                      placeholder={block.type === 'h2' ? 'Heading text' : 'Paragraph text'}
                    />
                  )}
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 border border-zinc-700 rounded px-1.5 py-0.5">{block.type}</span>
                  <button type="button" onClick={() => removeBlock(index)} className="btn text-red-400 border-red-400 hover:bg-red-400 hover:text-zinc-900">
                    <span className="material-symbols-rounded text-[16px]">close</span>
                  </button>
                </div>
              ))}
              {form.content.length === 0 && (
                <p className="text-xs text-zinc-500">No content blocks yet. Add a heading, paragraph, or image above.</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </FormModal>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Blog"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default BlogsTab;
