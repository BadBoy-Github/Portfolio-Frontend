import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NAV_ITEMS = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Projects", link: "/projects" },
  { label: "Blogs", link: "/blogs" },
  // Header already shows a Contact Me button from lg up, so this entry only
  // exists to give the hamburger dropdown a way through on small screens.
  { label: "Contact", link: "/contact", mobileOnly: true },
];

const NON_ACTIVE_PATHS = [
  "/certificates",
  "/certificate/",
  "/achievements",
  "/achievement/",
];

const Navbar = ({ navOpen }) => {
  const activeBox = useRef();
  const linkRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = (event) => setIsDesktop(event.matches);

    setIsDesktop(query.matches);
    query.addEventListener("change", sync);

    return () => query.removeEventListener("change", sync);
  }, []);

  // Set active index based on current route
  useEffect(() => {
    const path = location.pathname;

    const isNonActivePath = NON_ACTIVE_PATHS.some(
      (p) => path === p || path.startsWith(p),
    );
    if (isNonActivePath) {
      setActiveIndex(-1);
      return;
    }

    const routeIndex = NAV_ITEMS.findIndex((item) => item.link === path);
    setActiveIndex(routeIndex !== -1 ? routeIndex : -1);
  }, [location]);

  // Active box animation effect
  useEffect(() => {
    if (activeIndex < 0 || !linkRefs.current[activeIndex] || !activeBox.current) {
      if (activeBox.current) {
        activeBox.current.style.opacity = "0";
      }
      return;
    }
    const activeLink = linkRefs.current[activeIndex];
    if (activeBox.current) {
      activeBox.current.style.opacity = "1";
      activeBox.current.style.top = activeLink.offsetTop + "px";
      activeBox.current.style.left = activeLink.offsetLeft + "px";
      activeBox.current.style.width = activeLink.offsetWidth + "px";
      activeBox.current.style.height = activeLink.offsetHeight + "px";
    }
  }, [activeIndex, navOpen, isDesktop]);

  const keyboardNavEnabled = navOpen || isDesktop;

  /* Arrow keys must skip the mobile-only Contact entry once the desktop bar
     is showing, otherwise the roving highlight lands on a display:none link
     and looks like the menu dropped an item. */
  const visibleIndexes = useMemo(
    () =>
      NAV_ITEMS.reduce(
        (acc, item, index) =>
          item.mobileOnly && isDesktop ? acc : [...acc, index],
        [],
      ),
    [isDesktop],
  );

  /* This listener sits on document, so it also sees every keystroke made inside
   a form. Space has to stay a space, Enter has to stay a newline, and the
   arrows have to keep moving the caret - otherwise typing "i am" produces
   "iam" and submitting with Enter navigates instead. */
const isTypingTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");

// Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!keyboardNavEnabled) return;
      if (isTypingTarget(e.target)) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          setActiveIndex((prev) => {
            const at = visibleIndexes.indexOf(prev);
            return visibleIndexes[(at + 1) % visibleIndexes.length];
          });
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          setActiveIndex((prev) => {
            const at = visibleIndexes.indexOf(prev);
            return visibleIndexes[
              (at - 1 + visibleIndexes.length) % visibleIndexes.length
            ];
          });
          break;
        case "Enter":
        case " ": {
          e.preventDefault();
          const activeLink = linkRefs.current[activeIndex];
          if (activeLink) activeLink.click();
          break;
        }
        default:
          break;
      }
    },
    [keyboardNavEnabled, activeIndex, visibleIndexes],
  );

  useEffect(() => {
    if (!keyboardNavEnabled) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [keyboardNavEnabled, handleKeyDown]);

  const linkTabIndex = keyboardNavEnabled ? 0 : -1;

  return (
    <nav
      className={`navbar ${navOpen ? "active" : ""}`}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ label, link, mobileOnly }, index) => (
        <Link
          key={link}
          to={link}
          className={`nav-link ${mobileOnly ? "md:hidden" : ""} ${
            index === activeIndex ? "active" : ""
          }`}
          ref={(el) => (linkRefs.current[index] = el)}
          aria-current={index === activeIndex ? "page" : undefined}
          tabIndex={linkTabIndex}
        >
          {label}
        </Link>
      ))}
      <div className="active-box" ref={activeBox} aria-hidden="true" />
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;