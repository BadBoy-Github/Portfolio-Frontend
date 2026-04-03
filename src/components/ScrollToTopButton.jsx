import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoArrowUp, IoShareSocial, IoCopy } from "react-icons/io5";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith("/blog/");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;

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
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 5000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex w-8 h-8 items-center justify-center rounded-full transition-all duration-500 ease-out ${
          isVisible
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-75 translate-x-8'
        } bg-sky-400 text-zinc-900 hover:bg-sky-300 shadow-lg`}
        title="Scroll to top"
      >
        <IoArrowUp className="w-2.5 h-2.5" />
      </button>

      {isBlogPage && isVisible && (
        <div className="fixed right-4 top-1/2 transform translate-y-12 z-40 hidden md:flex flex-col gap-1">
          <button
            onClick={handleShare}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ease-out ${
              isVisible
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-75 -translate-x-8'
            } bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white shadow-lg`}
            title="Share this blog"
          >
            <IoShareSocial className="w-2.5 h-2.5" />
          </button>

          <button
            onClick={handleCopy}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ease-out ${
              isVisible
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-75 -translate-x-8'
            } ${
              copySuccess
                ? 'bg-sky-400 text-zinc-900'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
            } shadow-lg`}
            title="Copy link"
          >
            <IoCopy className="w-2.5 h-2.5" />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;