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
import { AnimatePresence, motion } from "framer-motion";

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

// Loading component for Suspense fallback - removed spinner
const LoadingFallback = () => (
  <div className="min-h-screen bg-zinc-900"></div>
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
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Homepage */}
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <LandingPage />
                </motion.div>
              } />

              {/* Individual Pages */}
              <Route path="/about" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <AboutPage />
                </motion.div>
              } />
              <Route path="/project/:id" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ProjectDetail />
                </motion.div>
              } />
              <Route path="/certificate/:id" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <CertificateDetail />
                </motion.div>
              } />
              <Route path="/achievement/:id" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <AchievementDetail />
                </motion.div>
              } />
              <Route path="/blog/:id" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <BlogDetail />
                </motion.div>
              } />

              {/* Library Pages */}
              <Route path="/projects" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ProjectsLibrary />
                </motion.div>
              } />
              <Route path="/certificates" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <CertificatesLibrary />
                </motion.div>
              } />
              <Route path="/achievements" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <AchievementsLibrary />
                </motion.div>
              } />
              <Route path="/blogs" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <BlogsLibrary />
                </motion.div>
              } />

              {/* 404 - Page Not Found */}
              <Route path="*" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <PageNotFound />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
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
