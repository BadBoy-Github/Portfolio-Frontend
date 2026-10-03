import PropTypes from "prop-types";

/**
 * The single brand mark.
 *
 * `/favicon.svg` and `/icon.webp` are both pale-grey glyphs with a
 * transparent background, so they are invisible against the warm paper
 * canvas on their own. Every placement therefore has to sit inside the
 * `.logo` ink box, which is what makes the mark legible.
 *
 * Rendering it here keeps the header, footer, hero and stats bar
 * pixel-identical instead of each one hand-rolling the wrapper. The
 * glyph is decorative, so callers own the accessible name: wrap it in a
 * link and give that link a label, or leave it standalone.
 */
const Logo = ({ className = "", ...rest }) => (
  <span className={["logo", className].filter(Boolean).join(" ")} {...rest}>
    <img
      src="/favicon.svg"
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
    />
  </span>
);

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;