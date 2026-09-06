import { useState, useEffect, useRef } from 'react';
import { IoAdd } from "react-icons/io5";
import { ConfirmModal, FormModal } from './AdminDashboard';
import ExperienceCard from '../../components/ExperienceCard';
import ExperienceCompoundCard from '../../components/ExperienceCompoundCard';
import DraggableTagInput from '../../components/DraggableTagInput';

const ExperienceTab = ({ addToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [compoundModalOpen, setCompoundModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', instName: '', year: '', desc: '', skills: [], instLink: '', role: '', instLogo: '', imgSrc: '', certifi: false });
  const [compoundForm, setCompoundForm] = useState({ instName: '', instLogo: '', instLink: '', period: '', roles: [] });
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragItem = useRef(null);
  const [compoundDragOverIndex, setCompoundDragOverIndex] = useState(null);
  const compoundDragItem = useRef(null);

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/experience`, {
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
    setTypeModalOpen(true);
  };

  const openSingleAdd = () => {
    setEditingItem(null);
    setForm({ name: '', instName: '', year: '', desc: '', skills: [], instLink: '', role: '', instLogo: '', imgSrc: '', certifi: false });
    setTypeModalOpen(false);
    setModalOpen(true);
  };

  const openCompoundAdd = () => {
    setEditingItem(null);
    setCompoundForm({ instName: '', instLogo: '', instLink: '', period: '', roles: [{ year: '', name: '', role: '', desc: '', imgSrc: '', certifi: false, skills: [] }] });
    setTypeModalOpen(false);
    setCompoundModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      instName: item.instName,
      year: item.year,
      desc: item.desc,
      skills: Array.isArray(item.skills) ? item.skills : (typeof item.skills === 'string' ? item.skills.split(',').map(s => s.trim()).filter(Boolean) : []),
      instLink: item.instLink || '',
      role: item.role || '',
      instLogo: item.instLogo || '',
      imgSrc: item.imgSrc || '',
      certifi: !!item.certifi
    });
    setModalOpen(true);
  };

  const openCompoundEdit = (item) => {
    setEditingItem(item);
    setCompoundForm({
      instName: item.instName || '',
      instLogo: item.instLogo || '',
      instLink: item.instLink || '',
      period: item.period || '',
      roles: Array.isArray(item.content) && item.content.length > 0
        ? item.content.map(c => ({
            year: c.year || '',
            name: c.name || '',
            role: c.role || '',
            desc: c.desc || '',
            imgSrc: c.imgSrc || '',
            certifi: !!c.certifi,
            skills: Array.isArray(c.skills) ? c.skills : (typeof c.skills === 'string' ? c.skills.split(',').map(s => s.trim()).filter(Boolean) : []),
          }))
        : [{ year: '', name: '', role: '', desc: '', imgSrc: '', certifi: false, skills: [] }],
    });
    setCompoundModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      id: editingItem ? editingItem.id : generateId(),
      ...form,
      skills: form.skills,
      order: editingItem ? editingItem.order : items.length,
      compound: false,
    };

    try {
      const session = localStorage.getItem('adminSession');
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
        addToast(data.message || 'Failed to save experience', 'error');
        return;
      }
      setModalOpen(false);
      fetchItems();
      addToast(
        editingItem ? 'Experience updated successfully' : 'Experience added successfully',
        'success'
      );
    } catch (err) {
      setError('Failed to save');
      addToast('Failed to save experience', 'error');
    }
  };

  const handleCompoundSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      id: editingItem ? editingItem.id : generateId(),
      name: compoundForm.roles[0]?.name || compoundForm.instName || '',
      instName: compoundForm.instName,
      instLogo: compoundForm.instLogo,
      instLink: compoundForm.instLink,
      period: compoundForm.period,
      compound: true,
      order: editingItem ? editingItem.order : items.length,
      content: compoundForm.roles.map(role => ({
        year: role.year,
        name: role.name,
        role: role.role,
        desc: role.desc,
        imgSrc: role.imgSrc,
        certifi: role.certifi,
        skills: role.skills,
      })),
    };

    try {
      const session = localStorage.getItem('adminSession');
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
        addToast(data.message || 'Failed to save compound experience', 'error');
        return;
      }
      setCompoundModalOpen(false);
      fetchItems();
      addToast(
        editingItem ? 'Experience updated successfully' : 'Experience added successfully',
        'success'
      );
    } catch (err) {
      setError('Failed to save');
      addToast('Failed to save experience', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const session = localStorage.getItem('adminSession');
      const token = session ? JSON.parse(session).token : localStorage.getItem('adminToken');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/experience/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchItems();
        addToast('Experience deleted successfully', 'success');
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
    const [moved] = updated.splice(dragItem.current, 1);
    updated.splice(dropIndex, 0, moved);
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
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/experience/${item._id}/order`,
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
      addToast("Experience order updated successfully", "success");
      fetchItems();
    } catch (err) {
      addToast("Failed to save order", "error");
    }
  };

  const updateCompoundField = (field, value) => {
    setCompoundForm({ ...compoundForm, [field]: value });
  };

  const updateRoleField = (roleIndex, field, value) => {
    const updatedRoles = [...compoundForm.roles];
    updatedRoles[roleIndex] = { ...updatedRoles[roleIndex], [field]: value };
    setCompoundForm({ ...compoundForm, roles: updatedRoles });
  };

  const addRole = () => {
    setCompoundForm({
      ...compoundForm,
      roles: [...compoundForm.roles, { year: '', name: '', role: '', desc: '', imgSrc: '', certifi: false, skills: [] }],
    });
  };

  const removeRole = (roleIndex) => {
    const updatedRoles = compoundForm.roles.filter((_, i) => i !== roleIndex);
    setCompoundForm({ ...compoundForm, roles: updatedRoles });
  };

  const handleCompoundRoleDragStart = (index) => {
    compoundDragItem.current = index;
    setCompoundDragOverIndex(null);
  };

  const handleCompoundRoleDragOver = (e, index) => {
    e.preventDefault();
    if (compoundDragItem.current === null || compoundDragItem.current === index) return;
    setCompoundDragOverIndex(index);
  };

  const handleCompoundRoleDrop = (dropIndex) => {
    if (compoundDragItem.current === null) return;
    const updated = [...compoundForm.roles];
    const [moved] = updated.splice(compoundDragItem.current, 1);
    updated.splice(dropIndex, 0, moved);
    setCompoundForm({ ...compoundForm, roles: updated });
    compoundDragItem.current = null;
    setCompoundDragOverIndex(null);
  };

  const handleCompoundRoleDragEnd = () => {
    compoundDragItem.current = null;
    setCompoundDragOverIndex(null);
  };

  const defaultInstLogo = "https://res.cloudinary.com/dz53e3szr/image/upload/v1774435128/skybrisk_logo_aladdz.webp";

  return (
    <div className="px-4 md:px-8 pb-4 md:pb-8">
      <div className="flex items-center justify-between mb-6 sticky top-0 z-20 bg-zinc-900/80 backdrop-blur-xl pt-8 pb-4 border-b border-zinc-700">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-50 flex items-center gap-2">
            Experience <span className="text-sky-400">({items.length})</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Manage work experience and internships
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={saveOrder} className="btn btn-outline">
            <span className="material-symbols-rounded text-[16px]">save</span>
            Save Order
          </button>
          <button onClick={openAdd} className="btn btn-primary">
            <IoAdd className="text-[18px]" />
            Add Experience
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-zinc-400">Loading...</p>
      ) : (
        <ul className="space-y-0 pl-6">
          {items.map((item, index) => (
            <li
              key={item._id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`relative group/item cursor-grab active:cursor-grabbing transition-all ${dragOverIndex === index ? "ring-2 ring-sky-500" : ""}`}
            >
              <div className="flex items-center gap-2 text-zinc-400 mb-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                <span className="material-symbols-rounded text-[16px] cursor-grab active:cursor-grabbing">
                  drag_indicator
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-zinc-500">{item.year}</p>
                <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <button
                    onClick={() => item.compound ? openCompoundEdit(item) : openEdit(item)}
                    className="btn btn-outline text-xs py-1 px-2"
                  >
                    <span className="material-symbols-rounded text-[16px]">
                      edit
                    </span>
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="btn btn-outline !text-red-400 hover:!bg-red-400/10 text-xs py-1 px-2"
                  >
                    <span className="material-symbols-rounded text-[16px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>
              {item.compound ? (
                <div className="mb-6">
                  <div className="p-4 bg-zinc-800/50 rounded-xl mb-3">
                    <p className="font-semibold text-zinc-200">{item.instName}</p>
                    {item.period && <p className="text-xs text-zinc-400">{item.period}</p>}
                  </div>
                  {(item.content || []).map((content, i) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <ExperienceCompoundCard
                        year={content.year}
                        name={content.name}
                        role={content.role}
                        desc={content.desc}
                        imgSrc={content.imgSrc || ""}
                        certifi={!!content.certifi}
                        skills={content.skills || []}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <ExperienceCard
                  year={item.year}
                  name={item.name}
                  role={item.role || ""}
                  instName={item.instName}
                  instLogo={
                    item.instLogo ||
                    defaultInstLogo
                  }
                  instLink={item.instLink || "#"}
                  desc={item.desc}
                  imgSrc={item.imgSrc || ""}
                  certifi={!!item.certifi}
                  skills={item.skills || []}
                />
              )}
            </li>
          ))}
          {items.length === 0 && (
            <p className="text-zinc-400">No items found.</p>
          )}
        </ul>
      )}

      <FormModal
        open={typeModalOpen}
        onClose={() => setTypeModalOpen(false)}
        title="Add Experience"
        error={error}
      >
        <div className="space-y-3">
          <button
            onClick={openSingleAdd}
            className="btn btn-outline w-full text-left justify-start"
          >
            <span className="material-symbols-rounded text-[16px] mr-2">person</span>
            Single Experience (One company, one role)
          </button>
          <button
            onClick={openCompoundAdd}
            className="btn btn-outline w-full text-left justify-start"
          >
            <span className="material-symbols-rounded text-[16px] mr-2">group</span>
            Compound Experience (One company, multiple roles)
          </button>
        </div>
      </FormModal>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editingItem ? 'Edit' : 'Add'} Experience`}
        error={error}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">Name / Role Title</label>
            <input
              className="text-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Institute / Company</label>
            <input
              className="text-field"
              value={form.instName}
              onChange={(e) => setForm({ ...form, instName: e.target.value })}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Year</label>
            <input
              className="text-field"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Description</label>
            <textarea
              className="text-field"
              rows={3}
              value={form.desc}
              onChange={(e) =>
                setForm({ ...form, desc: e.target.value })
              }
              required
            />
          </div>
          <DraggableTagInput
            label="Skills"
            placeholder="Add a skill"
            value={form.skills}
            onChange={(skills) => setForm({ ...form, skills })}
          />
          <div className="input-box">
            <label className="label">Link</label>
            <input
              className="text-field"
              value={form.instLink}
              onChange={(e) => setForm({ ...form, instLink: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Role</label>
            <input
              className="text-field"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Institute Logo URL</label>
            <input
              className="text-field"
              value={form.instLogo}
              onChange={(e) => setForm({ ...form, instLogo: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Certificate Image URL</label>
            <input
              className="text-field"
              value={form.imgSrc}
              onChange={(e) => setForm({ ...form, imgSrc: e.target.value })}
            />
          </div>
          <div className="input-box flex items-center gap-2">
            <input
              id="certifi"
              type="checkbox"
              checked={form.certifi}
              onChange={(e) =>
                setForm({ ...form, certifi: e.target.checked })
              }
            />
            <label htmlFor="certifi" className="text-sm text-zinc-300">
              Has certificate
            </label>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </FormModal>

      <FormModal
        open={compoundModalOpen}
        onClose={() => setCompoundModalOpen(false)}
        title={`${editingItem ? 'Edit' : 'Add'} Compound Experience`}
        error={error}
      >
        <form onSubmit={handleCompoundSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">Company Name</label>
            <input
              className="text-field"
              value={compoundForm.instName}
              onChange={(e) => updateCompoundField('instName', e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Company Logo URL</label>
            <input
              className="text-field"
              value={compoundForm.instLogo}
              onChange={(e) => updateCompoundField('instLogo', e.target.value)}
            />
          </div>
          <div className="input-box">
            <label className="label">Company Link</label>
            <input
              className="text-field"
              value={compoundForm.instLink}
              onChange={(e) => updateCompoundField('instLink', e.target.value)}
            />
          </div>
          <div className="input-box">
            <label className="label">Period</label>
            <input
              className="text-field"
              value={compoundForm.period}
              onChange={(e) => updateCompoundField('period', e.target.value)}
              placeholder="e.g., 2022 - Present"
            />
          </div>

          <div className="border-t border-zinc-700 pt-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-semibold text-zinc-50">Roles</h4>
              <button
                type="button"
                onClick={addRole}
                className="btn btn-outline text-xs py-1 px-2"
              >
                <span className="material-symbols-rounded text-[16px]">add</span>
                Add Role
              </button>
            </div>

            {compoundForm.roles.map((role, roleIndex) => (
              <div
                key={roleIndex}
                draggable
                onDragStart={() => handleCompoundRoleDragStart(roleIndex)}
                onDragOver={(e) => handleCompoundRoleDragOver(e, roleIndex)}
                onDrop={() => handleCompoundRoleDrop(roleIndex)}
                onDragEnd={handleCompoundRoleDragEnd}
                className={`relative p-4 bg-zinc-800/30 rounded-xl mb-3 cursor-grab active:cursor-grabbing transition-all ${compoundDragOverIndex === roleIndex ? "ring-2 ring-sky-500" : ""}`}
              >
                <div className="flex items-center gap-2 text-zinc-400 mb-2">
                  <span className="material-symbols-rounded text-[16px] cursor-grab active:cursor-grabbing">
                    drag_indicator
                  </span>
                  <span className="text-xs text-zinc-500">Role {roleIndex + 1}</span>
                  {compoundForm.roles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRole(roleIndex)}
                      className="ml-auto text-red-400 hover:text-red-300"
                    >
                      <span className="material-symbols-rounded text-[14px]">close</span>
                    </button>
                  )}
                </div>

                <div className="input-box">
                  <label className="label">Year</label>
                  <input
                    className="text-field"
                    value={role.year}
                    onChange={(e) => updateRoleField(roleIndex, 'year', e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <label className="label">Name / Role Title</label>
                  <input
                    className="text-field"
                    value={role.name}
                    onChange={(e) => updateRoleField(roleIndex, 'name', e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <label className="label">Role</label>
                  <input
                    className="text-field"
                    value={role.role}
                    onChange={(e) => updateRoleField(roleIndex, 'role', e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <label className="label">Description</label>
                  <textarea
                    className="text-field"
                    rows={3}
                    value={role.desc}
                    onChange={(e) => updateRoleField(roleIndex, 'desc', e.target.value)}
                  />
                </div>
                <DraggableTagInput
                  label="Skills"
                  placeholder="Add a skill"
                  value={role.skills}
                  onChange={(skills) => updateRoleField(roleIndex, 'skills', skills)}
                />
                <div className="input-box">
                  <label className="label">Certificate Image URL</label>
                  <input
                    className="text-field"
                    value={role.imgSrc}
                    onChange={(e) => updateRoleField(roleIndex, 'imgSrc', e.target.value)}
                  />
                </div>
                <div className="input-box flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={role.certifi}
                    onChange={(e) => updateRoleField(roleIndex, 'certifi', e.target.checked)}
                  />
                  <label className="text-sm text-zinc-300">Has certificate</label>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => setCompoundModalOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
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
