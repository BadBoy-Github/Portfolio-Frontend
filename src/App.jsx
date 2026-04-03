/**
 * @copyright 2025 Elayabarathi M V
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
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

/**
 * Register gsap plugin
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

// New Page Components
import ProjectDetail from "./pages/ProjectDetail";
import CertificateDetail from "./pages/CertificateDetail";
import AchievementDetail from "./pages/AchievementDetail";
import BlogDetail from "./pages/BlogDetail";
import ProjectsLibrary from "./pages/ProjectsLibrary";
import CertificatesLibrary from "./pages/CertificatesLibrary";
import AchievementsLibrary from "./pages/AchievementsLibrary";
import BlogsLibrary from "./pages/BlogsLibrary";

// Homepage Section Components
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import PageNotFound from "./pages/PageNotFound";

const AppContent = () => {
  const location = useLocation();
  const showScrollToTopButton = location.pathname !== "/" && location.pathname !== "/about";

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<LandingPage />} />

          {/* Individual Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/certificate/:id" element={<CertificateDetail />} />
          <Route path="/achievement/:id" element={<AchievementDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />

          {/* Library Pages */}
          <Route path="/projects" element={<ProjectsLibrary />} />
          <Route path="/certificates" element={<CertificatesLibrary />} />
          <Route path="/achievements" element={<AchievementsLibrary />} />
          <Route path="/blogs" element={<BlogsLibrary />} />

          {/* 404 - Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
      {showScrollToTopButton && <ScrollToTopButton />}
    </>
  );
};

const App = () => {
  return (
    <ReactLenis root options={{ scroll: { smoothing: 0.05 } }}>
      <HelmetProvider>
        <CustomCursor />
        <Router>
          <AppContent />
        </Router>
      </HelmetProvider>
    </ReactLenis>
  );
};

export default App;
