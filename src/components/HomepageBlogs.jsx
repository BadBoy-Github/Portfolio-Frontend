import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomepageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/blogs`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setBlogs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section id="blogs" className="section">
        <div className="container mx-auto">
          <h2 className="headline-2">My Blogs</h2>
          <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
            Insights, tutorials, and thoughts on web development
          </p>
          <div className="flex items-center justify-center py-10">
            <div className="loader mb-4"><span></span></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blogs" className="section">
        <div className="container mx-auto">
          <h2 className="headline-2">My Blogs</h2>
          <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
            Insights, tutorials, and thoughts on web development
          </p>
          <p className="text-red-400">Failed to load blogs.</p>
        </div>
      </section>
    );
  }

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
            <BlogCard key={blog.id || index} blog={blog} />
          ))}

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
