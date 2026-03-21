import Welcome from "../components/Welcome";
import Chat from "../components/Chat";
import Experience from "../components/Experience";
import Education from "../components/Education";

const AboutPage = () => {
  return (
      <div className="container">
        <Welcome />
        <Chat />
        <Experience />
        <Education />
      </div>
  );
};

export default AboutPage;
