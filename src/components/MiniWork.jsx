

import { useState } from "react";

import PropTypes from "prop-types";

// Components
import ProjectCard from './ProjectCard';

const miniworks = [
  {
    imgSrc: "/images/miniproject-4.jpg",
    title: "AI 3D Portfolio",
    tags: ["AI", "3D Model"],
    projectLink: "https://elayabarathi-ai.netlify.app/",
  },
  {
    imgSrc: "/images/miniproject-3.jpg",
    title: "Full stack CRUD app",
    tags: ["Web-design", "ejs"],
    projectLink: "https://github.com/BadBoy-Github/CRUD-App.git",
  },
  {
    imgSrc: "/images/miniproject-2.jpg",
    title: "Frontend Shopping List",
    tags: ["html", "CSS", "JS"],
    projectLink: "https://frontend-shopping-list-app.vercel.app/",
  },
  {
    imgSrc: "/images/miniproject-6.jpg",
    title: "Profile Card",
    tags: ["html", "CSS"],
    projectLink: "https://profile-card-001.netlify.app/",
  },
  {
    imgSrc: "/images/miniproject-5.jpg",
    title: "Task Sheduler",
    tags: ["html", "CSS", "JS"],
    projectLink: "https://task-sheduler-simple.onrender.com/",
  },
  {
    imgSrc: "/images/miniproject-1.jpg",
    title: "LinkedIn Form",
    tags: ["html", "CSS"],
    projectLink: "https://linkedin-form-1.onrender.com/",
  },
];

const ShowMoreCard = ({ count, onClick, delay = 0 }) => {
  return (
    <div
      className="relative p-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-all group hover:scale-[101%] cursor-pointer opacity-0 translate-y-5"
      onClick={onClick}
      style={{
        animationFillMode: "forwards",
        animation: "fadeInUp 0.5s ease forwards",
        animationDelay: `${delay}s`,
      }}
    >
      <div className="aspect-square rounded-lg mb-4 bg-zinc-700/30 flex items-center justify-center">
        <span className="material-symbols-rounded text-6xl text-sky-400">
          add_circle
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-3">Show More Projects</h3>
          <div className="text-sm text-zinc-400">
            View {count} more {count === 1 ? "project" : "projects"}
          </div>
        </div>

        <div className="w-11 h-11 rounded-lg grid place-items-center bg-sky-400 text-zinc-950 shrink-0">
          <span className="material-symbols-rounded" aria-hidden="true">
            expand_more
          </span>
        </div>
      </div>
    </div>
  );
};

const MiniWork = () => {

  const [expanded, setExpanded] = useState(false);
  
    // Determine if we need to show the Show More/Less buttons
    const shouldShowToggle = miniworks.length > 6;
  
    // Determine which projects to show based on expanded state
    const projectsToShow =
      shouldShowToggle && !expanded
        ? miniworks.slice(0, 5) // If not expanded and more than 6 projects, show first 5
        : miniworks; // Otherwise show all projects
  
    const handleToggle = () => {
      setExpanded(!expanded);
  
      // Scroll to appropriate position when toggling
      if (!expanded && miniworks.length > 6) {
        // When expanding, scroll to the start of the new projects
        setTimeout(() => {
          const element = document.getElementById("project-5");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else if (expanded) {
        // When collapsing, scroll back up to the top of the section
        setTimeout(() => {
          const element = document.getElementById("work");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    };

    return (
      <section id="miniworks" className="section">
        <div className="container">
          <h2 className="headline-2 mb-8 reveal-up">Some mini projects</h2>

          <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {projectsToShow.map((project, index) => (
              <ProjectCard
                key={index}
                id={`project-${index}`}
                imgSrc={project.imgSrc}
                title={project.title}
                tags={project.tags}
                projectLink={project.projectLink}
                delay={index * 0.1}
              />
            ))}
            {shouldShowToggle && !expanded && (
              <ShowMoreCard
                count={miniworks.length - 5}
                onClick={handleToggle}
                delay={0.5}
              />
            )}
          </div>
          {shouldShowToggle && expanded && (
            <div
              className="mt-8 flex justify-center transition-all duration-500 transform translate-y-0 opacity-100"
              style={{ transitionDelay: "0.5s" }}
            >
              <button
                onClick={handleToggle}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 rounded-xl flex items-center gap-2 transition-all"
              >
                <span>Show Less</span>
                <span className="material-symbols-rounded">expand_less</span>
              </button>
            </div>
          )}
        </div>
      </section>
    );
}

export default MiniWork