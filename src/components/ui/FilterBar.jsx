import PropTypes from "prop-types";
import { useId } from "react";

const FilterBar = ({
  tags = [],
  selectedTag,
  onTagSelect,
  searchQuery,
  onSearchChange,
  onSearchClear,
  countLabel,
  searchPlaceholder = "Search...",
  searchId,
}) => {
  const generatedId = useId();
  const inputId = searchId || generatedId;
  const allActive = selectedTag === "all";

  return (
    <div className="mb-10 bg-paper ring-1 ring-inset ring-ink/10 px-4 py-4 rounded-2xl shadow-hard flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          aria-pressed={allActive}
          className={`p-2 rounded-lg text-sm transition-all duration-300 ${
            allActive
              ? "bg-marker text-ink shadow-hard"
              : "bg-paper/60 text-ink-soft hover:bg-marker hover:text-ink"
          }`}
          onClick={() => onTagSelect("all")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A2.75 2.75 0 014.75 2h10.5a2.75 2.75 0 012.75 2.75v.513a3.25 3.25 0 012.662 3.274l.463 2.327A4.75 4.75 0 0118 13.687V16.25a.75.75 0 01-1.065.65A2.75 2.75 0 0115 17.25h-8.5a2.75 2.75 0 01-2.75-2.75V13.7a3.25 3.25 0 01-2.662-3.274l-.463-2.327A3.25 3.25 0 012.75 5.263V4.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag) => {
            const active = selectedTag === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={active}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                  active
                    ? "bg-marker text-ink shadow-hard"
                    : "bg-paper/60 text-ink-soft hover:bg-marker hover:text-ink"
                }`}
                onClick={() => onTagSelect(tag.toLowerCase())}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 w-full lg:w-auto">
        <span className="text-xs text-ink-soft mr-3" aria-live="polite">
          #{countLabel}
        </span>

        <input
          id={inputId}
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-paper/80 w-full lg:w-60 text-ink outline-none outline-ink/20 hover:outline-marker active:outline-marker rounded-xl px-3 py-1.5 transition-all duration-300 placeholder:text-ink-soft/60"
        />

        {searchQuery && (
          <button
            type="button"
            aria-label="Clear search"
            className="text-ink mr-1 bg-marker rounded-lg p-2 ml-2 cursor-pointer hover:bg-accent-red transition-all duration-300 group/close"
            onClick={onSearchClear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5 group-hover/close:rotate-90 transition-all duration-500"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  selectedTag: PropTypes.string.isRequired,
  onTagSelect: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchClear: PropTypes.func.isRequired,
  countLabel: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string,
  searchId: PropTypes.string,
};

export default FilterBar;
