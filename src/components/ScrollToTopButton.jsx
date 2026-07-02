import { useState, useEffect } from "react";
import { IoArrowUp } from "react-icons/io5";
import { useLenis } from "lenis/react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      setIsVisible(lenis.scroll > window.innerHeight);
    };

    lenis.on("scroll", handleScroll);
    handleScroll();

    return () => lenis.off("scroll", handleScroll);
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, duration: 0.3 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex w-8 h-8 items-center justify-center rounded-full transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-75 translate-x-8"
        } bg-sky-400 text-zinc-900 hover:bg-sky-300 shadow-lg`}
        title="Scroll to top"
      >
        <IoArrowUp className="w-2.5 h-2.5" />
      </button>
    </>
  );
};

export default ScrollToTopButton;
