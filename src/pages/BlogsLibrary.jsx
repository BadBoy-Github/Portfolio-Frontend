import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useLenis } from "lenis/react";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../components/BlogCardSkeleton";

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
    document.getElementById("blog_search").value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-error mb-2">Failed to load blogs</h2>
          <p className="text-muted-foreground">{error}</p>
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
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="headline-1">
              All <span className="gradient-text">Blogs</span>
            </h1>
            <p className="body-text text-muted-foreground">
              Read my latest articles and insights
            </p>
          </div>

          <div className="mb-10 card px-4 py-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className={`p-2 rounded-lg text-sm ${
                  selectedTag === "all"
                    ? "bg-accent-secondary text-background"
                    : "bg-muted text-muted-foreground"
                } hover:bg-accent-secondary hover:text-background active:bg-accent-secondary/80 transition-all duration-300`}
                onClick={() => handleTagSelect("all")}
              >
                <HiOutlineMenu className="size-5" />
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                {sTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm font-mono ${
                      selectedTag === tag.toLowerCase()
                        ? "bg-accent-secondary text-background"
                        : "text-muted-foreground bg-muted"
                    } hover:bg-accent-secondary hover:text-background active:bg-accent-secondary/80 transition-all duration-300`}
                    onClick={() => handleTagSelect(tag.toLowerCase())}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="text-xs text-muted-foreground mr-3">
                #{filteredBlogs.length} blogs
              </div>

              <input
                type="text"
                id="blog_search"
                placeholder="Search blogs..."
                className="input-field w-full lg:w-60"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchQuery}
              />

              {searchQuery && (
                <div
                  className="text-background mr-1 bg-error rounded-lg p-2 ml-2 cursor-pointer hover:bg-error/80 transition-all duration-500 group/close"
                  onClick={clearSearch}
                >
                  <IoClose className="size-5 group-hover/close:rotate-90 transition-all duration-500" />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
              />
            ))}

            {filteredBlogs.length === 0 && (
              <div className="col-span-full text-center py-10 flex flex-col justify-center items-center">
                <div className="loader mb-4">
                  <span></span>
                </div>

                <h3 className="text-xl font-semibold text-muted-foreground mt-2">
                  No blogs found
                </h3>
                <p className="text-muted-foreground/70 mt-2">
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
