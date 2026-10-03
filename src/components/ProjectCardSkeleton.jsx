import Skeleton from "./Skeleton";

const ProjectCardSkeleton = () => {
  return (
    <article className="card card-flush flex flex-col">
      <figure className="border-b-2 border-ink">
        <Skeleton width="100%" height="100%" className="aspect-square w-full" />
      </figure>

      <div className="p-5 flex flex-col gap-4">
        <Skeleton width="75%" height="1.5rem" />

        <div className="flex flex-wrap gap-2">
          <Skeleton width="4rem" height="2rem" />
          <Skeleton width="5rem" height="2rem" />
          <Skeleton width="3.5rem" height="2rem" />
        </div>
      </div>
    </article>
  );
};

export default ProjectCardSkeleton;