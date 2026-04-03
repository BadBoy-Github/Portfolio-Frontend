import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoChevronBack, IoChevronForward, IoShareSocial, IoCopy } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { blogs } from "../data/BlogData";
import SocialShare from "../components/SocialShare";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleShare = async () => {
    const url = `https://elayabarathimv.vercel.app/blog/${blog.id}`;
    const title = blog.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://elayabarathimv.vercel.app/blog/${blog.id}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 5000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
      <Helmet>
        <title>{blog.title} | Elayabarathi M V Blog</title>
        <meta name="description" content={blog.subtitle || ""} />
        <meta
          name="keywords"
          content={
            (blog.tags || []).join(", ") + ", portfolio, developer, blog"
          }
        />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.subtitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://elayabarathimv.vercel.app/blog/${blog.id}`}
        />
        <meta property="og:image" content={blog.imageSrc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.subtitle} />
        <meta name="twitter:image" content={blog.imageSrc} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.subtitle,
            image: blog.imageSrc,
            author: {
              "@type": "Person",
              name: "Elayabarathi M V",
            },
            datePublished: blog.date,
            publisher: {
              "@type": "Person",
              name: "Elayabarathi M V",
            },
          })}
        </script>
      </Helmet>
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
        <article className="mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <p className="text-xl text-zinc-400 mb-4">{blog.subtitle}</p>

            {blog.link && (
                <div className="flex items-center gap-2 my-4 w-fit">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors"
                    title="Share this blog"
                  >
                    <IoShareSocial className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      copySuccess
                        ? 'bg-sky-400 text-zinc-900'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                    }`}
                    title="Copy link"
                  >
                    <IoCopy className="w-4 h-4" />
                  </button>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-sky-400 text-zinc-900 rounded-lg hover:bg-sky-300 transition-colors"
                  >
                    <span>View Project</span>
                    <IoArrowBack className="size-4 rotate-180" />
                  </a>
                </div>
            )}

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
            loading="lazy"
            className="w-full rounded-xl mb-8"
          />

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Social Share */}
          <SocialShare
            title={blog.title}
            url={`https://elayabarathimv.vercel.app/blog/${blog.id}`}
          />
        </article>

        {/* Other Blogs Section */}
        {otherBlogs.length != 0 && (
          <div className="mt-16 relative">
            <h2 className="text-2xl font-bold text-white mb-6">Other Blogs</h2>
            {/* Left Scroll Button */}
            <button
              onClick={() =>
                document
                  .getElementById("other-blogs-scroll")
                  .scrollBy({ left: -672, behavior: "smooth" })
              }
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 bg-zinc-800/90 hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <IoChevronBack className="size-6" />
            </button>
            {/* Right Scroll Button */}
            <button
              onClick={() =>
                document
                  .getElementById("other-blogs-scroll")
                  .scrollBy({ left: 672, behavior: "smooth" })
              }
              className="absolute -right-6 top-1/2 -translate-y-1/2 transition-all duration-300 z-10 bg-zinc-800/90 hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <IoChevronForward className="size-6" />
            </button>
            <div
              id="other-blogs-scroll"
              className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
            >
              {otherBlogs.map((otherBlog) => (
                <Link
                  key={otherBlog.id}
                  to={`/blog/${otherBlog.id}`}
                  className="w-[280px] md:w-[320px] flex-shrink-0 bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors group"
                >
                  <img
                    src={otherBlog.imageSrc}
                    alt={otherBlog.title}
                    loading="lazy"
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
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
