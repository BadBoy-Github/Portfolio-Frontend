import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
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
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll to top"
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:grid place-items-center w-11 h-11 transition-[opacity,transform] duration-300 ease-out ${
        isVisible
          ? "opacity-100 scale-100 translate-x-0"
          : "opacity-0 scale-75 translate-x-8 pointer-events-none"
      }`}
    >
      <span className="w-8 h-8 grid place-items-center border-2 border-ink rounded-wobbly-sm bg-postit text-ink shadow-hard-sm transition-transform duration-100 hover:bg-marker hover:text-white hover:rotate-6">
        <ArrowUp size={16} strokeWidth={2.5} aria-hidden="true" />
      </span>
    </button>
  );
};

export default ScrollToTopButton;