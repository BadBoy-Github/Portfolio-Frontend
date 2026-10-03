import { useState, useRef } from "react";

const DraggableTagInput = ({ label, placeholder, value, onChange }) => {
  const [input, setInput] = useState("");
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const dragItem = useRef(null);

  const addItem = (text) => {
    const trimmed = text.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
  };

  const removeItem = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDragStart = (e, index) => {
    e.stopPropagation();
    dragItem.current = index;
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    if (dragItem.current === null || dragItem.current === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e, dropIndex) => {
    e.stopPropagation();
    if (dragItem.current === null) return;
    const updated = [...value];
    const [moved] = updated.splice(dragItem.current, 1);
    updated.splice(dropIndex, 0, moved);
    onChange(updated);
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();
    dragItem.current = null;
    setDragOverIndex(null);
  };

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
              addItem(input);
              setInput("");
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            addItem(input);
            setInput("");
          }}
          className="btn btn-icon btn-add"
        >
          <span className="material-symbols-rounded text-[16px]">add</span>
          <span className="sr-only">Add {label}</span>
        </button>
        <button
          type="button"
          onClick={() => onChange([])}
          className="btn btn-icon btn-clear"
        >
          <span className="material-symbols-rounded text-[16px]">
            refresh
          </span>
          <span className="sr-only">Clear all {label}</span>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <span
            key={item}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={(e) => handleDragEnd(e)}
            className={`tag-chip ${dragOverIndex === index ? "tag-chip-over" : ""}`}
          >
            <span className="material-symbols-rounded text-[16px] text-ink-faint cursor-grab active:cursor-grabbing">
              drag_indicator
            </span>
            {item}
            <button
              type="button"
              onClick={() => removeItem(index)}
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

export default DraggableTagInput;
