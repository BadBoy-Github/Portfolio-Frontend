import { useNavigate } from "react-router-dom";
import { achievements } from "../data/AchievementData";

const HomepageAchievements = () => {
  const navigate = useNavigate();
  const displayAchievements = achievements.slice(0, 3);
  const remainingCount = achievements.length - 3;

  const handleAchievementClick = (achiId) => {
    navigate(`/achievement/${achiId}`);
  };

  return (
    <section className="section">
      <div className="container mx-auto relative">
        <h2 className="headline-2">My Achievements</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          A collection of milestones that showcase my passion and impact
        </p>
        <div className="grid grid-cols-2 gap-3">
          {displayAchievements.map((achi, index) => (
            <div
              key={index}
              onClick={() => handleAchievementClick(achi.id)}
              className="min-w-[320px] lg:min-w-[420px] bg-zinc-800 lg:h-[480px] h-[600px] hover:bg-zinc-700/50 p-5 rounded-xl shadow-xl cursor-pointer transition-colors relative group"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="w-full">
                  <div className="flex items-center gap-2 h-6 justify-between flex-row lg:flex-row-reverse">
                    <p className="text-zinc-400 text-xs">{achi.date}</p>
                    <p className="w-[80%] text-white font-semibold">
                      {achi.title}
                    </p>
                  </div>
                </div>
              </div>
              <figure className="rounded-lg bg-zinc-700 mt-4 group-hover:scale-[101%] transition-all duration-300">
                <img
                  src={achi.imgSrc}
                  width={44}
                  height={44}
                  alt={achi.title}
                  loading="lazy"
                  className="w-full h-60 object-cover bg-zinc-400/20 rounded-lg"
                />
              </figure>
              <div className="text-sm text-zinc-400 mt-3 tracking-wider">
                {achi.subtitle
                  .split(". ")
                  .filter((sentence) => sentence.trim() !== "")
                  .map((sentence, idx) => (
                    <p key={idx} className="">
                      {sentence.trim().replace(/\.$/, "")}
                    </p>
                  ))}
              </div>

              <div className="absolute bottom-0 gap-3 flex flex-wrap mb-5">
                {achi.tags.map((label, key) => (
                  <span
                    key={key}
                    className="text-sm text-sky-600 group-hover:text-sky-400 transition-all duration-300 flex w-fit bg-zinc-700/40 px-2 py-1 rounded-lg"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* More Achievements Card */}
          {remainingCount > 0 && (
            <div
              onClick={() => navigate("/achievements")}
              className="min-w-[320px] lg:min-w-[420px] bg-zinc-800 hover:bg-zinc-700/50 p-5 rounded-xl shadow-xl flex flex-col items-center justify-center cursor-pointer group"
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
      </div>
    </section>
  );
};

export default HomepageAchievements;
