import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

const ScrollToTop = () => {
  const { pathname, hash, search } = useLocation();
  const lenis = useLenis();
  const scrollTarget = new URLSearchParams(search).get("scroll");

  useEffect(() => {
    const doScroll = () => {
      if (scrollTarget) {
        const element = document.getElementById(scrollTarget);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: -100, duration: 0.8 });
          } else {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      } else if (!hash) {
        if (lenis) {
          lenis.scrollTo(0, { immediate: false, duration: 0.3 });
          lenis.resize();
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    const timer = setTimeout(doScroll, 100);
    return () => clearTimeout(timer);
  }, [pathname, hash, search]);

  return null;
};

export default ScrollToTop;
