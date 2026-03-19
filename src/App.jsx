/**
 * @copyright 2025 Panda Productions
 * @author Elayabarathi M V <elayabarathiedison@gmail.com>
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/**
 * Register gsap plugin
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Components
import Header from "./components/Header";
import Home from "./sections/Home";
import About from "./sections/About";
import Journey from "./components/Journey";
import Review from "./components/Review";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

// New Page Components
import ProjectDetail from "./components/ProjectDetail";
import CertificateDetail from "./components/CertificateDetail";
import AchievementDetail from "./components/AchievementDetail";
import BlogDetail from "./components/BlogDetail";
import ProjectsLibrary from "./components/ProjectsLibrary";
import CertificatesLibrary from "./components/CertificatesLibrary";
import AchievementsLibrary from "./components/AchievementsLibrary";
import BlogsLibrary from "./components/BlogsLibrary";

// Homepage Section Components
import HomepageProjects from "./components/HomepageProjects";
import HomepageCertificates from "./components/HomepageCertificates";
import HomepageAchievements from "./components/HomepageAchievements";
import HomepageBlogs from "./components/HomepageBlogs";

const App = () => {
  useEffect(() => {
    // Hide default cursor completely on all elements
    const style = document.createElement("style");
    style.textContent = `
      html, body {
        cursor: none !important;
      }
      * {
        cursor: none !important;
      }
      a, button, input, textarea, select, [role="button"] {
        cursor: none !important;
      }
      ::-webkit-scrollbar {
        cursor: none !important;
        width: 10px !important;
      }
      ::-webkit-scrollbar * {
        cursor: none !important;
      }
      ::-webkit-scrollbar-track {
        cursor: none !important;
      }
      ::-webkit-scrollbar-thumb {
        cursor: none !important;
        background: #38bdf8 !important;
      }
      ::-webkit-scrollbar-thumb:hover {
        cursor: none !important;
      }
      ::-webkit-scrollbar-button {
        cursor: none !important;
      }
      .scrollbar-thin {
        scrollbar-color: #38bdf8 transparent !important;
        scrollbar-width: thin !important;
      }
    `;
    document.head.appendChild(style);

    // Force cursor hidden on all elements
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    const TRAIL_LENGTH = 100;
    const trailRefs = [];

    // Create trail elements - solid circles
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const trail = document.createElement("div");
      trail.className = "fixed pointer-events-none z-[9999] rounded-full";
      trail.style.background = `rgba(56, 189, 248, ${10 - i * 1})`;
      trail.style.width = `${12 - i * 0.5}px`;
      trail.style.height = `${12 - i * 0.5}px`;
      trail.style.left = "-100px";
      trail.style.top = "-100px";
      document.body.appendChild(trail);
      trailRefs.push({ el: trail, x: -100, y: -100 });
    }

    // Main cursor - solid circle
    const mainCursor = document.createElement("div");
    mainCursor.className = "fixed pointer-events-none z-[9999]";
    mainCursor.style.cssText =
      "width: 20px; height: 20px; left: -100px; top: -100px;";
    mainCursor.innerHTML = `<div class="w-5 h-5 bg-sky-400 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.8)]"></div>`;
    document.body.appendChild(mainCursor);

    // Hover cursor - larger circle for interactive elements
    const hoverCursor = document.createElement("div");
    hoverCursor.className = "fixed pointer-events-none z-[9999]";
    hoverCursor.style.cssText =
      "left: -100px; top: -100px; opacity: 0; transition: opacity 0.2s;";
    hoverCursor.innerHTML = `<div class="w-12 h-12 border-2 border-sky-300 rounded-full animate-spin" style="animation-duration: 3s;"></div>`;
    document.body.appendChild(hoverCursor);

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovering = false;

    const moveCursor = (e) => {
      mouseX = e.clientX - 10;
      mouseY = e.clientY - 10;
    };

    // Handle hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("btn") ||
        target.classList.contains("cursor-pointer")
      ) {
        isHovering = true;
        hoverCursor.style.opacity = "1";
        mainCursor.style.opacity = "0";
      }
    };

    const handleMouseOut = () => {
      isHovering = false;
      hoverCursor.style.opacity = "0";
      mainCursor.style.opacity = "1";
    };

    const animate = () => {
      // Smooth follow
      currentX += (mouseX - currentX) * 0.25;
      currentY += (mouseY - currentY) * 0.25;

      mainCursor.style.left = currentX + "px";
      mainCursor.style.top = currentY + "px";
      hoverCursor.style.left = currentX - 20 + "px";
      hoverCursor.style.top = currentY - 20 + "px";

      // Trail with smooth delay
      trailRefs.forEach((item, i) => {
        const factor = isHovering ? 0.25 - i * 0.015 : 0.15 - i * 0.01;
        item.x += (currentX - item.x) * factor;
        item.y += (currentY - item.y) * factor;
        item.el.style.left = item.x + "px";
        item.el.style.top = item.y + "px";
      });

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    animate();

    return () => {
      style.remove();
      document.body.style.cursor = "auto";
      document.documentElement.style.cursor = "auto";
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
      mainCursor.remove();
      hoverCursor.remove();
      trailRefs.forEach((item) => item.el.remove());
    };
  }, []);

  return (
    <ReactLenis root>
      <Router>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            {/* Homepage */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Journey />
                  <HomepageProjects />
                  <HomepageCertificates />
                  <HomepageAchievements />
                  <HomepageBlogs />
                  <Review />
                  <Contact />
                </>
              }
            />

            {/* Individual Pages */}
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/certificate/:id" element={<CertificateDetail />} />
            <Route path="/achievement/:id" element={<AchievementDetail />} />
            <Route path="/blog/:id" element={<BlogDetail />} />

            {/* Library Pages */}
            <Route path="/projects" element={<ProjectsLibrary />} />
            <Route path="/certificates" element={<CertificatesLibrary />} />
            <Route path="/achievements" element={<AchievementsLibrary />} />
            <Route path="/blogs" element={<BlogsLibrary />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ReactLenis>
  );
};

export default App;
