import Skills from "../components/Skill";
import Contact from "../components/Contact";
import Home from "../components/Home";
import Review from "../components/Review";
import HomepageCertificates from "../components/HomepageCertificates";
import HomepageAchievements from "../components/HomepageAchievements";
import HomepageFeaturedProjectGrid from "../components/HomepageFeaturedProjectGrid";
import QATerminal from "../components/QATerminal";

const LandingPage = () => {
  return (
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
  );
};

export default LandingPage;
