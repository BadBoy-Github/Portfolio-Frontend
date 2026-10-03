// Node modules
import useCollection from "../hooks/useCollection";

// Components
import ProjectFeaturedCard from "./ProjectFeaturedCard";
import SectionState from "./ui/SectionState";

const FeaturedProjectGrid = () => {
  const { items, loading, error, reload } = useCollection("/api/projects");

  const featuredProjects = items.filter((project) => project.type === "featured");

  return (
    <SectionState
      loading={loading}
      error={error}
      label="featured projects"
      onRetry={reload}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <ProjectFeaturedCard
            key={project.id ?? project.title}
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
      </div>
    </SectionState>
  );
};

export default FeaturedProjectGrid;