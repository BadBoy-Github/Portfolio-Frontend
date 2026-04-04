import PropTypes from 'prop-types';

const Skeleton = ({
  className = '',
  width = '100%',
  height = '1rem',
  borderRadius = '0.375rem',
  animation = true
}) => {
  const baseClasses = 'bg-zinc-700 relative overflow-hidden';
  const animationClasses = animation ? 'animate-pulse' : '';

  return (
    <div
      className={`${baseClasses} ${animationClasses} ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      {animation && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-600 to-transparent animate-shimmer" />
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