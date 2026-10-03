import PropTypes from "prop-types";

/**
 * Shared section header: optional post-it tag, scribble-underlined title,
 * and a hand-written lead paragraph.
 */
const SectionHeading = ({
  as: Tag = "h2",
  title,
  lead,
  tag,
  id,
  className = "",
  leadClassName = "",
  children,
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {tag && <span className="badge badge-postit mb-3">{tag}</span>}

      <Tag id={id} className="headline-2 scribble-underline">
        {title}
      </Tag>

      {lead && (
        <p
          className={`text-ink-soft mt-4 max-w-[50ch] text-lg md:text-xl ${leadClassName}`}
        >
          {lead}
        </p>
      )}

      {children}
    </div>
  );
};

SectionHeading.propTypes = {
  as: PropTypes.elementType,
  title: PropTypes.node.isRequired,
  lead: PropTypes.node,
  tag: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  leadClassName: PropTypes.string,
  children: PropTypes.node,
};

export default SectionHeading;