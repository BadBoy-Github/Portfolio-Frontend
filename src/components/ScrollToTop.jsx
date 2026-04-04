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
    // Check for scroll query parameter
    const scrollTarget = new URLSearchParams(search).get('scroll');
    
    if (scrollTarget) {
      // Handle scroll to specific section when ?scroll= parameter is present
      const scrollToSection = () => {
        const element = document.getElementById(scrollTarget);
        const lenis = window.lenis;
        
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: -100, duration: 0.8 });
          } else {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      };
      
      // Delay to allow page transition, lazy loading and content to load
      setTimeout(scrollToSection, 600);
    } else if (!hash) {
      // Only scroll to top if there's no hash and no scroll parameter
      const scrollToTop = () => {
        const lenis = window.lenis;
        if (lenis) {
          lenis.scrollTo(0, { immediate: false, duration: 0.3 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };

      setTimeout(scrollToTop, 100);
    }
  }, [pathname, hash, search]);

  return null;
};

export default ScrollToTop;
