import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoChevronBack, IoChevronForward, IoShareSocial, IoCopy } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import SocialShare from "../components/SocialShare";
import Card from "../components/ui/Card";
import SectionHeading from "../components/ui/SectionHeading";

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
      <div className="min-h-screen bg-paper pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-ink mb-4">Blog Not Found</h1>
          <Link to="/blogs" className="text-marker hover:underline">
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
      } catch {
        // share cancelled or unavailable
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
    <div className="min-h-screen bg-paper pt-24 pb-16">
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
          className="inline-flex items-center gap-2 text-ink-soft hover:text-marker transition-colors mb-8"
        >
          <IoArrowBack className="size-5" />
          <span>Back to All Blogs</span>
        </Link>

        <article className="mx-auto max-w-3xl">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
              {blog.title}
            </h1>
            <p className="text-xl text-ink-soft mb-4">{blog.subtitle}</p>

            {blog.link && (
                <div className="flex items-center gap-2 my-4 flex-wrap">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-3 bg-paper hover:bg-paper/80 text-ink shadow-hard rounded-xl transition-colors"
                    title="Share this blog"
                  >
                    <IoShareSocial className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                      copySuccess
                        ? 'bg-marker text-ink'
                        : 'bg-paper hover:bg-paper/80 text-ink shadow-hard'
                    }`}
                    title="Copy link"
                  >
                    <IoCopy className="w-4 h-4" />
                  </button>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-marker text-ink rounded-xl hover:brightness-110 transition-colors"
                  >
                    <span>View Project</span>
                    <IoArrowBack className="size-4 rotate-180" />
                  </a>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-ink-soft/70">
              <span>{blog.date}</span>
              <span aria-hidden="true">•</span>
              <span>{blog.readTime}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-3 bg-paper hover:bg-paper/80 text-ink shadow-hard rounded-xl transition-colors"
                title="Share this blog"
              >
                <IoShareSocial className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                  copySuccess
                    ? 'bg-marker text-ink'
                    : 'bg-paper hover:bg-paper/80 text-ink shadow-hard'
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
                  className="badge badge-postit"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <Card tone="paper" className="mb-8 overflow-hidden">
            <img
              src={blog.imageSrc}
              alt={blog.title}
              loading="lazy"
              className="w-full rounded-xl"
            />
          </Card>

          <div className="my-8 bg-ink/10 h-1 w-full rounded-full"></div>

          <div
            className="prose prose-lg max-w-none blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <Card tone="postit" className="p-6 md:p-8 text-center my-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-marker text-2xl font-hand">✉</span>
              <span className="text-marker text-2xl font-hand">💬</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-2">
              Have a project in mind?
            </h2>
            <p className="text-ink-soft max-w-2xl mx-auto mb-6">
              I&apos;d love to hear about your ideas and collaborate on something amazing. Reach out and let&apos;s build great things together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-marker text-ink rounded-xl hover:brightness-110 transition-colors"
            >
              <span>Get In Touch</span>
              <IoArrowBack className="size-4 rotate-180" />
            </Link>
          </Card>

          <SocialShare
            title={blog.title}
            url={`https://elayabarathimv.vercel.app/blog/${blog.id}`}
          />
        </article>

        {otherBlogs.length != 0 && (
            <div className="mt-16 relative">
              <SectionHeading
                title="Other Blogs"
                tag="More Reads"
              />

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("other-blogs-scroll")
                    .scrollBy({ left: -672, behavior: "smooth" })
                }
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-paper hover:bg-paper/80 text-ink p-3 rounded-full shadow-hard transition-all duration-300 hidden md:flex items-center justify-center"
                aria-label="Scroll left"
              >
                <IoChevronBack className="size-6" />
              </button>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("other-blogs-scroll")
                    .scrollBy({ left: 672, behavior: "smooth" })
                }
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-paper hover:bg-paper/80 text-ink p-3 rounded-full shadow-hard transition-all duration-300 hidden md:flex items-center justify-center"
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
                    className="w-[280px] md:w-[320px] flex-shrink-0 card card-paper group"
                  >
                    <img
                      src={otherBlog.imageSrc}
                      alt={otherBlog.title}
                      loading="lazy"
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-ink group-hover:text-marker transition-colors line-clamp-2">
                        {otherBlog.title}
                      </h3>
                      <p className="text-sm text-ink-soft mt-2">
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
