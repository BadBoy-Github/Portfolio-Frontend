import PropTypes from "prop-types";

const TONE_CLASS = {
  default: "",
  postit: "badge-postit",
  marker: "badge-marker",
  ink: "bg-ink text-paper border-ink",
};

const Badge = ({ tone = "default", children, className = "", ...rest }) => {
  const rootClass = ["badge", TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={rootClass} {...rest}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  tone: PropTypes.oneOf(["default", "postit", "marker", "ink"]),
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Badge;