import { useState } from "react";

// React Icons
import { IoClose } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";

// Components
import ProjectCard from "./ProjectCard";
import ShowMoreCard from "./ShowMoreCard";

import CountUp from "./CountUp";

import { proj } from "./data/ProjectData";

const sTags = ["React", "JavaScript", "HTML", "Python", "AI Made", "Biotech"];

const Project = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on selected tag and search query
  const filteredWorks = proj.filter((project) => {
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
    <section id="project" className="pt-20">
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
                <div className="group relative" key={index}>
                  <button
                    className={`group relative px-3 py-2 rounded-lg text-sm ${
                      selectedTag === tag.toLowerCase()
                        ? "bg-sky-600 text-zinc-800"
                        : "text-zinc-400 bg-zinc-50/5"
                    } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                    onClick={() => handleTagSelect(tag.toLowerCase())}
                  >
                    {tag}
                  </button>
                  {tag === "AI Made" && (
                    <span className="absolute w-[100px] -top-12 left-[50%] -translate-x-[50%] z-20 origin-bottom scale-0 px-2 rounded-lg bg-sky-600 text-zinc-800 py-2 text-sm shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                      Idea is Mine!
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-zinc-400 mr-3">
              #
              <CountUp
                from={0}
                to={filteredWorks.length}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
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
                className="text-zinc-800 mr-1 bg-sky-600 rounded-lg p-2 ml-2 cursor-pointer hover:bg-red-600 transition-all duration-500 group/close"
                onClick={clearSearch}
              >
                <IoClose className="size-5 group-hover/close:rotate-90 transition-all duration-500" />
              </div>
            )}
          </div>
        </div>

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
              classes=""
              code={project.code}
              live={project.live}
              gitUrl={project.gitUrl}
            />
          ))}

          {filteredWorks.length === 0 && (
            <div className="col-span-full text-center py-10 flex flex-col justify-center items-center">
              <div className="loader mb-4">
                <span></span>
              </div>

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

export default Project;
