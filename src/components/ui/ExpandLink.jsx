// Node modules
import PropTypes from "prop-types";
import { Github } from "lucide-react";

/**
 * External link chip. Pass a label to get the pill that expands on hover,
 * or omit it for the compact square. Cards overlay these above a stretched
 * title link, so it carries `relative z-10` by default.
 */
const ExpandLink = ({
  href,
  label,
  ariaLabel,
  icon: Icon = Github,
  className = "",
}) => {
  const rootClass = [
    "group/link relative z-10 inline-flex items-center border-2 border-ink rounded-wobbly-sm",
    "bg-paper-card text-ink shadow-hard-sm transition-transform duration-100",
    "hover:bg-marker hover:text-paper hover:-rotate-3",
    label ? "h-10 gap-2 pl-3 pr-2" : "w-11 h-11 justify-center",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={rootClass}
      aria-label={ariaLabel}
    >
      <Icon size={18} strokeWidth={2.5} aria-hidden="true" className="shrink-0" />

      {label && (
        <span
          aria-hidden="true"
          className="font-hand text-lg whitespace-nowrap max-w-0 overflow-hidden opacity-0 transition-[max-width,opacity] duration-100 group-hover/link:max-w-[8rem] group-hover/link:opacity-100"
        >
          {label}
        </span>
      )}
    </a>
  );
};

ExpandLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

export default ExpandLink;