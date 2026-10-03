import { Link } from "react-router-dom";
import FeaturedProjectGrid from "./FeaturedProjectGrid";
import { IoArrowForwardOutline } from "react-icons/io5";

const HomepageFeaturedProjectGrid = () => {
  return (
    <section id="projects" className="w-full section">
      <span className="section-label mb-4">
        <span className="dot"></span>
        <span>Featured Projects</span>
      </span>
      <h2 className="headline-2">
        Ideas <span className="gradient-text">Brought to Life</span>
      </h2>

      <p className="body-text mt-3 mb-8 max-w-[50ch]">
        Live, scalable applications built for real-world impact.
      </p>
      <FeaturedProjectGrid />
      <div className="h-10 w-full mt-10 flex justify-center items-center">
        <Link
          to="/projects"
          className="btn btn-primary flex justify-center items-center gap-2"
        >
          <p>View All Projects</p>
          <IoArrowForwardOutline className="group-hover:translate-x-2 transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default HomepageFeaturedProjectGrid;
