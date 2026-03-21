import Skills from "../components/Skill";
import Contact from "../components/Contact";
import Home from "../components/Home";
import Review from "../components/Review";
import HomepageCertificates from "../components/HomepageCertificates";
import HomepageAchievements from "../components/HomepageAchievements";
import HomepageFeaturedProjectGrid from "../components/HomepageFeaturedProjectGrid";

const LandingPage = () => {
  return (
    <div className="container">
        <Home />
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
