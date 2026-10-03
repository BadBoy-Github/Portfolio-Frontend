import { useCallback, useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const NAV_ITEMS = [
  { label: "Home", link: "/" },
  { label: "About", link: "/about" },
  { label: "Projects", link: "/projects" },
  { label: "Blogs", link: "/blogs" },
];

const NON_ACTIVE_PATHS = [
  "/contact",
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

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!keyboardNavEnabled) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % NAV_ITEMS.length);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          setActiveIndex(
            (prev) => (prev - 1 + NAV_ITEMS.length) % NAV_ITEMS.length,
          );
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
    [keyboardNavEnabled, activeIndex],
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
      {NAV_ITEMS.map(({ label, link }, index) => (
        <Link
          key={link}
          to={link}
          className={`nav-link ${index === activeIndex ? "active" : ""}`}
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