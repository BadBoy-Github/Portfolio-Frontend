import { useParams, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { blogs } from "./data/BlogData";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Blog Not Found</h1>
          <Link to="/blogs" className="text-sky-400 hover:underline">
            Go back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  // Get other blogs
  const otherBlogs = blogs.filter((b) => b.id !== id);

  return (
    <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors mb-8"
        >
          <IoArrowBack className="size-5" />
          <span>Back to All Blogs</span>
        </Link>

        {/* Main Content */}
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <p className="text-xl text-zinc-400 mb-4">{blog.subtitle}</p>

            <div className="flex flex-wrap items-center gap-4 text-zinc-500">
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-sky-600/20 text-sky-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          <img
            src={blog.imageSrc}
            alt={blog.title}
            className="w-full rounded-xl mb-8"
          />

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Other Blogs Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Other Blogs</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {otherBlogs.slice(0, 6).map((otherBlog) => (
              <Link
                key={otherBlog.id}
                to={`/blog/${otherBlog.id}`}
                className="min-w-[280px] md:min-w-[320px] bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors group"
              >
                <img
                  src={otherBlog.imageSrc}
                  alt={otherBlog.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors line-clamp-2">
                    {otherBlog.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2">
                    {otherBlog.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
