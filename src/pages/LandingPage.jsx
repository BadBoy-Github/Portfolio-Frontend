import Skills from "../components/Skill";
import Contact from "../components/Contact";
import Home from "../components/Home";
import Review from "../components/Review";
import FeaturedProjectGrid from "../components/FeaturedProjectGrid";
import HomepageCertificates from "../components/HomepageCertificates";
import HomepageAchievements from "../components/HomepageAchievements";

const LandingPage = () => {
  return (
    <div>
      <>
        <Home />
        <div className="container mt-20">
          <FeaturedProjectGrid />
        </div>
        <Skills />
        <HomepageCertificates />
        <HomepageAchievements />
        <Review />
        <Contact />
      </>
    </div>
  );
};

export default LandingPage;
