import { useState, useEffect, useRef } from "react";
import { ConfirmModal, FormModal } from "./AdminDashboard";
import ProjectCard from "../../components/ProjectCard";
import ProjectFeaturedCard from "../../components/ProjectFeaturedCard";

const ProjectsTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: "",
    subheading: "",
    description: "",
    projectLink: "",
    gitUrl: "",
    imgSrc: "",
    uses: "",
    improvements: "",
    techUsed: [],
    sTags: [],
    gallery: [],
    featured: false,
  });
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragItem = useRef(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const session = localStorage.getItem("adminSession");
      const token = session
        ? JSON.parse(session).token
        : localStorage.getItem("adminToken");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/projects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) setItems(data.data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAdd = () => {
    setEditingItem(null);
    setForm({
      title: "",
      subheading: "",
      description: "",
      projectLink: "",
      gitUrl: "",
      imgSrc: "",
      uses: "",
      improvements: "",
      techUsed: [],
      sTags: [],
      gallery: [],
      featured: false,
    });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      subheading: item.subheading || "",
      description: item.description,
      projectLink: item.projectLink || "",
      gitUrl: item.gitUrl || "",
      imgSrc: item.imgSrc || "",
      uses: item.uses || "",
      improvements: item.improvements || "",
      techUsed: Array.isArray(item.techUsed) ? item.techUsed : [],
      sTags: Array.isArray(item.sTags) ? item.sTags : [],
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      featured: item.type === "featured",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      ...form,
      type: form.featured ? "featured" : "",
      gallery: form.gallery.filter((url) => url.trim() !== ""),
    };

    try {
      const session = localStorage.getItem("adminSession");
      const token = session
        ? JSON.parse(session).token
        : localStorage.getItem("adminToken");
      const url = editingItem
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/projects/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/projects`;
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to save");
        return;
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError("Failed to save");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const session = localStorage.getItem("adminSession");
      const token = session
        ? JSON.parse(session).token
        : localStorage.getItem("adminToken");
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/projects/${deleteTarget._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) fetchItems();
    } catch (err) {
      alert("Failed to delete");
    } finally {
      setDeleteTarget(null);
    }
  };

  const addItem = (field, value) => {
    if (!value.trim()) return;
    setForm({ ...form, [field]: [...form[field], value.trim()] });
  };

  const removeItem = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated });
  };

  const handleDragStart = (field, index) => {
    dragItem.current = { field, index };
    setDragOverIndex(null);
  };

  const handleDragOver = (e, field, index) => {
    e.preventDefault();
    if (
      !dragItem.current ||
      dragItem.current.field !== field ||
      dragItem.current.index === index
    )
      return;
    setDragOverIndex(index);
  };

  const handleDrop = (field, dropIndex) => {
    if (!dragItem.current || dragItem.current.field !== field) return;
    const items = [...form[field]];
    const draggedIndex = dragItem.current.index;
    const draggedItem = items[draggedIndex];
    items.splice(draggedIndex, 1);
    items.splice(dropIndex, 0, draggedItem);
    setForm({ ...form, [field]: items });
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const addGalleryField = () => {
    setForm({ ...form, gallery: [...form.gallery, ""] });
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

  const TagInput = ({ label, field, placeholder }) => {
    const [input, setInput] = useState("");
    return (
      <div className="input-box">
        <label className="label">{label}</label>
        <div className="flex gap-2 mb-2">
          <input
            className="text-field flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem(field, input);
                setInput("");
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              addItem(field, input);
              setInput("");
            }}
            className="btn text-sky-400 border-sky-400 hover:bg-sky-400 hover:text-zinc-900"
          >
            <span className="material-symbols-rounded text-[16px]">add</span>
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, [field]: [] })}
            className="btn text-red-400 border-red-400 hover:bg-red-400 hover:text-zinc-900"
          >
            <span className="material-symbols-rounded text-[16px]">
              refresh
            </span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form[field].map((item, index) => (
            <span
              key={index}
              draggable
              onDragStart={() => handleDragStart(field, index)}
              onDragOver={(e) => handleDragOver(e, field, index)}
              onDrop={() => handleDrop(field, index)}
              onDragEnd={handleDragEnd}
              className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-zinc-700 text-zinc-200 font-medium cursor-grab active:cursor-grabbing transition-colors ${dragOverIndex === index ? "ring-2 ring-sky-500 bg-zinc-600" : "hover:bg-zinc-600"}`}
            >
              <span className="material-symbols-rounded text-[14px] text-zinc-400 cursor-grab active:cursor-grabbing">
                drag_indicator
              </span>
              {item}
              <button
                type="button"
                onClick={() => removeItem(field, index)}
                className="material-symbols-rounded text-[14px] text-zinc-400 hover:text-red-400 transition-colors"
              >
                close
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-50">Projects</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <button onClick={openAdd} className="btn btn-primary">
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 h-40 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {(() => {
            const featuredItems = items.filter(
              (item) => item.type === "featured",
            );
            return (
              featuredItems.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-zinc-50 mb-1">
                    Featured Projects
                  </h3>
                  <div className="border-b border-zinc-700 mb-4" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {featuredItems.map((item) => (
                      <div key={item._id} className="relative group">
                        <div className="flex items-center justify-end mb-2">
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEdit(item)}
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
                        <ProjectFeaturedCard
                          imgSrc={item.imgSrc || ""}
                          title={item.title}
                          techUsed={item.techUsed || []}
                          projectLink={item.projectLink || "#"}
                          code={item.code || "False"}
                          live={item.live || "False"}
                          gitUrl={item.gitUrl || "#"}
                          projectId={item._id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            );
          })()}

          {items.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-50 mb-1">
                All Projects
              </h3>
              <div className="border-b border-zinc-700 mb-4" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div key={item._id} className="relative group">
                    <div className="flex items-center justify-end mb-2">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(item)}
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
                    <ProjectCard
                      imgSrc={item.imgSrc || ""}
                      title={item.title}
                      techUsed={item.techUsed || []}
                      projectLink={item.projectLink || "#"}
                      code={item.code || "False"}
                      live={item.live || "False"}
                      gitUrl={item.gitUrl || "#"}
                      projectId={item._id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {items.length === 0 && (
            <p className="text-zinc-400 col-span-full">No items found.</p>
          )}
        </>
      )}

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editingItem ? "Edit" : "Add"} Project`}
        error={error}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">Title</label>
            <input
              className="text-field"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Subheading</label>
            <input
              className="text-field"
              value={form.subheading}
              onChange={(e) => setForm({ ...form, subheading: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Description</label>
            <textarea
              className="text-field"
              rows={5}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Project Link</label>
            <input
              className="text-field"
              value={form.projectLink}
              onChange={(e) =>
                setForm({ ...form, projectLink: e.target.value })
              }
            />
          </div>
          <div className="input-box">
            <label className="label">GitHub URL</label>
            <input
              className="text-field"
              value={form.gitUrl}
              onChange={(e) => setForm({ ...form, gitUrl: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Image URL</label>
            <input
              className="text-field"
              value={form.imgSrc}
              onChange={(e) => setForm({ ...form, imgSrc: e.target.value })}
            />
          </div>
          <TagInput
            label="Technology Used"
            field="techUsed"
            placeholder="Add technology"
          />
          <TagInput
            label="Search Tags"
            field="sTags"
            placeholder="Add search tag"
          />
          <div className="input-box">
            <label className="label">Uses</label>
            <textarea
              className="text-field"
              rows={4}
              value={form.uses}
              onChange={(e) => setForm({ ...form, uses: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Improvements</label>
            <textarea
              className="text-field"
              rows={4}
              value={form.improvements}
              onChange={(e) =>
                setForm({ ...form, improvements: e.target.value })
              }
            />
          </div>
          <div className="input-box">
            <div className="flex items-center gap-2 mb-2">
              <input
                id="featured"
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              <label htmlFor="featured" className="label mb-0">
                Featured Project
              </label>
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
                  <span className="material-symbols-rounded text-[16px]">
                    delete
                  </span>
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
