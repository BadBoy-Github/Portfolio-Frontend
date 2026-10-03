import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLenis } from "lenis/react";
import FilterBar from "../components/ui/FilterBar";
import SectionHeading from "../components/ui/SectionHeading";

const sTags = ["Portfolio", "Card Vaults"];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BlogsLibrary = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lenis = useLenis();

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

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [lenis]);

  const filteredBlogs = blogs.filter((blog) => {
    const tagMatch =
      selectedTag === "all" ||
      blog.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
      blog.subtitle.toLowerCase().includes(selectedTag.toLowerCase()) ||
      (blog.tags || []).some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase(),
      );

    const searchMatch =
      searchQuery === "" ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.tags || []).some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return tagMatch && searchMatch;
  });

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedTag("all");
  };

  const clearSearch = () => {
    setSearchQuery("");
    const input = document.getElementById("blog_search");
    if (input) input.value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-accent-red mb-2">Failed to load blogs</h2>
          <p className="text-ink-soft">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blogs | Elayabarathi M V</title>
        <meta
          name="description"
          content="Read technical blogs, tutorials, and insights from Elayabarathi M V, a Frontend Developer sharing knowledge about React, JavaScript, and modern web development."
        />
        <meta
          name="keywords"
          content="blog, tutorials, web development, React, JavaScript, frontend development, portfolio"
        />
        <meta property="og:title" content="Blogs | Elayabarathi M V" />
        <meta
          property="og:description"
          content="Read technical blogs and tutorials about web development, React, and modern frontend technologies."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://elayabarathimv.vercel.app/blogs"
        />
      </Helmet>
      <div className="min-h-screen bg-paper pt-24 pb-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="All Blogs"
            lead="Read my latest articles and insights"
          />

          <FilterBar
            tags={sTags}
            selectedTag={selectedTag}
            onTagSelect={handleTagSelect}
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onSearchClear={clearSearch}
            countLabel={`${filteredBlogs.length} blogs`}
            searchPlaceholder="Search blogs..."
            searchId="blog_search"
          />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
                <article className="card card-paper h-full flex flex-col">
                  <div className="aspect-video overflow-hidden m-2 rounded-xl">
                    <img
                      src={blog.imageSrc}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(blog.tags || []).slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="badge badge-postit"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-lg font-semibold text-ink group-hover:text-marker transition-colors mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-ink-soft mb-3 line-clamp-2">
                      {blog.subtitle}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-xs text-ink-soft">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {filteredBlogs.length === 0 && (
              <div className="col-span-full text-center py-10 flex flex-col justify-center items-center">
                <div className="loader mb-4">
                  <span></span>
                </div>

                <h3 className="text-xl font-semibold text-ink mt-2">
                  No blogs found
                </h3>
                <p className="text-ink-soft mt-2">
                  Try a different search term or filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsLibrary;
