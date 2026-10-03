// Node modules
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import Badge from "./ui/Badge";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`} className="group block h-full">
      <article className="card card-flush h-full flex flex-col transition-transform duration-100 group-hover:-rotate-1 group-hover:shadow-hard-lg">
        <figure className="border-b-2 border-ink">
          <img
            src={blog.imageSrc}
            alt=""
            loading="lazy"
            className="w-full aspect-video object-cover"
          />
        </figure>

        <div className="p-5 flex flex-col flex-grow gap-3">
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} tone="postit">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h2 className="font-display text-xl text-ink leading-snug group-hover:text-marker transition-colors duration-100">
            {blog.title}
          </h2>

          <p className="text-ink-soft text-lg line-clamp-2">{blog.subtitle}</p>

          <div className="mt-auto pt-2 flex items-center justify-between text-ink-faint text-base border-t-2 border-dashed border-ink/15">
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    imageSrc: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    date: PropTypes.string,
    readTime: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BlogCard;