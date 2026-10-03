import PropTypes from "prop-types";

const TONE_CLASS = {
  paper: "",
  postit: "card-postit",
  ink: "card-ink",
  dashed: "border-dashed shadow-none",
};

const TILT_CLASS = {
  none: "",
  1: "rotate-1",
  "-1": "-rotate-1",
  2: "rotate-2",
  "-2": "-rotate-2",
};

/**
 * Hand-drawn container. Opt in to the collage look with `decoration` and
 * `tilt`; both are decorative only, so they never carry meaning.
 */
const Card = ({
  as: Tag = "div",
  tone = "paper",
  decoration,
  tilt = "none",
  hover = false,
  children,
  className = "",
  ...rest
}) => {
  const rootClass = [
    "card",
    TONE_CLASS[tone],
    TILT_CLASS[tilt],
    hover
      ? "transition-transform duration-100 hover:-rotate-1 hover:shadow-hard"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={rootClass} {...rest}>
      {decoration === "tape" && <span className="tape" aria-hidden="true" />}
      {decoration === "tack" && <span className="tack" aria-hidden="true" />}
      {children}
    </Tag>
  );
};

Card.propTypes = {
  as: PropTypes.elementType,
  tone: PropTypes.oneOf(["paper", "postit", "ink", "dashed"]),
  decoration: PropTypes.oneOf(["tape", "tack"]),
  tilt: PropTypes.oneOf(["none", "1", "-1", "2", "-2"]),
  hover: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Card;