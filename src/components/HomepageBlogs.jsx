import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { blogs } from "../data/BlogData";

const HomepageBlogs = () => {
  const displayBlogs = blogs.slice(0, 5);
  const remainingCount = blogs.length - 5;

  return (
    <section id="blogs" className="section">
      <div className="container mx-auto">
        <h2 className="headline-2">My Blogs</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Insights, tutorials, and thoughts on web development
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}

          {/* Show More Card */}
          {remainingCount > 0 && (
            <Link
              to="/blogs"
              className="bg-zinc-800 hover:bg-zinc-700/50 rounded-xl p-5 shadow-xl flex flex-col items-center justify-center cursor-pointer group min-h-[300px]"
            >
              <div className="w-16 h-16 rounded-full bg-sky-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-4xl text-sky-400">
                  add_circle
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Show More Blogs
              </h3>
              <p className="text-zinc-400 text-sm">
                Read {remainingCount} more articles
              </p>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomepageBlogs;
