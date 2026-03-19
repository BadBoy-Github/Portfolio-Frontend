import HomepageAchievements from "../components/HomepageAchievements";
import HomepageCertificates from "../components/HomepageCertificates";
import HomepageBlogs from "../components/HomepageBlogs";


const Work = () => {
  return (
    <section id="work">
      <HomepageBlogs />
      <HomepageCertificates />
      <HomepageAchievements />
    </section>
  );
}

export default Work;