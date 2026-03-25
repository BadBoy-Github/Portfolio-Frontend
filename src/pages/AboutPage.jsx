import { Helmet } from "react-helmet-async";
import Welcome from "../components/Welcome";
import AboutTerminal from "../components/AboutTerminal";
import Chat from "../components/Chat";
import Experience from "../components/Experience";
import Education from "../components/Education";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Me | Elayabarathi M V</title>
        <meta
          name="description"
          content="Learn more about Elayabarathi M V, a Frontend Developer with expertise in React, JavaScript, and modern web technologies. View experience and education."
        />
        <meta
          name="keywords"
          content="about, about me, frontend developer, experience, education, skills, Elayabarathi"
        />
        <meta property="og:title" content="About Me | Elayabarathi M V" />
        <meta
          property="og:description"
          content="Learn more about my journey as a Frontend Developer, my experience, and skills."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://elayabarathimv.vercel.app/about"
        />
        <meta
          property="og:image"
          content="https://elayabarathimv.vercel.app/icon.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Me | Elayabarathi M V" />
        <meta
          name="twitter:description"
          content="Learn more about my journey as a Frontend Developer, my experience, and skills."
        />
        <link rel="canonical" href="https://elayabarathimv.vercel.app/about" />
      </Helmet>
      <div className="container">
        <Welcome />
        <AboutTerminal />
        <Chat />
        <Experience />
        <Education />
      </div>
    </>
  );
};

export default AboutPage;
