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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/**
 * Register gsap plugin
 */
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";

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

const App = () => {
  return (
    <ReactLenis root options={{ scroll: { smoothing: 0.05 } }}>
      <CustomCursor />
      <Router>
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
          </Routes>
        </main>
        <Footer />
      </Router>
    </ReactLenis>
  );
};

export default App;
