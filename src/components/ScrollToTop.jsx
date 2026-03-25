/**
 * @copyright 2025 Panda Productions
 * @author Elayabarathi M V <elayabarathiedison@gmail.com>
 * @license Apache-2.0
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - A component that scrolls to the top of the page
 * on route changes, except for hash/query links.
 */
const ScrollToTop = () => {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    // If there's a hash or query parameter, let the browser handle the scroll to the section
    if (hash || search) {
      return;
    }

    // Use setTimeout to ensure this runs after route change completes
    const scrollToTop = () => {
      // Use lenis scrollTo if available
      const lenis = window.lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      // Force scroll on html and body
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Additional fallback
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 1000);
    };

    scrollToTop();
  }, [pathname, hash, search]);

  return null;
};

export default ScrollToTop;
