import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectFeaturedCard from "./ProjectFeaturedCard";
import SectionHeading from "./ui/SectionHeading";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomepageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/projects`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProjects(data.data);
      } catch {
        // projects fetch failed
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="pt-20">
        <div className="container">
          <SectionHeading title="My project highlights" lead="Explore the innovative projects I've built" />
          <div className="flex items-center justify-center py-10">
            <div className="loader mb-4"><span></span></div>
          </div>
        </div>
      </section>
    );
  }

  const featuredProject = projects.filter((e) => e.type === "featured");
  const normalProject = projects.filter((e) => e.type !== "featured");
  const recentProjects = normalProject.slice(0, 2);
  const remainingCount = projects.length - 2;

  return (
    <section id="projects" className="pt-20">
      <div className="container">
        <SectionHeading title="My project highlights" lead="Explore the innovative projects I've built" />

        <div className="w-full mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featuredProject.map((project, index) => (
            <ProjectFeaturedCard
              key={project.id || index}
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
        </div>

        {recentProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProjects.map((project, index) => (
              <div key={project.id || index} className="flex">
                <ProjectCard
                  imgSrc={project.imgSrc}
                  title={project.title}
                  tags={project.tags}
                  projectLink={project.projectLink}
                  code={project.code}
                  live={project.live}
                  gitUrl={project.gitUrl}
                  projectId={project.id}
                  displayTags={project.displayTags}
                />
              </div>
            ))}

            <Link
              to="/projects"
              className="group flex flex-col items-center justify-center gap-4 bg-paper-card border-2 border-dashed border-ink rounded-wobbly-md p-6 text-center transition-transform duration-100 hover:rotate-1 hover:border-solid hover:shadow-hard"
            >
              <span className="w-16 h-16 grid place-items-center rounded-wobbly-sm bg-marker text-paper border-2 border-ink shadow-hard-sm group-hover:rotate-12 transition-transform duration-100">
                <Plus size={28} strokeWidth={3} aria-hidden="true" />
              </span>

              <span className="font-display text-xl text-ink">More Projects</span>

              <span className="text-ink-soft text-lg">
                View {remainingCount} more projects
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomepageProjects;
