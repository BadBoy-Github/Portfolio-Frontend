import { useState, useEffect, useRef } from "react";
import { IoAdd } from "react-icons/io5";
import { ConfirmModal, FormModal } from "./AdminDashboard";
import { AdminShell, SectionHead } from "./AdminShell";
import ProjectCard from "../../components/ProjectCard";
import ProjectFeaturedCard from "../../components/ProjectFeaturedCard";

const ProjectsTab = ({ addToast }) => {
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
    displayTags: [],
    gallery: [],
    featured: false,
  });
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragItem = useRef(null);

  const [featuredDragOverIndex, setFeaturedDragOverIndex] = useState(null);
  const featuredDragItem = useRef(null);

  const [nonFeaturedDragOverIndex, setNonFeaturedDragOverIndex] = useState(null);
  const nonFeaturedDragItem = useRef(null);

  const [galleryDragOverIndex, setGalleryDragOverIndex] = useState(null);
  const galleryDragItem = useRef(null);

  const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  };

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
      if (data.success) {
        const sorted = (data.data || [])
          .slice()
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setItems(sorted);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
     fetchItems();
   }, []);

  const moveItem = (list, from, to) => {
    const updated = [...list];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    return updated;
  };

  const handleFeaturedDragStart = (index) => {
    featuredDragItem.current = index;
    setFeaturedDragOverIndex(null);
  };

  const handleFeaturedDragOver = (e, index) => {
    e.preventDefault();
    if (featuredDragItem.current === null || featuredDragItem.current === index) return;
    setFeaturedDragOverIndex(index);
  };

  const handleFeaturedDrop = (dropIndex, featuredItems) => {
    if (featuredDragItem.current === null) return;
    const updated = moveItem(featuredItems, featuredDragItem.current, dropIndex);
    setItems((prev) => {
      const nonFeatured = prev.filter((item) => item.type !== "featured");
      return [...updated, ...nonFeatured];
    });
    featuredDragItem.current = null;
    setFeaturedDragOverIndex(null);
  };

  const handleFeaturedDragEnd = () => {
    featuredDragItem.current = null;
    setFeaturedDragOverIndex(null);
  };

  const handleNonFeaturedDragStart = (index) => {
    nonFeaturedDragItem.current = index;
    setNonFeaturedDragOverIndex(null);
  };

  const handleNonFeaturedDragOver = (e, index) => {
    e.preventDefault();
    if (nonFeaturedDragItem.current === null || nonFeaturedDragItem.current === index) return;
    setNonFeaturedDragOverIndex(index);
  };

  const handleNonFeaturedDrop = (dropIndex, nonFeaturedItems) => {
    if (nonFeaturedDragItem.current === null) return;
    const updated = moveItem(nonFeaturedItems, nonFeaturedDragItem.current, dropIndex);
    setItems((prev) => {
      const featured = prev.filter((item) => item.type === "featured");
      return [...featured, ...updated];
    });
    nonFeaturedDragItem.current = null;
    setNonFeaturedDragOverIndex(null);
  };

  const handleNonFeaturedDragEnd = () => {
    nonFeaturedDragItem.current = null;
    setNonFeaturedDragOverIndex(null);
  };

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
      displayTags: [],
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
      displayTags: Array.isArray(item.displayTags) ? item.displayTags : [],
      gallery: Array.isArray(item.gallery) ? item.gallery : [],
      featured: item.type === "featured",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      id: editingItem ? editingItem.id : generateId(),
      ...form,
      type: form.featured ? "featured" : "",
      gallery: form.gallery.filter((url) => url.trim() !== ""),
      order: editingItem ? editingItem.order : items.length,
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
        addToast(data.message || "Failed to save project", "error");
        return;
      }
      setModalOpen(false);
      fetchItems();
      addToast(
        editingItem ? "Project updated successfully" : "Project added successfully",
        "success"
      );
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
      if (data.success) {
        fetchItems();
        addToast('Project deleted successfully', 'success');
      }
    } catch (err) {
      addToast('Failed to delete project', 'error');
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
            className="btn btn-icon btn-add"
          >
            <span className="material-symbols-rounded text-[16px]">add</span>
            <span className="sr-only">Add {label}</span>
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, [field]: [] })}
            className="btn btn-icon btn-clear"
          >
            <span className="material-symbols-rounded text-[16px]">
              refresh
            </span>
            <span className="sr-only">Clear all {label}</span>
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
              className={`tag-chip ${dragOverIndex === index ? "tag-chip-over" : ""}`}
            >
              <span className="material-symbols-rounded text-[16px] text-ink-faint cursor-grab active:cursor-grabbing">
                drag_indicator
              </span>
              {item}
              <button
                type="button"
                onClick={() => removeItem(field, index)}
                className="material-symbols-rounded text-[16px] text-ink-faint hover:text-marker transition-colors"
              >
                close
                <span className="sr-only">Remove {item}</span>
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  const moveGalleryItem = (from, to) => {
    const updated = [...form.gallery];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setForm({ ...form, gallery: updated });
  };

  const handleGalleryDragStart = (index) => {
    galleryDragItem.current = index;
    setGalleryDragOverIndex(null);
  };

  const handleGalleryDragOver = (e, index) => {
    e.preventDefault();
    if (galleryDragItem.current === null || galleryDragItem.current === index) return;
    setGalleryDragOverIndex(index);
  };

  const handleGalleryDrop = (dropIndex) => {
    if (galleryDragItem.current === null) return;
    moveGalleryItem(galleryDragItem.current, dropIndex);
    galleryDragItem.current = null;
    setGalleryDragOverIndex(null);
  };

  const handleGalleryDragEnd = () => {
    galleryDragItem.current = null;
    setGalleryDragOverIndex(null);
  };

  const saveAllOrders = async () => {
    const session = localStorage.getItem("adminSession");
    const token = session ? JSON.parse(session).token : localStorage.getItem("adminToken");
    const featuredItems = items.filter((item) => item.type === "featured");
    const nonFeaturedItems = items.filter((item) => item.type !== "featured");
    try {
      await Promise.all(
        items.map((item, index) => {
          let order;
          if (item.type === "featured") {
            order = featuredItems.findIndex((f) => f._id === item._id);
          } else {
            order = nonFeaturedItems.findIndex((n) => n._id === item._id);
          }
          return fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/projects/${item._id}/order`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ order }),
            },
          );
        }),
      );
      addToast("Project order updated successfully", "success");
      fetchItems();
    } catch (err) {
      addToast("Failed to save order", "error");
    }
  };

  return (
   <AdminShell
      title="Projects"
      count={items.length}
      subtitle="Manage your portfolio projects"
      actions={
        <>
          <button onClick={saveAllOrders} className="btn btn-outline">
            <span className="material-symbols-rounded text-[16px]">save</span>
            Save Order
          </button>
          <button onClick={openAdd} className="btn btn-primary">
            <IoAdd className="text-[18px]" />
            Add Project
          </button>
        </>
      }
    >

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="admin-skeleton h-40" />
          ))}
        </div>
      ) : (
        <>
          {(() => {
            const featuredItems = items.filter(
              (item) => item.type === "featured",
            );
            const nonFeaturedItems = items.filter(
              (item) => item.type !== "featured",
            );
            return (
              <>
                {featuredItems.length > 0 && (
                  <div className="mb-8">
                    <SectionHead
                      title="Featured Projects"
                      count={featuredItems.length}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      {featuredItems.map((item, index) => (
                        <div
                          key={item._id}
                          draggable
                          onDragStart={() => handleFeaturedDragStart(index)}
                          onDragOver={(e) => handleFeaturedDragOver(e, index)}
                          onDrop={() =>
                            handleFeaturedDrop(index, featuredItems)
                          }
                          onDragEnd={handleFeaturedDragEnd}
                          className={`admin-card ${featuredDragOverIndex === index ? "admin-drop" : ""}`}
                        >
                          <div className="admin-card-grab">
                            <span className="material-symbols-rounded text-[16px] cursor-grab active:cursor-grabbing">
                              drag_indicator
                            </span>
                            <span className="font-hand text-base">
                              Drag to reorder
                            </span>
                          </div>
                          <div className="admin-card-actions">
                            <button
                              onClick={() => openEdit(item)}
                              className="btn btn-outline btn-icon"
                            >
                              <span className="material-symbols-rounded text-[16px]">
                                edit
                              </span>
                              <span className="sr-only">Edit {item.title}</span>
                            </button>
                            <button
                              onClick={() => setDeleteTarget(item)}
                              className="btn btn-outline btn-icon btn-danger"
                            >
                              <span className="material-symbols-rounded text-[16px]">
                                delete
                              </span>
                              <span className="sr-only">Delete {item.title}</span>
                            </button>
                          </div>
                           <ProjectFeaturedCard
                             imgSrc={item.imgSrc || ""}
                             title={item.title}
                             techUsed={item.techUsed || []}
                             projectLink={item.projectLink || ""}
                             code={item.code || "False"}
                             live={item.live || "False"}
                             gitUrl={item.gitUrl || ""}
                             projectId={item._id}
                             displayTags={item.displayTags || []}
                           />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {nonFeaturedItems.length > 0 && (
                  <div>
                    <SectionHead title="Projects" count={nonFeaturedItems.length} />
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {nonFeaturedItems.map((item, index) => (
                        <div
                          key={item._id}
                          draggable
                          onDragStart={() => handleNonFeaturedDragStart(index)}
                          onDragOver={(e) =>
                            handleNonFeaturedDragOver(e, index)
                          }
                          onDrop={() =>
                            handleNonFeaturedDrop(index, nonFeaturedItems)
                          }
                          onDragEnd={handleNonFeaturedDragEnd}
                          className={`admin-card ${nonFeaturedDragOverIndex === index ? "admin-drop" : ""}`}
                        >
                          <div className="admin-card-grab">
                            <span className="material-symbols-rounded text-[16px] cursor-grab active:cursor-grabbing">
                              drag_indicator
                            </span>
                            <span className="font-hand text-base">
                              Drag to reorder
                            </span>
                          </div>
                          <div className="admin-card-actions">
                            <button
                              onClick={() => openEdit(item)}
                              className="btn btn-outline btn-icon"
                            >
                              <span className="material-symbols-rounded text-[16px]">
                                edit
                              </span>
                              <span className="sr-only">Edit {item.title}</span>
                            </button>
                            <button
                              onClick={() => setDeleteTarget(item)}
                              className="btn btn-outline btn-icon btn-danger"
                            >
                              <span className="material-symbols-rounded text-[16px]">
                                delete
                              </span>
                              <span className="sr-only">Delete {item.title}</span>
                            </button>
                          </div>
                           <ProjectCard
                             imgSrc={item.imgSrc || ""}
                             title={item.title}
                             techUsed={item.techUsed || []}
                             projectLink={item.projectLink || ""}
                             code={item.code || "False"}
                             live={item.live || "False"}
                             gitUrl={item.gitUrl || ""}
                             projectId={item._id}
                             displayTags={item.displayTags || []}
                           />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {items.length === 0 && (
            <p className="admin-empty">No items found.</p>
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
          <TagInput
            label="Display Tags"
            field="displayTags"
            placeholder="Add display tag"
          />
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
            <label className="label">Applications</label>
            <textarea
              className="text-field"
              rows={4}
              value={form.uses}
              onChange={(e) => setForm({ ...form, uses: e.target.value })}
            />
          </div>
          <div className="input-box">
            <label className="label">Unique Features</label>
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
               <div
                 key={index}
                 draggable
                 onDragStart={() => handleGalleryDragStart(index)}
                 onDragOver={(e) => handleGalleryDragOver(e, index)}
                 onDrop={() => handleGalleryDrop(index)}
                 onDragEnd={handleGalleryDragEnd}
className={`flex gap-2 mb-2 items-center cursor-grab active:cursor-grabbing transition-all ${galleryDragOverIndex === index ? "admin-drop" : ""}`}
                >
                  <span className="material-symbols-rounded text-[16px] text-ink-faint">
                    drag_indicator
                  </span>
                 <input
                   className="text-field flex-1"
                   value={url}
                   onChange={(e) => updateGalleryField(index, e.target.value)}
                   placeholder="Image URL"
                 />
                 <button
                   type="button"
                   onClick={() => removeGalleryField(index)}
className="btn btn-outline btn-danger"
                  >
                    <span className="material-symbols-rounded text-[16px]">
                      delete
                    </span>
                    <span className="sr-only">Remove gallery image</span>
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
    </AdminShell>
  );
};

export default ProjectsTab;
