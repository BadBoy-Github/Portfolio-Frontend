import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ navOpen }) => {
  const activeBox = useRef();
  const linkRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  const navItems = [
    { label: "Home", link: "/", isRoute: true },
    { label: "About", link: "/about", isRoute: true },
    { label: "Projects", link: "/projects", isRoute: true },
    { label: "Blogs", link: "/blogs", isRoute: true },
  ];



  // Set active index based on current route
  useEffect(() => {
    const path = location.pathname;

    // Check if we're on a route page
    const routeIndex = navItems.findIndex(
      (item) => item.isRoute && item.link === path,
    );
    if (routeIndex !== -1) {
      setActiveIndex(routeIndex);
      return;
    }

    // On home page - use scroll spy for section links
    if (path === "/" || path === "") {
      // Filter only section links
      const sectionItems = navItems.filter((item) => item.link.includes("#"));
      const sectionElements = sectionItems.map((item) =>
        document.querySelector(item.link.split("/").pop()),
      );

      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sectionElements.forEach((section, index) => {
          if (
            section &&
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight
          ) {
            const actualIndex = navItems.findIndex(
              (item) => item.link === sectionItems[index].link,
            );
            setActiveIndex(actualIndex);
          }
        });
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location]);

  // Active box animation effect
  useEffect(() => {
    const activeLink = linkRefs.current[activeIndex];
    if (activeLink && activeBox.current) {
      activeBox.current.style.top = activeLink.offsetTop + "px";
      activeBox.current.style.left = activeLink.offsetLeft + "px";
      activeBox.current.style.width = activeLink.offsetWidth + "px";
      activeBox.current.style.height = activeLink.offsetHeight + "px";
    }
  }, [activeIndex, navOpen]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!navOpen) return;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % navItems.length);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + navItems.length) % navItems.length);
        break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const activeLink = linkRefs.current[activeIndex];
        if (activeLink) activeLink.click();
        break;
      }
      case 'Escape':
        // Close navigation if there's a close function
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (navOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [navOpen, activeIndex]);

  // Handle contact click - scroll to contact section
  const handleContactClick = (e) => {
    // If we're already on home page, just scroll to contact section
    if (location.pathname === "/") {
      e.preventDefault();
      const contactSection = document.getElementById("contactme");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Otherwise, let the Link navigate to home
  };

  return (
    <nav
      className={"navbar " + (navOpen ? "active" : "")}
      role="navigation"
      aria-label="Main navigation"
    >
      {navItems.map(
        ({ label, link, className = "", isRoute, isContact }, index) =>
          isRoute ? (
            <Link
              key={index}
              to={link}
              className={`nav-link ${
                index === activeIndex ? "active" : ""
              } ${className}`}
              ref={(el) => (linkRefs.current[index] = el)}
              onClick={isContact ? handleContactClick : undefined}
              aria-current={index === activeIndex ? "page" : undefined}
              tabIndex={navOpen ? 0 : -1}
            >
              {label}
            </Link>
          ) : (
            <a
              key={index}
              href={link}
              className={`nav-link ${
                index === activeIndex ? "active" : ""
              } ${className}`}
              ref={(el) => (linkRefs.current[index] = el)}
              aria-current={index === activeIndex ? "page" : undefined}
              tabIndex={navOpen ? 0 : -1}
            >
              {label}
            </a>
          ),
      )}
      <div className="active-box" ref={activeBox} aria-hidden="true"></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;
