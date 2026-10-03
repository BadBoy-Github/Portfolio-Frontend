import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * Shared chrome for every admin tab.
 *
 * Owns the one sticky tab bar and publishes its measured height as
 * `--admin-tab-head-h`, which `.admin-section-head` uses to stack
 * section headings directly underneath it. Measuring beats a hardcoded
 * `top-[104px]`: the bar grows when the action buttons wrap on narrow
 * viewports, and a fixed offset would let the two layers collide.
 */
const AdminShell = ({ title, count, subtitle, actions, children }) => {
  const headRef = useRef(null);
  const [headHeight, setHeadHeight] = useState(0);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return undefined;

    const measure = () => setHeadHeight(el.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="admin-shell"
      style={{ "--admin-tab-head-h": `${headHeight}px` }}
    >
      <div className="admin-tab-head" ref={headRef}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="admin-tab-title">
              {title}
              <span className="admin-tab-count">{count}</span>
            </h2>
            <p className="admin-tab-sub">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      </div>

      {children}
    </div>
  );
};

AdminShell.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  subtitle: PropTypes.string.isRequired,
  actions: PropTypes.node,
  children: PropTypes.node,
};

/**
 * Group heading for a section inside a tab. Sticks below the tab bar for as
 * long as its own section is in view.
 */
const SectionHead = ({ title, count }) => (
  <div className="admin-section-head">
    <h3 className="admin-section-title">{title}</h3>
    {count !== undefined && <span className="admin-tab-count">{count}</span>}
    <span className="admin-section-rule" aria-hidden="true" />
  </div>
);

SectionHead.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export { AdminShell, SectionHead };
export default AdminShell;