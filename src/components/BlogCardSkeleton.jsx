import Skeleton from "./Skeleton";

const BlogCardSkeleton = () => {
  return (
    <article className="card card-flush flex flex-col">
      <figure className="border-b-2 border-ink">
        <Skeleton width="100%" className="aspect-video w-full" />
      </figure>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Skeleton width="4rem" height="1.75rem" />
          <Skeleton width="5rem" height="1.75rem" />
        </div>

        <Skeleton width="100%" height="1.5rem" />
        <Skeleton width="100%" height="1.25rem" />
        <Skeleton width="75%" height="1.25rem" />

        <div className="mt-auto pt-2 flex items-center justify-between">
          <Skeleton width="4rem" height="1rem" />
          <Skeleton width="3rem" height="1rem" />
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;