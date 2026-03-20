import HomepageAchievements from "./HomepageAchievements";
import HomepageCertificates from "./HomepageCertificates";
import HomepageBlogs from "./HomepageBlogs";

const Work = () => {
  return (
    <section id="work">
      <HomepageBlogs />
      <HomepageCertificates />
      <HomepageAchievements />
    </section>
  );
};

export default Work;
