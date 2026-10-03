import PropTypes from "prop-types";

const WOBBLY_SM = "110px 9px 95px 11px / 11px 95px 9px 110px";

const Skeleton = ({
  className = "",
  width = "100%",
  height = "1rem",
  borderRadius = WOBBLY_SM,
  animation = true,
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-paper-muted ${animation ? "animate-pulse" : ""} ${className}`}
      style={{ width, height, borderRadius }}
    >
      {animation && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-paper-deep to-transparent animate-shimmer" />
      )}
    </div>
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animation: PropTypes.bool,
};

export default Skeleton;