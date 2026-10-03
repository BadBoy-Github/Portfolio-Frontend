import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import SectionHeading from "./ui/SectionHeading";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomepageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/blogs`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setBlogs(data.data);
      } catch {
        // blogs fetch failed
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
          <SectionHeading title="My Blogs" lead="Insights, tutorials, and thoughts on web development" />
          <div className="flex items-center justify-center py-10">
            <div className="loader mb-4"><span></span></div>
          </div>
        </div>
      </section>
    );
  }

  const displayBlogs = blogs.slice(0, 5);
  const remainingCount = blogs.length - 5;

  return (
    <section id="blogs" className="section">
      <div className="container mx-auto">
        <SectionHeading title="My Blogs" lead="Insights, tutorials, and thoughts on web development" />

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayBlogs.map((blog, index) => (
            <BlogCard key={blog.id || index} blog={blog} />
          ))}

          {remainingCount > 0 && (
            <Link
              to="/blogs"
              className="card card-paper p-5 shadow-hard hover:shadow-hard transition-all hover:rotate-1 flex flex-col items-center justify-center cursor-pointer group min-h-[300px]"
            >
              <div className="w-16 h-16 rounded-wobbly-sm bg-paper/60 border-2 border-dashed border-ink/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-4xl text-marker">
                  add_circle
                </span>
              </div>
              <h3 className="text-xl font-semibold text-ink mb-2">
                Show More Blogs
              </h3>
              <p className="text-ink-soft text-sm">
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
