/**
 * @copyright 2025 Elayabarathi M V
 * @author Elayabarathi M V <elayabarathiedison@gmail.com>
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { ReactLenis } from "lenis/react";
import { lazy, Suspense } from "react";
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
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

// Lazy loaded page components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const CertificateDetail = lazy(() => import("./pages/CertificateDetail"));
const AchievementDetail = lazy(() => import("./pages/AchievementDetail"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const ProjectsLibrary = lazy(() => import("./pages/ProjectsLibrary"));
const CertificatesLibrary = lazy(() => import("./pages/CertificatesLibrary"));
const AchievementsLibrary = lazy(() => import("./pages/AchievementsLibrary"));
const BlogsLibrary = lazy(() => import("./pages/BlogsLibrary"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-8 border-sky-500"></div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const showScrollToTopButton = location.pathname !== "/" && location.pathname !== "/about";

  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main-content">
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </main>
      <Footer />
      {showScrollToTopButton && <ScrollToTopButton />}
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <ReactLenis root options={{ scroll: { smoothing: 0.05 } }}>
        <HelmetProvider>
          <CustomCursor />
          <Router>
            <AppContent />
          </Router>
        </HelmetProvider>
      </ReactLenis>
    </ErrorBoundary>
  );
};

export default App;
