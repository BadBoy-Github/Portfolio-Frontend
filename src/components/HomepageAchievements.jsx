import { Link, useNavigate } from "react-router-dom";
import { achievements } from "../data/AchievementData";
import AchievementsCard from "./AchievementsCard";

const HomepageAchievements = () => {
  const navigate = useNavigate();
  const displayAchievements = achievements.slice(0, 5);
  const remainingCount = achievements.length - 5;

  return (
    <section id="achievements" className="section">
      <h2 className="headline-2">My Achievements</h2>
      <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
        A collection of milestones that showcase my passion and impact
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayAchievements.map((achi, index) => (
          <Link key={index} to={`/achievement/${achi.id}`}>
            <AchievementsCard
              achiId={achi.id}
              title={achi.title}
              imgSrc={achi.imgSrc}
              desc={achi.subtitle}
              tags={achi.tags}
              date={achi.date}
            />
          </Link>
        ))}

        {/* More Achievements Card */}
        {remainingCount > 0 && (
          <div
            onClick={() => navigate("/achievements")}
            className=" bg-zinc-800 hover:bg-zinc-700/50 p-5 rounded-xl shadow-xl flex flex-col items-center justify-center cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-sky-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-rounded text-4xl text-sky-400">
                add_circle
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              More Achievements
            </h3>
            <p className="text-zinc-400 text-sm">
              View {remainingCount} more achievements
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomepageAchievements;
