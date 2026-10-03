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
  const [visibleIcons, setVisibleIcons] = useState(new Set());

  // Wave animation effect - icons appear one by one
  useEffect(() => {
    const timers = [];
    sections.forEach((section, index) => {
      const timer = setTimeout(() => {
        setVisibleIcons(prev => new Set([...prev, section.id]));
      }, 200 + index * 100); // 300ms initial delay, 150ms between each icon
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [sections]);

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
        const isIconVisible = visibleIcons.has(section.id);
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ease-out ${
              isIconVisible
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-75 translate-x-8'
            } ${
              activeSection === section.id
                ? "bg-gradient-electric text-accent-foreground scale-110 shadow-glow-blue"
                : "bg-muted text-muted-foreground hover:bg-terminal-green hover:text-background"
            }`}
            title={section.label}
          >
            <IconComponent className="w-2.5 h-2.5" />
            {activeSection === section.id && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gold shadow-glow-gold"></span>
            )}
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
