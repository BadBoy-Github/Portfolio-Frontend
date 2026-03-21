import { proj } from "../data/ProjectData";
import ProjectFeaturedCard from "./ProjectFeaturedCard";

const FeaturedProjectGrid = () => {
  const featuredProject = proj.filter((e) => e.type === "featured");
  return (
    <div className="grid grid-cols-2 gap-4">
      {featuredProject.map((e, i) => {
        return (
          <ProjectFeaturedCard
            key={i}
            imgSrc={e.imgSrc}
            title={e.title}
            tags={e.tags}
            projectLink={e.projectLink}
            classes={e.classes}
            code={e.code}
            live={e.live}
            gitUrl={e.gitUrl}
            projectId={e.id}
          />
        );
      })}
    </div>
  );
};

export default FeaturedProjectGrid;
