import { useState } from "react";
import Card from "./ui/Card";

const DEFAULT_BULLET = "• ";

const StickyNotes = () => {
  const [improveNotes, setImproveNotes] = useState(DEFAULT_BULLET);
  const [improveSender, setImproveSender] = useState("");
  const [improveStatus, setImproveStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const [changeNotes, setChangeNotes] = useState(DEFAULT_BULLET);
  const [changeSender, setChangeSender] = useState("");
  const [changeStatus, setChangeStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleKeyDown = (e, value, setValue) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const before = value.substring(0, start);
      const after = value.substring(end);

      const lastNewline = before.lastIndexOf("\n");
      const currentLine = before.substring(lastNewline + 1);

      // If current line is only bullet or dash, exit bullet mode or remove empty bullet
      if (currentLine.trim() === "•" || currentLine.trim() === "-") {
        const nextStart = lastNewline === -1 ? 0 : lastNewline + 1;
        const updated = before.substring(0, nextStart) + after;
        setValue(updated);
        requestAnimationFrame(() => {
          target.selectionStart = target.selectionEnd = nextStart;
        });
        return;
      }

      const insert = "\n• ";
      const updated = before + insert + after;
      setValue(updated);
      requestAnimationFrame(() => {
        const nextPos = start + insert.length;
        target.selectionStart = target.selectionEnd = nextPos;
      });
    }
  };

  const handleChange = (e, setValue) => {
    const val = e.target.value;
    if (val === "") {
      setValue(DEFAULT_BULLET);
    } else {
      setValue(val);
    }
  };

  const handleFocus = (value, setValue) => {
    if (!value || !value.trim()) {
      setValue(DEFAULT_BULLET);
    }
  };

  const handleSend = async (
    noteType,
    notes,
    sender,
    setNotes,
    setSender,
    setStatus
  ) => {
    const cleanContent = notes.replace(/[•\s-]/g, "").trim();
    if (!cleanContent) {
      setStatus({
        loading: false,
        success: false,
        error: "Please write at least one point before adding.",
      });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:8001";
      const senderName = sender.trim() || "Portfolio Visitor";
      const senderEmail = sender.trim().includes("@")
        ? sender.trim()
        : "visitor@portfolio.dev";

      let res = await fetch(`${backendUrl}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteType,
          notes,
          name: senderName,
          email: senderEmail,
        }),
      });

      // Fallback to /api/contact if /api/notes is not found
      if (res.status === 404) {
        res = await fetch(`${backendUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: senderName,
            email: senderEmail,
            subject: `Sticky Note: ${noteType}`,
            category: "feedback",
            message: notes,
          }),
        });
      }

      const data = await res.json();
      if (data.success) {
        setStatus({ loading: false, success: true, error: null });
        setNotes(DEFAULT_BULLET);
        setSender("");
        showToast(`Note for "${noteType}" added and sent!`, "success");
        setTimeout(() => {
          setStatus((prev) => ({ ...prev, success: false }));
        }, 5000);
      } else {
        setStatus({
          loading: false,
          success: false,
          error: data.error || "Failed to send note.",
        });
        showToast(data.error || "Failed to send note.", "error");
      }
    } catch {
      setStatus({
        loading: false,
        success: false,
        error: "Network error. Please try again.",
      });
      showToast("Network error. Please try again.", "error");
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Sticky Note 1: Things i need to improve */}
      <Card
        tone="postit"
        decoration="tape"
        tilt="-1"
        className="p-5 md:p-6 shadow-hard transition-transform duration-200 hover:rotate-0"
      >
        <div className="flex items-center justify-between mb-2 border-b-2 border-ink/15 pb-2">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-rounded text-marker text-2xl select-none"
              aria-hidden="true"
            >
              edit_note
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-ink">
              Things i need to improve
            </h3>
          </div>
          <span className="text-xs font-hand text-ink-soft bg-paper/80 px-2 py-0.5 rounded-wobbly-sm border border-ink/20 select-none">
            Sticky Note
          </span>
        </div>

        <p className="text-xs md:text-sm font-hand text-ink-soft mb-3">
          Notice something I can do better? Add your suggestions:
        </p>

        <textarea
          value={improveNotes}
          onChange={(e) => handleChange(e, setImproveNotes)}
          onKeyDown={(e) => handleKeyDown(e, improveNotes, setImproveNotes)}
          onFocus={() => handleFocus(improveNotes, setImproveNotes)}
          rows={4}
          placeholder="• Add points to improve..."
          aria-label="Things i need to improve"
          className="w-full bg-paper/50 border-2 border-ink/25 focus:border-ink rounded-wobbly-sm p-3 font-hand text-base md:text-lg text-ink placeholder:text-ink-faint outline-none resize-none min-h-[120px] max-h-[220px] transition-colors leading-relaxed shadow-inner"
        />

        <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            value={improveSender}
            onChange={(e) => setImproveSender(e.target.value)}
            placeholder="Your name or email (optional)"
            aria-label="Your name or email for Things i need to improve"
            className="flex-1 px-3 py-2 text-sm font-hand bg-paper/40 border border-ink/20 focus:border-ink rounded-wobbly-sm outline-none text-ink placeholder:text-ink-faint"
          />
          <button
            type="button"
            onClick={() =>
              handleSend(
                "Things i need to improve",
                improveNotes,
                improveSender,
                setImproveNotes,
                setImproveSender,
                setImproveStatus
              )
            }
            disabled={improveStatus.loading}
            className="btn btn-primary btn-sm flex items-center justify-center gap-1.5 px-5 font-hand font-bold text-ink shrink-0 disabled:opacity-50"
          >
            {improveStatus.loading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span
                  className="material-symbols-rounded text-base font-bold"
                  aria-hidden="true"
                >
                  add
                </span>
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {improveStatus.error && (
          <p className="mt-2 text-xs font-hand text-marker font-semibold">
            ✗ {improveStatus.error}
          </p>
        )}
        {improveStatus.success && (
          <p className="mt-2 text-xs font-hand text-ballpoint font-semibold flex items-center gap-1">
            <span
              className="material-symbols-rounded text-sm"
              aria-hidden="true"
            >
              check_circle
            </span>
            Note added & mailed to Elayabarathi!
          </p>
        )}
      </Card>

      {/* Sticky Note 2: Things i want to change */}
      <Card
        tone="postit"
        decoration="tack"
        tilt="1"
        className="p-5 md:p-6 shadow-hard transition-transform duration-200 hover:rotate-0"
      >
        <div className="flex items-center justify-between mb-2 border-b-2 border-ink/15 pb-2">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-rounded text-ballpoint text-2xl select-none"
              aria-hidden="true"
            >
              push_pin
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-ink">
              Things i want to change
            </h3>
          </div>
          <span className="text-xs font-hand text-ink-soft bg-paper/80 px-2 py-0.5 rounded-wobbly-sm border border-ink/20 select-none">
            Sticky Note
          </span>
        </div>

        <p className="text-xs md:text-sm font-hand text-ink-soft mb-3">
          Have ideas or changes you’d like to see on the site? Note them down:
        </p>

        <textarea
          value={changeNotes}
          onChange={(e) => handleChange(e, setChangeNotes)}
          onKeyDown={(e) => handleKeyDown(e, changeNotes, setChangeNotes)}
          onFocus={() => handleFocus(changeNotes, setChangeNotes)}
          rows={4}
          placeholder="• Add points you want changed..."
          aria-label="Things i want to change"
          className="w-full bg-paper/50 border-2 border-ink/25 focus:border-ink rounded-wobbly-sm p-3 font-hand text-base md:text-lg text-ink placeholder:text-ink-faint outline-none resize-none min-h-[120px] max-h-[220px] transition-colors leading-relaxed shadow-inner"
        />

        <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            value={changeSender}
            onChange={(e) => setChangeSender(e.target.value)}
            placeholder="Your name or email (optional)"
            aria-label="Your name or email for Things i want to change"
            className="flex-1 px-3 py-2 text-sm font-hand bg-paper/40 border border-ink/20 focus:border-ink rounded-wobbly-sm outline-none text-ink placeholder:text-ink-faint"
          />
          <button
            type="button"
            onClick={() =>
              handleSend(
                "Things i want to change",
                changeNotes,
                changeSender,
                setChangeNotes,
                setChangeSender,
                setChangeStatus
              )
            }
            disabled={changeStatus.loading}
            className="btn btn-primary btn-sm flex items-center justify-center gap-1.5 px-5 font-hand font-bold text-ink shrink-0 disabled:opacity-50"
          >
            {changeStatus.loading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-ink border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span
                  className="material-symbols-rounded text-base font-bold"
                  aria-hidden="true"
                >
                  add
                </span>
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {changeStatus.error && (
          <p className="mt-2 text-xs font-hand text-marker font-semibold">
            ✗ {changeStatus.error}
          </p>
        )}
        {changeStatus.success && (
          <p className="mt-2 text-xs font-hand text-ballpoint font-semibold flex items-center gap-1">
            <span
              className="material-symbols-rounded text-sm"
              aria-hidden="true"
            >
              check_circle
            </span>
            Note added & mailed to Elayabarathi!
          </p>
        )}
      </Card>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`px-4 py-3 rounded-wobbly-sm shadow-hard text-sm font-medium border-2 border-ink ${
              toast.type === "success"
                ? "bg-marker text-paper"
                : "bg-paper-card text-marker"
            }`}
          >
            {toast.type === "success" ? "✓ " : "✗ "}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyNotes;
