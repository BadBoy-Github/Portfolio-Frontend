import { Link } from "react-router-dom";
import FeaturedProjectGrid from "./FeaturedProjectGrid";

import { IoArrowForwardOutline } from "react-icons/io5";

const HomepageFeaturedProjectGrid = () => {
  return (
    <section id="projects" className="w-full section">
      <h2 className="headline-2 ">Ideas Brought to Life</h2>

      <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
        Live, scalable applications built for real-world impact.
      </p>
      <FeaturedProjectGrid />
      <div className="h-10 w-full mt-10 flex justify-center items-center">
        <Link
          to="/projects"
          className="bg-sky-500 flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-zinc-900 font-medium text-lg group hover:pr-6 transition-all duration-300"
        >
          <p>View All Projects</p>
          <IoArrowForwardOutline className="group-hover:translate-x-2 transition-all duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default HomepageFeaturedProjectGrid;
