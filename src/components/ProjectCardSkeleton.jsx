import Skeleton from './Skeleton';

const ProjectCardSkeleton = () => {
  return (
    <div className="relative cursor-pointer p-4 rounded-2xl shadow-xl bg-zinc-800 ring-1 ring-inset ring-zinc-50/5">
      <figure className="img-box aspect-square rounded-xl mb-4">
        <Skeleton className="w-full h-full rounded-xl" />
      </figure>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-3" />
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-14 rounded-lg" />
          </div>
        </div>
        <Skeleton className="w-11 h-11 rounded-lg" />
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;