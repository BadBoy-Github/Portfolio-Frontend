import Skeleton from './Skeleton';

const BlogCardSkeleton = () => {
  return (
    <article className="bg-zinc-800 rounded-xl overflow-hidden flex flex-col">
      <div className="m-4 rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full aspect-video rounded-lg" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <div className="mt-auto flex items-center justify-between text-xs">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;