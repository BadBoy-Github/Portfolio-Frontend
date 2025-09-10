import { useState } from "react";

// React Icons
import { IoClose } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";

// Components
import ProjectCard from "./ProjectCard";
import ShowMoreCard from "./ShowMoreCard";

const works = [
  {
    imgSrc: "/img/projects/project-10.webp",
    title: "Bamboo Blogs",
    tags: ["Python", "Flask", "PostgreSQL"],
    projectLink: "https://bamboo-blogs-sample.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Bamboo-Blogs-Sample",
    sTags: [
      "python",
      "flask",
      "postgresql",
      "sql",
      "sqlite",
      "html",
      "css",
      "blog",
      "crud",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-9.webp",
    title: "LinkedIn Clone",
    tags: ["LinkedIn", "Clone"],
    projectLink: "https://linkedin-profile-clone.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Linkedin-Profile-Clone",
    sTags: [
      "react",
      "tailwind css",
      "html",
      "css",
      "javascript",
      "clone",
      "linkedin",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-8.webp",
    title: "Budget Map",
    tags: ["AI Model", "Chat"],
    projectLink: "https://stellar-steel-tau.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/stellar",
    sTags: [
      "ai made",
      "next js",
      "react",
      "tailwind css",
      "html",
      "css",
      "javascript",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-7.webp",
    title: "Spotify Clone",
    tags: ["Music", "Clerk", "Clone"],
    projectLink: "https://spotify-clone-6rda.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/spotify-clone",
    sTags: [
      "react",
      "tailwind css",
      "html",
      "css",
      "javascript",
      "spotify",
      "clerk",
      "clone",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-6.webp",
    title: "eCommerce website",
    tags: ["eCommerce", "Stripe"],
    projectLink: "https://full-stack-ecommerce-h47u.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Full-Stack-Ecommerce",
    sTags: [
      "javascript",
      "tailwind css",
      "html",
      "css",
      "ecommerce",
      "shopping",
      "crud",
      "stripe",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-8.webp",
    title: "Stellar AI Chatbot",
    tags: ["AI Model", "Chat"],
    projectLink: "https://stellar-steel-tau.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/stellar",
    sTags: [
      "react",
      "tailwind css",
      "html",
      "css",
      "javascript",
      "ai",
      "chatbot",
      "gemini",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-3.webp",
    title: "ToDo App",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
    sTags: [
      "react",
      "tailwind css",
      "html",
      "css",
      "javascript",
      "todo",
      "crud",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-4.webp",
    title: "Shopping List",
    tags: ["html", "CSS", "JS"],
    projectLink: "https://frontend-shopping-list-app.vercel.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Frontend-Shopping-List-App",
    sTags: ["html", "css", "javascript", "shopping", "list", "web app"],
  },
  {
    imgSrc: "/img/projects/project-5.webp",
    title: "Profile Card",
    tags: ["html", "CSS"],
    projectLink: "https://profile-card-001.netlify.app/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/Profile-Card-1",
    sTags: ["html", "css", "profile", "card", "web app"],
  },
  {
    imgSrc: "/img/projects/project-3.webp",
    title: "Network - Twitter Complaint Bot",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
    sTags: [
      "python",
      "selenium",
      "automation",
      "twitter",
      "complaint",
      "bot",
    ],
  },
  {
    imgSrc: "/img/projects/project-3.webp",
    title: "Musical Time Machine",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
    sTags: [
      "python",
      "beautifylsoup",
      "musical",
      "time",
      "machine",
      "spotify",
    ],
  },
  {
    imgSrc: "/img/projects/project-3.webp",
    title: "Restful API Cafe",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
    sTags: [
      "python",
      "flask",
      "restful",
      "api",
      "cafe",
    ],
  },
  {
    imgSrc: "/img/projects/project-3.webp",
    title: "Snake Game",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
    sTags: [
      "python",
      "turtle",
      "snake",
      "game",
    ],
  },
  {
    imgSrc: "/img/projects/project-3.webp",
    title: "Pong Game",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
    sTags: [
      "python",
      "turtle",
      "pong",
      "game",
    ],
  },
  {
    imgSrc: "/img/projects/project-3.webp",
    title: "CRUD App",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
    sTags: [
      "javascript",
      "html",
      "css",
      "crud",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-3.webp",
    title: "AI Portfolio",
    tags: ["Todo", "CRUD"],
    projectLink: "https://to-do-app-se8u.onrender.com/",
    code: "True",
    gitUrl: "https://github.com/BadBoy-Github/To_Do-App",
    sTags: [
      "ai made",
      "react",
      "tailwind css",
      "html",
      "css",
      "javascript",
      "portfolio",
      "web app",
    ],
  },
  {
    imgSrc: "/img/projects/project-2.webp",
    title: "Iron vs Cancer",
    tags: ["FeNPs", "Encapsule", "Cancer"],
    projectLink: "",
    code: "False",
    gitUrl: "",
    sTags: [
      "feNps",
      "iron",
      "ironoxide",
      "nanoparticle",
      "encapsule",
      "cancer",
      "anticancer",
      "biotech",
      "research",
    ],
  },
  {
    imgSrc: "/img/projects/project-1.webp",
    title: "Silver vs Bacteria",
    tags: ["AgNPs", "Antimicrobial"],
    projectLink:
      "https://journals.innovareacademics.in/index.php/ijap/article/view/51711",
    code: "False",
    gitUrl: "",
    sTags: [
      "agNps",
      "silver",
      "nanoparticle",
      "bacteria",
      "microbes",
      "antimicrobial",
      "biotech",
      "research",
    ],
  },
];

const sTags = ["React", "JavaScript", "HTML", "Python", "AI Made", "Biotech"];

const Work = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on selected tag and search query
  const filteredWorks = works.filter((project) => {
    // Filter by tag
    const tagMatch =
      selectedTag === "all" ||
      project.tags.some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
      ) ||
      project.sTags.some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
      );

    // Filter by search query
    const searchMatch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      project.sTags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return tagMatch && searchMatch;
  });

  // Determine if we need to show the Show More/Less buttons
  const shouldShowToggle = filteredWorks.length > 9;

  // Determine which projects to show based on expanded state
  const projectsToShow =
    shouldShowToggle && !expanded ? filteredWorks.slice(0, 8) : filteredWorks;

  const handleToggle = () => {
    setExpanded(!expanded);

    // Scroll to appropriate position when toggling
    if (!expanded && filteredWorks.length > 9) {
      setTimeout(() => {
        const element = document.getElementById("project-5");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else if (expanded) {
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

  // Handle tag selection
  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setSearchQuery(""); // Clear search when selecting a tag
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedTag("all"); // Reset tag filter when searching
  };

  // Clear search field
  const clearSearch = () => {
    setSearchQuery("");
    document.getElementById("project_search").value = "";
  };

  return (
    <section id="work" className="pt-20">
      <div className="container">
        <h2 className="headline-2 ">My project highlights</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          Explore the innovative projects I&apos;ve built
        </p>

        <div className="mb-10 bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 px-4 py-4 rounded-xl hidden lg:flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded-lg text-sm ${
                selectedTag === "all"
                  ? "bg-sky-600 text-zinc-800"
                  : "bg-zinc-50/5 text-zinc-400"
              } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
              onClick={() => handleTagSelect("all")}
            >
              <HiOutlineMenu className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {sTags.map((tag, index) => (
                <button
                  className={`px-3 py-2 rounded-lg text-sm ${
                    selectedTag === tag.toLowerCase()
                      ? "bg-sky-600 text-zinc-800"
                      : "text-zinc-400 bg-zinc-50/5"
                  } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                  key={index}
                  onClick={() => handleTagSelect(tag.toLowerCase())}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-zinc-400 mr-3">
              #{filteredWorks.length}
            </div>

            <input
              type="text"
              id="project_search"
              placeholder="Search"
              className="bg-zinc-800 w-60 text-sky-100 outline-none outline-zinc-500 hover:outline-sky-700 active:outline-sky-700 rounded-lg px-2 py-1 transition-all duration-500"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
            />

            {searchQuery && (
              <div
                className="text-zinc-800 mr-1 bg-sky-600 rounded-lg p-2 ml-2 cursor-pointer hover:bg-red-600 active:bg-red-800 transition-all duration-500"
                onClick={clearSearch}
              >
                <IoClose />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] ">
          {projectsToShow.map((project, index) => (
            <ProjectCard
              key={index}
              id={`project-${index}`}
              imgSrc={project.imgSrc}
              title={project.title}
              tags={project.tags}
              projectLink={project.projectLink}
              delay={index * 0.1}
              classes=""
              code={project.code}
              gitUrl={project.gitUrl}
            />
          ))}

          {filteredWorks.length === 0 && (
            <div className="col-span-full text-center py-10">
              <h3 className="text-xl font-semibold text-zinc-300">
                No projects found
              </h3>
              <p className="text-zinc-500 mt-2">
                Try a different search term or filter
              </p>
            </div>
          )}

          {shouldShowToggle && !expanded && (
            <ShowMoreCard
              count={filteredWorks.length - 8}
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
