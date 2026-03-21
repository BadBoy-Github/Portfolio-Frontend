import FeaturedProjectGrid from "./FeaturedProjectGrid";

const HomepageFeaturedProjectGrid = () => {
  return (
    <div className="w-full mb-10 pt-10">
      <h2 className="headline-2 ">Ideas Brought to Life</h2>

      <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
        Live, scalable applications built for real-world impact.
      </p>
      <FeaturedProjectGrid />
    </div>
  );
};

export default HomepageFeaturedProjectGrid;
