import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLenis } from "lenis/react";
import ProjectCard from "../components/ProjectCard";
import FeaturedProjectGrid from "../components/FeaturedProjectGrid";
import FilterBar from "../components/ui/FilterBar";
import SectionHeading from "../components/ui/SectionHeading";

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
    const input = document.getElementById("project_search");
    if (input) input.value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-accent-red mb-2">Failed to load projects</h2>
          <p className="text-ink-soft">{error}</p>
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
      <div className="min-h-screen bg-paper pt-24 pb-16">
        <div className="container">
          <SectionHeading
            title="All Projects"
            lead="Explore all my projects"
          />

          <FeaturedProjectGrid />
          <div className="my-8"></div>

          <FilterBar
            tags={filterTags}
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onSearchClear={clearSearch}
            countLabel={`${filteredWorks.length} projects`}
            searchPlaceholder="Search projects..."
            searchId="project_search"
          />

          <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {filteredWorks.map((project, index) => (
              <ProjectCard
                key={project.id || index}
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

                <h3 className="text-xl font-semibold text-ink mt-2">
                  No projects found
                </h3>
                <p className="text-ink-soft mt-2">
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
