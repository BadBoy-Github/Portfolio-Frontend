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
          <div className="section-label mb-6">
            <span className="dot"></span>
            <span>BLOGS</span>
          </div>
          <h2 className="headline-2 text-foreground mb-4">
            My <span className="gold-text">Blogs</span>
          </h2>
          <p className="body-text mt-3 mb-8 max-w-[50ch]">
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
          <div className="section-label mb-6">
            <span className="dot"></span>
            <span>BLOGS</span>
          </div>
          <h2 className="headline-2 text-foreground mb-4">
            My <span className="gold-text">Blogs</span>
          </h2>
          <p className="body-text mt-3 mb-8 max-w-[50ch]">
            Insights, tutorials, and thoughts on web development
          </p>
          <p className="text-error">Failed to load blogs.</p>
        </div>
      </section>
    );
  }

  const displayBlogs = blogs.slice(0, 5);
  const remainingCount = blogs.length - 5;

  return (
    <section id="blogs" className="section">
      <div className="container mx-auto">
        <div className="section-label mb-6">
          <span className="dot"></span>
          <span>BLOGS</span>
        </div>
        <h2 className="headline-2 text-foreground mb-4">
          My <span className="gold-text">Blogs</span>
        </h2>
        <p className="body-text mt-3 mb-8 max-w-[50ch]">
          Insights, tutorials, and thoughts on web development
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayBlogs.map((blog, index) => (
            <BlogCard key={blog.id || index} blog={blog} />
          ))}

          {remainingCount > 0 && (
            <Link
              to="/blogs"
              className="card-featured group cursor-pointer"
            >
              <div className="p-5 rounded-xl flex flex-col items-center justify-center min-h-[300px] transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-accent-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-rounded text-4xl text-accent-secondary">
                    add_circle
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  Show More Blogs
                </h3>
                <p className="body-text text-muted-foreground text-sm">
                  Read {remainingCount} more articles
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomepageBlogs;
