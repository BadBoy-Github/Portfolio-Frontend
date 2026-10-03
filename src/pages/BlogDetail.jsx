import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoChevronBack, IoChevronForward, IoShareSocial, IoCopy } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import SocialShare from "../components/SocialShare";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogRes, allRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/blogs/${id}`),
          fetch(`${BACKEND_URL}/api/blogs`),
        ]);
        if (!blogRes.ok) throw new Error("Blog not found");
        const blogData = await blogRes.json();
        const allData = await allRes.json();
        setBlog(blogData.data);
        setOtherBlogs(allData.data.filter((b) => b.id !== id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Blog Not Found</h1>
          <Link to="/blogs" className="text-accent-secondary hover:underline">
            Go back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = `https://elayabarathimv.vercel.app/blog/${blog.id}`;
    const title = blog.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
      }
    } else {
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
    <div className="min-h-screen bg-background pt-24 pb-16">
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
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent-secondary transition-colors mb-8"
        >
          <IoArrowBack className="size-5" />
          <span>Back to All Blogs</span>
        </Link>

        <article className="mx-auto">
          <header className="mb-8">
            <h1 className="headline-1 text-foreground">
              {blog.title}
            </h1>
            <p className="body-text text-muted-foreground mt-3 mb-4 max-w-[50ch]">
              {blog.subtitle}
            </p>

            {blog.link && (
                <div className="flex items-center gap-2 my-4 w-fit">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-3 bg-muted hover:bg-border text-muted-foreground hover:text-foreground rounded-lg transition-colors font-mono"
                    title="Share this blog"
                  >
                    <IoShareSocial className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors border border-border font-mono ${
                      copySuccess
                        ? 'bg-accent-secondary text-background'
                        : 'bg-muted hover:bg-accent-secondary text-muted-foreground hover:text-background'
                    }`}
                    title="Copy link"
                  >
                    <IoCopy className="w-4 h-4" />
                  </button>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-electric text-accent-foreground rounded-lg hover:brightness-110 transition-all shadow-glow-blue"
                  >
                    <span>View Project</span>
                    <IoArrowBack className="size-4 rotate-180" />
                  </a>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-mono">
              <span className="text-sm">{blog.date}</span>
              <span>•</span>
              <span className="text-sm">{blog.readTime}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-3 bg-muted hover:bg-border text-muted-foreground hover:text-foreground rounded-lg transition-colors font-mono"
                title="Share this blog"
              >
                <IoShareSocial className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors border border-border font-mono ${
                  copySuccess
                    ? 'bg-accent-secondary text-background'
                    : 'bg-muted hover:bg-accent-secondary text-muted-foreground hover:text-background'
                }`}
                title="Copy link"
              >
                <IoCopy className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {(blog.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <img
            src={blog.imageSrc}
            alt={blog.title}
            loading="lazy"
            className="w-full rounded-xl mb-8"
          />

          <div className="rule-line my-8"></div>

          <div
            className="prose prose-invert prose-lg max-w-none blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <SocialShare
            title={blog.title}
            url={`https://elayabarathimv.vercel.app/blog/${blog.id}`}
          />

          <div className="mt-16 relative card p-6 md:p-8 text-center border border-border">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="material-symbols-rounded text-accent-secondary text-3xl">mail</span>
              <span className="material-symbols-rounded text-accent-secondary text-3xl">chat</span>
            </div>
            <h2 className="headline-2 text-foreground">
              Have a <span className="gold-text">project</span> in mind?
            </h2>
            <p className="body-text text-muted-foreground max-w-2xl mx-auto mb-6">
              I'd love to hear about your ideas and collaborate on something amazing. Reach out and let's build great things together.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary"
            >
              <span>Get In Touch</span>
              <IoArrowBack className="size-4 rotate-180" />
            </Link>
          </div>
        </article>

        {otherBlogs.length != 0 && (
          <div className="mt-16 relative">
            <h2 className="headline-2 text-foreground">
              Other <span className="gold-text">Blogs</span>
            </h2>
            <button
              onClick={() =>
                document
                  .getElementById("other-blogs-scroll")
                  .scrollBy({ left: -672, behavior: "smooth" })
              }
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 bg-muted/90 hover:bg-border text-foreground p-3 rounded-full shadow-lg hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <IoChevronBack className="size-6" />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("other-blogs-scroll")
                  .scrollBy({ left: 672, behavior: "smooth" })
              }
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 bg-muted/90 hover:bg-border text-foreground p-3 rounded-full shadow-lg hidden md:flex items-center justify-center"
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
                  className="w-[280px] md:w-[320px] flex-shrink-0 card rounded-xl overflow-hidden hover:shadow-glow-gold transition-all group"
                >
                  <img
                    src={otherBlog.imageSrc}
                    alt={otherBlog.title}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-accent-secondary transition-colors line-clamp-2">
                      {otherBlog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
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
