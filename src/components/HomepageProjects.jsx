import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import ProjectFeaturedCard from "./ProjectFeaturedCard";
import { proj } from "../data/ProjectData";

const HomepageProjects = () => {
  let featuredProject = [];
  let normalProject = [];

  proj.map((e) => {
    if (e.type == "featured") {
      featuredProject.push(e);
    } else {
      normalProject.push(e);
    }
  });

  const displayProjects = normalProject.slice(0, 5);
  const remainingCount = proj.length - 5;

  return (
    <section id="project" className="pt-20">
      <div className="container">
        <h2 className="headline-2">My project highlights</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Explore the innovative projects I&apos;ve built
        </p>

        {/* Featured Projects */}
        <div className="w-full mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featuredProject.map((project, index) => (
            <ProjectFeaturedCard
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
        </div>

        <div className="bg-zinc-500 w-full h-0.5 mb-8 rounded-lg flex lg:hidden"></div>

        {/* Regular Projects Grid */}
        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {displayProjects.map((project, index) => (
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

          {/* Show More Card */}
          {remainingCount > 0 && (
            <Link
              to="/projects"
              className="relative p-4 rounded-2xl shadow-xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-all group hover:scale-[101%] cursor-pointer flex flex-col items-center justify-center min-h-[280px]"
            >
              <div className="aspect-square rounded-lg mb-4 bg-zinc-700/30 flex items-center justify-center w-full">
                <span className="material-symbols-rounded text-6xl text-sky-400">
                  add_circle
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 w-full">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Show More Projects
                  </h3>
                  <div className="h-8 text-sm text-zinc-400 bg-zinc-50/5 grid items-center px-3 rounded-lg w-fit">
                    View {remainingCount} more projects
                  </div>
                </div>

                <div className="w-11 h-11 rounded-lg grid place-items-center bg-sky-400 text-zinc-950 shrink-0">
                  <span className="material-symbols-rounded">expand_more</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomepageProjects;
