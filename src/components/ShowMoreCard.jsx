

const ShowMoreCard = ({ count, onClick, delay = 0 }) => {
  return (
    <div
      className="relative p-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-all group hover:scale-[101%] cursor-pointer opacity-0 translate-y-5"
      onClick={onClick}
      style={{
        animationFillMode: "forwards",
        animation: "fadeInUp 0.5s ease forwards",
        animationDelay: `${delay}s`,
      }}
    >
      <div className="aspect-square rounded-lg mb-4 bg-zinc-700/30 flex items-center justify-center">
        <span className="material-symbols-rounded text-6xl text-sky-400">
          add_circle
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-3">Show More Projects</h3>
          <div className="text-sm text-zinc-400">
            View {count} more {count === 1 ? "project" : "projects"}
          </div>
        </div>

        <div className="w-11 h-11 rounded-lg grid place-items-center bg-sky-400 text-zinc-950 shrink-0">
          <span className="material-symbols-rounded" aria-hidden="true">
            expand_more
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShowMoreCard;