import Chat from "./Chat";
import Skills from "./Skill";
import Welcome from "./Welcome";


const About = () => {
  return (
    <section id="about">
      <Welcome />
      <Skills />
      <Chat />
    </section>
  );
}

export default About