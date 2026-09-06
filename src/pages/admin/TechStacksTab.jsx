import { useState, useEffect, useRef } from "react";
import { IoAdd } from "react-icons/io5";
import { ConfirmModal, FormModal } from "./AdminDashboard";
import SkillCard from "../../components/SkillCard";

const TechStacksTab = ({ addToast }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ label: "", desc: "", imgSrc: "" });
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
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        const sorted = (data.data || [])
          .slice()
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setSkills(sorted);
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

  const openAdd = () => {
    setEditingItem(null);
    setForm({ label: "", desc: "", imgSrc: "" });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      label: item.label,
      desc: item.desc || "",
      imgSrc: item.imgSrc || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = { ...form };

    try {
      const session = localStorage.getItem("adminSession");
      const token = session
        ? JSON.parse(session).token
        : localStorage.getItem("adminToken");
      const url = editingItem
        ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks/${editingItem._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks`;
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
        addToast(data.message || "Failed to save tech stack", "error");
        return;
      }
      setModalOpen(false);
      fetchItems();
      addToast(
        editingItem ? "Tech stack updated successfully" : "Tech stack added successfully",
        "success"
      );
    } catch (err) {
      setError("Failed to save");
      addToast("Failed to save tech stack", "error");
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
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks/${deleteTarget._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        fetchItems();
        addToast('Tech stack deleted successfully', 'success');
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
    const updated = [...skills];
    const draggedItem = updated[dragItem.current];
    updated.splice(dragItem.current, 1);
    updated.splice(dropIndex, 0, draggedItem);
    setSkills(updated);
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const saveOrder = async () => {
    try {
      const session = localStorage.getItem("adminSession");
      const token = session
        ? JSON.parse(session).token
        : localStorage.getItem("adminToken");
      const updates = skills.map((item, index) => ({
        _id: item._id,
        order: index,
      }));
      await Promise.all(
        updates.map((item) =>
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/tech-stacks/${item._id}/order`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ order: item.order }),
            },
          ),
        ),
      );
      addToast("Tech stack order updated successfully", "success");
      fetchItems();
    } catch (err) {
      addToast("Failed to save order", "error");
    }
  };

  return (
     <div className="px-4 md:px-8 pb-4 md:pb-8">
      <div className="flex items-center justify-between mb-6 sticky top-0 z-20 bg-zinc-900 pt-8 pb-4 border-b border-zinc-700">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-50 flex items-center gap-2">Tech Stacks <span className="text-sky-400">({skills.length})</span></h2>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your technical skills
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={saveOrder} className="btn btn-outline">
            <span className="material-symbols-rounded text-[16px]">save</span>
            Save Order
          </button>
          <button onClick={openAdd} className="btn btn-primary">
            <IoAdd className="text-[18px]" />
            Add Tech Stack
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-zinc-800 rounded-xl p-5 ring-1 ring-zinc-50/5 h-24 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {skills.map((item, index) => (
              <div
                key={item._id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={`relative group cursor-grab active:cursor-grabbing transition-all ${dragOverIndex === index ? "ring-2 ring-sky-500" : ""}`}
              >
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
                <div className="flex items-center gap-2">
                  <span className="material-symbols-rounded text-zinc-400 cursor-grab active:cursor-grabbing">
                    drag_indicator
                  </span>
                  <div className="flex-1">
                    <SkillCard
                      imgSrc={
                        item.imgSrc ||
                        "https://res.cloudinary.com/dz53e3szr/image/upload/v1774435625/react_hzi0da.svg"
                      }
                      label={item.label}
                      desc={item.desc}
                    />
                  </div>
                </div>
              </div>
            ))}
            {skills.length === 0 && (
              <p className="text-zinc-400 col-span-full">No items found.</p>
            )}
          </div>
        </>
      )}

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${editingItem ? "Edit" : "Add"} Tech Stack`}
        error={error}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="input-box">
            <label className="label">Label</label>
            <input
              className="text-field"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              required
            />
          </div>
          <div className="input-box">
            <label className="label">Description</label>
            <input
              className="text-field"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
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
        title="Delete Tech Stack"
        message={`Are you sure you want to delete "${deleteTarget?.label}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default TechStacksTab;
