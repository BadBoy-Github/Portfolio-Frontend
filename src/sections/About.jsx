import Chat from "../components/Chat";
import Skills from "../components/Skill";
import Welcome from "../components/Welcome";

const About = () => {
  return (
    <section id="about">
      <Welcome />
      <Skills />
      <Chat />
    </section>
  );
};

export default About;
