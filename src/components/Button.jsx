// Node modules
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const VARIANT_CLASS = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

const SIZE_CLASS = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

const renderIcon = (icon, { iconSize, strokeWidth }) => {
  if (!icon) return null;

  // Legacy call sites pass a Material Symbols ligature name
  if (typeof icon === "string") {
    return (
      <span className="material-symbols-rounded" aria-hidden="true">
        {icon}
      </span>
    );
  }

  const Icon = icon;
  return (
    <Icon size={iconSize} strokeWidth={strokeWidth} aria-hidden="true" className="shrink-0" />
  );
};

/**
 * Hand-drawn button.
 * Renders <a> when `target` is set (external/file links), <Link> for routes,
 * and <button> otherwise. Icons accept a lucide-react component or a
 * Material Symbols name.
 */
const Button = ({
  label,
  children,
  href,
  target,
  download,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  iconSize = 22,
  strokeWidth = 2.5,
  type = "button",
  disabled = false,
  ariaLabel,
  classes = "",
  className = "",
  ...rest
}) => {
  const rootClass = [
    "btn",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className,
    classes,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children ?? label}
      {renderIcon(icon, { iconSize, strokeWidth })}
      {renderIcon(iconRight, { iconSize, strokeWidth })}
    </>
  );

  const accessibleLabel =
    ariaLabel ?? (typeof label === "string" ? label : undefined);

  if (href) {
    if (target || download) {
      return (
        <a
          href={href}
          target={target}
          download={download}
          rel="noopener noreferrer"
          className={rootClass}
          aria-label={accessibleLabel}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          {...rest}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        to={href}
        className={rootClass}
        aria-label={accessibleLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={rootClass}
      aria-label={accessibleLabel}
      {...rest}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  target: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  iconRight: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  iconSize: PropTypes.number,
  strokeWidth: PropTypes.number,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  classes: PropTypes.string,
  className: PropTypes.string,
};

export { Button };
export default Button;