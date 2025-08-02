import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Navbar = ({ navOpen }) => {
  const activeBox = useRef();
  const linkRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { label: "Home", link: "#home" },
    { label: "About", link: "#about" },
    { label: "Work", link: "#work" },
    { label: "Certification", link: "#certification" },
    { label: "Reviews", link: "#reviews" },
    { label: "Contact", link: "#contactme", className: "md:hidden" },
  ];

  // Scroll spy effect
  useEffect(() => {
    const sectionElements = navItems.map((item) =>
      document.querySelector(item.link)
    );

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionElements.forEach((section, index) => {
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveIndex(index);
        }
      });
    };

    handleScroll(); // Call initially
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <nav className={"navbar " + (navOpen ? "active" : "")}>
      {navItems.map(({ label, link, className = "" }, index) => (
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
      ))}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
};

export default Navbar;
