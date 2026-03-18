import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="group">
      <article className="bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors h-full flex flex-col">
        <div className="aspect-video overflow-hidden">
          <img
            src={blog.imageSrc}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-sky-400 bg-sky-600/20 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors mb-2">
            {blog.title}
          </h2>
          <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
            {blog.subtitle}
          </p>
          <div className="mt-auto flex items-center justify-between text-xs text-zinc-500">
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
