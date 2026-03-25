import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import ProjectCard from "../components/ProjectCard";
import { proj } from "../data/ProjectData";
import FeaturedProjectGrid from "../components/FeaturedProjectGrid";

const sTags = [
  "React",
  "JavaScript",
  "HTML",
  "Java",
  "Python",
  "AI Made",
  "Biotech",
];

const ProjectsLibrary = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const normalProject = proj.filter((e) => e.type !== "featured");

  // Filter projects based on selected tag and search query
  const filteredWorks = normalProject.filter((project) => {
    // Filter by tag
    const tagMatch =
      selectedTag === "all" ||
      project.tags.some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase(),
      ) ||
      project.sTags.some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase(),
      ) ||
      project.techUsed.some(
        (tech) => tech.toLowerCase() === selectedTag.toLowerCase(),
      );

    // Filter by search query
    const searchMatch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      project.sTags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      project.techUsed.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return tagMatch && searchMatch;
  });

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
    <>
      <Helmet>
        <title>Projects Library | Full Stack Developer Portfolio</title>
        <meta
          name="description"
          content="Explore my collection of web development projects, React applications, and JavaScript projects. View live demos and source code for all my work."
        />
        <meta
          name="keywords"
          content="web development projects, React projects, JavaScript projects, portfolio projects, full stack developer work, code examples"
        />
        <meta
          property="og:title"
          content="Projects Library | Full Stack Developer Portfolio"
        />
        <meta
          property="og:description"
          content="Explore my collection of web development projects, React applications, and JavaScript projects."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://elayabarathimv.vercel.app/projects"
        />
        <link rel="canonical" href="https://elayabarathimv.vercel.app/projects" />
      </Helmet>
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">All Projects</h1>
            <p className="text-zinc-400">Explore all my projects</p>
          </div>

          <FeaturedProjectGrid />

          {/* Search and Filter */}
          <div className="my-10  bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 px-4 py-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
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

              <div className="flex items-center gap-2 flex-wrap">
                {sTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      selectedTag === tag.toLowerCase()
                        ? "bg-sky-600 text-zinc-800"
                        : "text-zinc-400 bg-zinc-50/5"
                    } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                    onClick={() => handleTagSelect(tag.toLowerCase())}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="text-xs text-zinc-400 mr-3">
                #{filteredWorks.length} projects
              </div>

              <input
                type="text"
                id="project_search"
                placeholder="Search projects..."
                className="bg-zinc-800 w-full lg:w-60 text-sky-100 outline-none outline-zinc-500 hover:outline-sky-700 active:outline-sky-700 rounded-lg px-2 py-1 transition-all duration-500"
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

          {/* Projects Grid */}
          <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {filteredWorks.map((project, index) => (
              <ProjectCard
                key={index}
                imgSrc={project.imgSrc}
                title={project.title}
                tags={project.tags}
                projectLink={project.projectLink}
                code={project.code}
                live={project.live}
                gitUrl={project.gitUrl}
                projectId={project.id}
              />
            ))}

            {filteredWorks.length === 0 && (
              <div className="col-span-full text-center py-10 flex flex-col justify-center items-center">
                <div className="loader mb-4">
                  <span></span>
                </div>

                <h3 className="text-xl font-semibold text-zinc-300 mt-2">
                  No projects found
                </h3>
                <p className="text-zinc-500 mt-2">
                  Try a different search term or filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsLibrary;
