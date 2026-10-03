import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Award,
  Briefcase,
  Code2,
  GraduationCap,
  Home,
  Mail,
  MessageCircle,
  MessageSquareQuote,
  Star,
  Terminal,
  Trophy,
  User,
} from "lucide-react";

const SECTION_ICONS = {
  home: Home,
  "qa-terminal": Terminal,
  skills: Code2,
  projects: Star,
  certificates: Award,
  achievements: Trophy,
  reviews: MessageSquareQuote,
  contactme: Mail,
  welcome: User,
  "about-terminal": Terminal,
  chatbot: MessageCircle,
  experience: Briefcase,
  education: GraduationCap,
};

const getIcon = (id) => SECTION_ICONS[id] ?? Home;

const RightSideNav = ({ sections }) => {
  const [activeSection, setActiveSection] = useState("");
  const [visibleIcons, setVisibleIcons] = useState(new Set());

  // Icons appear one by one
  useEffect(() => {
    const timers = sections.map((section, index) =>
      setTimeout(() => {
        setVisibleIcons((prev) => new Set([...prev, section.id]));
      }, 200 + index * 100),
    );

    return () => timers.forEach(clearTimeout);
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1"
      aria-label="Page sections"
    >
      {sections.map((section) => {
        const Icon = getIcon(section.id);
        const isVisible = visibleIcons.has(section.id);
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? "location" : undefined}
            title={section.label}
            className={`w-11 h-11 grid place-items-center transition-[opacity,transform] duration-300 ease-out ${
              isVisible
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-75 translate-x-8"
            }`}
          >
            <span
              className={`w-8 h-8 grid place-items-center border-2 border-ink rounded-wobbly-sm transition-transform duration-100 ${
                isActive
                  ? "bg-marker text-white shadow-hard-sm scale-110 -rotate-6"
                  : "bg-paper-card text-ink-soft hover:bg-postit hover:text-ink hover:rotate-6"
              }`}
            >
              <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
            </span>
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
    }),
  ).isRequired,
};

export default RightSideNav;