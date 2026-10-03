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
        } bg-gradient-electric text-accent-foreground hover:brightness-110 shadow-glow-blue ring-1 ring-gold/30`}
        title="Scroll to top"
      >
        <IoArrowUp className="w-3 h-3" />
      </button>
    </>
  );
};

export default ScrollToTopButton;
