import Welcome from "../components/Welcome";
import AboutTerminal from "../components/AboutTerminal";
import Chat from "../components/Chat";
import Experience from "../components/Experience";
import Education from "../components/Education";

const AboutPage = () => {
  return (
    <div className="container">
      <Welcome />
      <AboutTerminal />
      <Chat />
      <Experience />
      <Education />
    </div>
  );
};

export default AboutPage;
