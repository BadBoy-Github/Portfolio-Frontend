import { useState, useEffect } from "react";
import ProjectFeaturedCard from "./ProjectFeaturedCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FeaturedProjectGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const featuredProject = projects.filter((e) => e.type === "featured");

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-zinc-800 rounded-xl animate-pulse h-64"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-6">Failed to load featured projects.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {featuredProject.map((e, i) => {
        return (
          <ProjectFeaturedCard
            key={e.id || i}
            imgSrc={e.imgSrc}
            title={e.title}
            techUsed={e.techUsed}
            projectLink={e.projectLink}
            classes={e.classes}
            code={e.code}
            live={e.live}
            gitUrl={e.gitUrl}
            projectId={e.id}
            displayTags={e.displayTags}
          />
        );
      })}
    </div>
  );
};

export default FeaturedProjectGrid;
