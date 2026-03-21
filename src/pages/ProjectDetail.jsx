import { useParams, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { IoArrowBack, IoArrowForwardOutline } from "react-icons/io5";
import { proj } from "../data/ProjectData";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = proj.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <Link to="/projects" className="text-sky-400 hover:underline">
            Go back to all projects
          </Link>
        </div>
      </div>
    );
  }

  // Get other projects for the "Other Projects" section
  const otherProjects = proj.filter((p) => p.id !== id);

  return (
    <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors mb-8"
        >
          <IoArrowBack className="size-5" />
          <span>Back to All Projects</span>
        </Link>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Project Info */}
          <div className="lg:col-span-2">
            {/* Title and Subtitle */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-zinc-400 mb-6">{project.subheading}</p>

            {/* Tech Used */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techUsed.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-sky-600/20 text-sky-400 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">
                Description
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Uses */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">
                What I Learned
              </h2>
              <p className="text-zinc-300 leading-relaxed">{project.uses}</p>
            </div>

            {/* Improvements */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">
                Unique Features & Improvements
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                {project.improvements}
              </p>
            </div>
          </div>

          {/* Right Column - Image and Links */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={project.imgSrc}
                alt={project.title}
                className="w-full rounded-xl mb-6"
              />

              {/* Action Buttons */}
              <div className="flex gap-4">
                {project.code === "True" && (
                  <a
                    href={project.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-white transition-colors"
                  >
                    <FaGithub className="size-5" />
                    <span>View Code</span>
                  </a>
                )}
                {project.live === "True" && project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl text-white transition-colors"
                  >
                    <span>Live Demo</span>
                    <IoArrowForwardOutline className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Project Gallery
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full rounded-xl hover:scale-[101%] transition-transform"
              />
            ))}
          </div>
        </div>

        {/* Other Projects Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Other Projects</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {otherProjects.map((otherProject) => (
              <Link
                key={otherProject.id}
                to={`/project/${otherProject.id}`}
                className="min-w-[280px] md:min-w-[320px] bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors group"
              >
                <img
                  src={otherProject.imgSrc}
                  alt={otherProject.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors">
                    {otherProject.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    {otherProject.subheading}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {otherProject.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs text-zinc-500 bg-zinc-700/50 px-2 py-1 rounded"
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
  );
};

export default ProjectDetail;
