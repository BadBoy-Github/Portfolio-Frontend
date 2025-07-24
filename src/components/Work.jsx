import { useState } from "react";

// Components
import ProjectCard from "./ProjectCard";
import ShowMoreCard from "./ShowMoreCard";

const works = [
  {
    imgSrc: "/images/project-10.png",
    title: "Bamboo Blogs",
    tags: ["Python", "Flask", "SQLite"],
    projectLink: "https://bamboo-blogs-sample.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Bamboo-Blogs-Sample",
  },
  {
    imgSrc: "/images/project-9.png",
    title: "LinkedIn Clone",
    tags: ["LinkedIn", "Morphisire"],
    projectLink: "https://linkedin-profile-clone.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Linkedin-Profile-Clone",
  },
  {
    imgSrc: "/images/project-8.png",
    title: "Stellar AI Chatbot",
    tags: ["AI Model", "Chat"],
    projectLink: "https://stellar-steel-tau.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/stellar",
  },
  {
    imgSrc: "/images/project-7.png",
    title: "Spotify Clone",
    tags: ["Music", "Clerk", "Clone"],
    projectLink: "https://spotify-clone-6rda.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/spotify-clone",
  },
  {
    imgSrc: "/images/project-6.png",
    title: "eCommerce website",
    tags: ["eCommerce", "Stripe"],
    projectLink: "https://full-stack-ecommerce-h47u.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Full-Stack-Ecommerce",
  },
  {
    imgSrc: "/images/project-5.png",
    title: "Profile Card",
    tags: ["html", "CSS"],
    projectLink: "https://profile-card-001.netlify.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Profile-Card-1",
  },
  {
    imgSrc: "/images/project-4.png",
    title: "Shopping List",
    tags: ["html", "CSS", "JS"],
    projectLink: "https://frontend-shopping-list-app.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Frontend-Shopping-List-App",
  },
  {
    imgSrc: "/images/project-3.png",
    title: "ToDo App",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
  },
  {
    imgSrc: "/images/project-2.png",
    title: "Iron vs Cancer",
    tags: ["FeNPs", "Encapsule", "Cancer"],
    projectLink: "",
    code: "False",
    gitUrl: "",
  },
  {
    imgSrc: "/images/project-1.png",
    title: "Silver vs Bacteria",
    tags: ["AgNPs", "Antimicrobial"],
    projectLink:
      "https://journals.innovareacademics.in/index.php/ijap/article/view/51711",
    code: "False",
    gitUrl: "",
  },
];

<ShowMoreCard />;

const Work = () => {
  const [expanded, setExpanded] = useState(false);

  // Determine if we need to show the Show More/Less buttons
  const shouldShowToggle = works.length > 9;

  // Determine which projects to show based on expanded state
  const projectsToShow =
    shouldShowToggle && !expanded
      ? works.slice(0, 8) // If not expanded and more than 6 projects, show first 9
      : works; // Otherwise show all projects

  const handleToggle = () => {
    setExpanded(!expanded);

    // Scroll to appropriate position when toggling
    if (!expanded && works.length > 9) {
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

  const handleToggleStart = () => {
    handleToggle();
    window.location.href = "/#project";
  };

  return (
    <section id="work" className="section">
      <div className="container">
        <h2 className="headline-2 mb-8 reveal-up">My project highlights</h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] reveal-up">
          {projectsToShow.map((project, index) => (
            <ProjectCard
              key={index}
              id={`project-${index}`}
              imgSrc={project.imgSrc}
              title={project.title}
              tags={project.tags}
              projectLink={project.projectLink}
              delay={index * 0.1}
              classes="reveal-up"
              code={project.code}
              gitUrl={project.gitUrl}
            />
          ))}
          {shouldShowToggle && !expanded && (
            <ShowMoreCard
              count={works.length - 8}
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
              onClick={handleToggleStart}
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
};

export default Work;
