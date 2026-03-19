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

  // Handle query param for contact section
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("scroll") === "contact") {
      // Clear the query param
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, "", url.toString());

      // Scroll to contact section
      setTimeout(() => {
        const contactSection = document.getElementById("contactme");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

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
    <nav className={"navbar " + (navOpen ? "active" : "")}>
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
            >
              {label}
            </a>
          ),
      )}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;
