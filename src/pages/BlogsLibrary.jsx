import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useLenis } from "lenis/react";

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
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Failed to load blogs</h2>
          <p className="text-zinc-400">{error}</p>
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
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">All Blogs</h1>
            <p className="text-zinc-400">
              Read my latest articles and insights
            </p>
          </div>

          <div className="mb-10 bg-zinc-800 ring-1 ring-inset ring-zinc-50/5 px-4 py-4 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className={`p-2 rounded-lg text-sm ${
                  selectedTag === "all"
                    ? "bg-sky-600 text-zinc-800"
                    : "bg-zinc-50/5 text-zinc-400"
                } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                onClick={() => handleTagSelect("all")}
              >
                <HiOutlineMenu className="size-5" />
              </button>

              <div className="flex items-center gap-2 flex-wrap">
                {sTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      selectedTag === tag.toLowerCase()
                        ? "bg-sky-600 text-zinc-800"
                        : "text-zinc-400 bg-zinc-50/5"
                    } hover:bg-sky-600 active:bg-sky-800 hover:text-zinc-800 transition-all duration-300`}
                    onClick={() => handleTagSelect(tag.toLowerCase())}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="text-xs text-zinc-400 mr-3">
                #{filteredBlogs.length} blogs
              </div>

              <input
                type="text"
                id="blog_search"
                placeholder="Search blogs..."
                className="bg-zinc-800 w-full lg:w-60 text-sky-100 outline-none outline-zinc-500 hover:outline-sky-700 active:outline-sky-700 rounded-lg px-2 py-1 transition-all duration-500"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchQuery}
              />

              {searchQuery && (
                <div
                  className="text-zinc-800 mr-1 bg-sky-600 rounded-lg p-2 ml-2 cursor-pointer hover:bg-red-600 transition-all duration-500 group/close"
                  onClick={clearSearch}
                >
                  <IoClose className="size-5 group-hover/close:rotate-90 transition-all duration-500" />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
              <Link key={blog.id} to={`/blog/${blog.id}`} className="group">
                <article className="bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors h-full flex flex-col">
                  <div className="aspect-video overflow-hidden m-2 rounded-lg">
                    <img
                      src={blog.imageSrc}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(blog.tags || []).slice(0, 3).map((tag, idx) => (
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
            ))}

            {filteredBlogs.length === 0 && (
              <div className="col-span-full text-center py-10 flex flex-col justify-center items-center">
                <div className="loader mb-4">
                  <span></span>
                </div>

                <h3 className="text-xl font-semibold text-zinc-300 mt-2">
                  No blogs found
                </h3>
                <p className="text-zinc-500 mt-2">
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
