import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "../components/ProjectCardSkeleton";
import { useLenis } from "lenis/react";
import FeaturedProjectGrid from "../components/FeaturedProjectGrid";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const filterTags = [
  "React",
  "JavaScript",
  "Java",
  "Python",
  "AI made",
  "Biotech",
];

const ProjectsLibrary = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lenis = useLenis();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/projects`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProjects(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [lenis]);

  const normalProject = projects.filter((e) => e.type !== "featured");

  const filteredWorks = normalProject.filter((project) => {
    const tagMatch =
      selectedTag === "all" ||
      (project.techUsed || []).some(
        (tech) => tech.toLowerCase() === selectedTag.toLowerCase(),
      ) ||
      (project.sTags || []).some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase(),
      );

    const searchMatch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.techUsed || []).some(
        (tech) => tech.toLowerCase() === searchQuery.toLowerCase(),
      ) ||
      (project.sTags || []).some(
        (tag) => tag.toLowerCase() === searchQuery.toLowerCase(),
      );

    return tagMatch && searchMatch;
  });

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedTag("all");
  };

  const clearSearch = () => {
    setSearchQuery("");
    document.getElementById("project_search").value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-error mb-2">Failed to load projects</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

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
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <h1 className="headline-1">
              All <span className="gradient-text">Projects</span>
            </h1>
            <p className="body-text text-muted-foreground">
              Explore all my projects
            </p>
          </div>

          <FeaturedProjectGrid />

          <div className="my-10 card px-4 py-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className={`p-2 rounded-lg text-sm ${
                  selectedTag === "all"
                    ? "bg-accent-secondary text-background"
                    : "bg-muted text-muted-foreground"
                } hover:bg-accent-secondary hover:text-background active:bg-accent-secondary/80 transition-all duration-300`}
                onClick={() => handleTagSelect("all")}
              >
                <HiOutlineMenu className="size-5" />
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                {filterTags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-3 py-2 rounded-lg text-sm font-mono ${
                      selectedTag === tag.toLowerCase()
                        ? "bg-accent-secondary text-background"
                        : "text-muted-foreground bg-muted"
                    } hover:bg-accent-secondary hover:text-background active:bg-accent-secondary/80 transition-all duration-300`}
                    onClick={() => handleTagSelect(tag.toLowerCase())}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="text-xs text-muted-foreground mr-3">
                #{filteredWorks.length} projects
              </div>

              <input
                type="text"
                id="project_search"
                placeholder="Search projects..."
                className="input-field w-full lg:w-60"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchQuery}
              />

              {searchQuery && (
                <div
                  className="text-background mr-1 bg-error rounded-lg p-2 ml-2 cursor-pointer hover:bg-error/80 transition-all duration-500 group/close"
                  onClick={clearSearch}
                >
                  <IoClose className="size-5 group-hover/close:rotate-90 transition-all duration-500" />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {filteredWorks.map((project, index) => (
              <ProjectCard
                key={index}
                imgSrc={project.imgSrc}
                title={project.title}
                techUsed={project.techUsed}
                projectLink={project.projectLink}
                code={project.code}
                live={project.live}
                gitUrl={project.gitUrl}
                projectId={project.id}
                displayTags={project.displayTags}
              />
            ))}

            {filteredWorks.length === 0 && (
              <div className="col-span-full text-center py-10 flex flex-col justify-center items-center">
                <div className="loader mb-4">
                  <span></span>
                </div>

                <h3 className="text-xl font-semibold text-muted-foreground mt-2">
                  No projects found
                </h3>
                <p className="text-muted-foreground/70 mt-2">
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
