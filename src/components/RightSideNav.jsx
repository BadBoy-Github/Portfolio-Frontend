import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  IoHome,
  IoTerminal,
  IoCodeSlash,
  IoRibbon,
  IoTrophy,
  IoMail,
  IoPerson,
  IoChatbubble,
  IoBriefcase,
  IoSchool,
  IoStar,
} from "react-icons/io5";
import { MdReviews } from "react-icons/md";

const RightSideNav = ({ sections }) => {
  const [activeSection, setActiveSection] = useState("");

  // Icon mapping for sections
  const getIcon = (id) => {
    const iconMap = {
      home: IoHome,
      "qa-terminal": IoTerminal,
      skills: IoCodeSlash,
      projects: IoStar,
      certificates: IoRibbon,
      achievements: IoTrophy,
      reviews: MdReviews,
      contactme: IoMail,
      welcome: IoPerson,
      "about-terminal": IoTerminal,
      chatbot: IoChatbubble,
      experience: IoBriefcase,
      education: IoSchool,
    };
    return iconMap[id] || IoHome; // Default to IoHome if not found
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {sections.map((section) => {
        const IconComponent = getIcon(section.id);
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-sky-400 text-zinc-900 scale-110 shadow-lg"
                : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700/80 hover:text-zinc-300"
            }`}
            title={section.label}
          >
            <IconComponent className="w-2.5 h-2.5" />
          </button>
        );
      })}
    </nav>
  );
};

RightSideNav.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RightSideNav;