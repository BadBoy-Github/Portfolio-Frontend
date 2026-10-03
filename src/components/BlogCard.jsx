import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="group">
      <article className="card border-t-2 border-accent-tertiary/50 hover:shadow-glow-blue transition-all duration-300 h-full flex flex-col overflow-hidden">
        <div className="m-4 rounded-lg overflow-hidden">
          <img
            src={blog.imageSrc}
            alt={blog.title}
            loading="lazy"
            className="w-full h-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-terminal-green font-mono bg-terminal-green/10 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-lg font-display font-semibold text-foreground group-hover:gradient-text transition-all duration-300 mb-2">
            {blog.title}
          </h2>
          <p className="body-text text-sm text-muted-foreground mb-3 line-clamp-2">
            {blog.subtitle}
          </p>
          <div className="mt-auto flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogCard;
