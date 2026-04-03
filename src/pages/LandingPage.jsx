import { Helmet } from "react-helmet-async";
import Skills from "../components/Skill";
import Contact from "../components/Contact";
import Home from "../components/Home";
import Review from "../components/Review";
import HomepageCertificates from "../components/HomepageCertificates";
import HomepageAchievements from "../components/HomepageAchievements";
import HomepageFeaturedProjectGrid from "../components/HomepageFeaturedProjectGrid";
import QATerminal from "../components/QATerminal";
import RightSideNav from "../components/RightSideNav";

const LandingPage = () => {
  const sections = [
    { id: "home", label: "Home" },
    { id: "qa-terminal", label: "Q&A Terminal" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "achievements", label: "Achievements" },
    { id: "reviews", label: "Reviews" },
    { id: "contactme", label: "Contact" },
  ];

  return (
    <>
      <Helmet>
        <title>Elayabarathi M V | Frontend Developer & Creative Designer</title>
        <meta
          name="description"
          content="Portfolio of Elayabarathi M V - Frontend Developer skilled in React, JavaScript, Tailwind CSS. View projects, certificates, achievements and more."
        />
        <meta
          name="keywords"
          content="frontend developer, web developer, React, JavaScript, portfolio, Tailwind CSS, designer, Madurai"
        />
        <meta
          property="og:title"
          content="Elayabarathi M V | Frontend Developer"
        />
        <meta
          property="og:description"
          content="Explore my portfolio showcasing web development projects, certifications, and achievements."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elayabarathimv.vercel.app/" />
        <meta
          property="og:image"
          content="https://elayabarathimv.vercel.app/icon.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Elayabarathi M V | Frontend Developer"
        />
        <meta
          name="twitter:description"
          content="Explore my portfolio showcasing web development projects, certifications, and achievements."
        />
        <link rel="canonical" href="https://elayabarathimv.vercel.app/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Elayabarathi M V",
            url: "https://elayabarathimv.vercel.app",
            jobTitle: "Frontend Developer",
            sameAs: [
              "https://github.com/Elayabarathi",
              "https://linkedin.com/in/elayabarathi",
            ],
          })}
        </script>
      </Helmet>
      <div className="container">
        <Home />
        <QATerminal />
        <Skills />
        <HomepageFeaturedProjectGrid />
        <HomepageCertificates />
        <HomepageAchievements />
        <Review />
        <Contact />
      </div>
      <RightSideNav sections={sections} />
    </>
  );
};

export default LandingPage;
