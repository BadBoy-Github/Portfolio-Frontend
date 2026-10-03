import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { VscDebugBreakpointFunctionUnverified } from "react-icons/vsc";
import {
  IoArrowBack,
  IoArrowForwardOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [otherProjects, setOtherProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectRes, allRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/projects/${id}`),
          fetch(`${BACKEND_URL}/api/projects`),
        ]);
        if (!projectRes.ok) throw new Error("Project not found");
        const projectData = await projectRes.json();
        const allData = await allRes.json();
        setProject(projectData.data);
        setOtherProjects(allData.data.filter((p) => p.id !== id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <Link to="/projects" className="text-accent-secondary hover:underline">
            Go back to all projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Elayabarathi M V</title>
        <meta name="description" content={project.subtitle || ""} />
        <meta name="keywords" content={(project.techUsed || []).join(", ")} />
        <meta
          property="og:title"
          content={`${project.title} | Project Portfolio`}
        />
        <meta property="og:description" content={project.subtitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://elayabarathimv.vercel.app/project/${project.id}`}
        />
        <meta property="og:image" content={project.imgSrc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${project.title} | Project Portfolio`}
        />
        <meta name="twitter:description" content={project.subtitle} />
        <link
          rel="canonical"
          href={`https://elayabarathimv.vercel.app/project/${project.id}`}
        />
      </Helmet>
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent-secondary transition-colors mb-8"
          >
            <IoArrowBack className="size-5" />
            <span>Back to All Projects</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h1 className="headline-1 text-foreground">
                {project.title}
              </h1>
              <p className="body-text text-muted-foreground mt-3 mb-6 max-w-[50ch]">
                {project.subheading}
              </p>

              <div className="mb-8">
                <h2 className="text-lg font-display font-semibold text-foreground mb-3">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(project.techUsed || []).map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent-secondary/20 text-accent-secondary rounded-full text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-display font-semibold text-foreground mb-3">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed blog-content">
                  {project.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-display font-semibold text-foreground mb-3">
                  Applications & Use Cases
                </h2>
                <ul className="space-y-2">
                  {(project.uses || "")
                    .split(/(?<=[.!?])\s+/)
                    .filter((item) => item.trim())
                    .map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-accent-secondary mt-1">
                          <VscDebugBreakpointFunctionUnverified className="size-5" />
                        </span>
                        <span className="leading-relaxed text-justify">
                          {item.trim()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-display font-semibold text-foreground mb-3">
                  Unique Features
                </h2>
                <ul className="space-y-2">
                  {(project.improvements || "")
                    .split(/(?<=[.!?])\s+/)
                    .filter((item) => item.trim())
                    .map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-accent-secondary mt-1">
                          <VscDebugBreakpointFunctionUnverified className="size-5" />
                        </span>
                        <span className="leading-relaxed text-justify">
                          {item.trim()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <img
                  src={project.imgSrc}
                  alt={project.title}
                  loading="lazy"
                  className="w-full rounded-xl mb-6 border border-border"
                />

                <div className="flex flex-wrap gap-4">
                  {project.gitUrl && (
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-border rounded-xl text-foreground transition-colors font-mono"
                    >
                      <FaGithub className="size-5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-3 bg-gradient-electric text-accent-foreground rounded-xl hover:brightness-110 transition-all shadow-glow-blue"
                    >
                      <span>Live Link</span>
                      <IoArrowForwardOutline className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {(project.gallery || []).length > 0 && (
            <div className="mb-16">
              <h2 className="headline-2 text-foreground">
                Project <span className="gold-text">Gallery</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {project.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    loading="lazy"
                    className="w-full rounded-xl hover:scale-[101%] hover:shadow-xl transition-all border border-border"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <h2 className="headline-2 text-foreground">
              Other <span className="gold-text">Projects</span>
            </h2>
            <button
              onClick={() =>
                document
                  .getElementById("other-projects-scroll")
                  .scrollBy({ left: -672, behavior: "smooth" })
              }
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-muted/90 transition-all duration-300 hover:bg-border text-foreground p-3 rounded-full shadow-lg  hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <IoChevronBack className="size-6" />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("other-projects-scroll")
                  .scrollBy({ left: 672, behavior: "smooth" })
              }
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-muted/90 hover:bg-border text-foreground p-3 rounded-full shadow-lg transition-all duration-300 hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <IoChevronForward className="size-6" />
            </button>
            <div
              id="other-projects-scroll"
              className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
            >
              {otherProjects.map((otherProject) => (
                <Link
                  key={otherProject.id}
                  to={`/project/${otherProject.id}`}
                  className="min-w-[280px] md:min-w-[320px] card rounded-xl overflow-hidden hover:shadow-glow-gold transition-all group"
                >
                  <img
                    src={otherProject.imgSrc}
                    alt={otherProject.title}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-accent-secondary transition-colors truncate">
                      {otherProject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {otherProject.subheading}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(otherProject.tags || [])
                        .slice(0, 2)
                        .map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
