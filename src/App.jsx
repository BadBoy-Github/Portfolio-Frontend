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
import PropTypes from "prop-types";
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
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { getSession } from "./pages/AdminLogin";

// Lazy loaded page components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
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
  <div className="min-h-screen bg-paper grid place-items-center">
    <div className="loader">
      <span></span>
    </div>
  </div>
);

const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const PageTransition = ({ children }) => (
  <motion.div {...PAGE_TRANSITION}>{children}</motion.div>
);

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

const ProtectedRoute = ({ children }) => {
  const session = getSession();
  if (!session) {
    window.location.href = "/admin-login";
    return null;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const AppInner = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const showScrollToTopButton = location.pathname !== "/" && location.pathname !== "/about";

  const content = (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <main id="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Admin Routes */}
              <Route
                path="/admin-login"
                element={
                  <PageTransition>
                    <AdminLogin />
                  </PageTransition>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <PageTransition>
                      <AdminDashboard />
                    </PageTransition>
                  </ProtectedRoute>
                }
              />

              {/* Homepage */}
              <Route
                path="/"
                element={
                  <PageTransition>
                    <LandingPage />
                  </PageTransition>
                }
              />

              {/* Individual Pages */}
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <AboutPage />
                  </PageTransition>
                }
              />
              <Route
                path="/project/:id"
                element={
                  <PageTransition>
                    <ProjectDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/certificate/:id"
                element={
                  <PageTransition>
                    <CertificateDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/achievement/:id"
                element={
                  <PageTransition>
                    <AchievementDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <PageTransition>
                    <BlogDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <ContactPage />
                  </PageTransition>
                }
              />

              {/* Library Pages */}
              <Route
                path="/projects"
                element={
                  <PageTransition>
                    <ProjectsLibrary />
                  </PageTransition>
                }
              />
              <Route
                path="/certificates"
                element={
                  <PageTransition>
                    <CertificatesLibrary />
                  </PageTransition>
                }
              />
              <Route
                path="/achievements"
                element={
                  <PageTransition>
                    <AchievementsLibrary />
                  </PageTransition>
                }
              />
              <Route
                path="/blogs"
                element={
                  <PageTransition>
                    <BlogsLibrary />
                  </PageTransition>
                }
              />

              {/* 404 - Page Not Found */}
              <Route
                path="*"
                element={
                  <PageTransition>
                    <PageNotFound />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {showScrollToTopButton && !isAdminRoute && <ScrollToTopButton />}
    </>
  );

  if (isAdminRoute) {
    return content;
  }

  return (
    <ReactLenis root options={{ scroll: { smoothing: 0.05 } }}>
      {content}
    </ReactLenis>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <AppInner />
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;