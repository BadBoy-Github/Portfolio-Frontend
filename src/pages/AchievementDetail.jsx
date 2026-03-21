import { useParams, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineFullscreen } from "react-icons/ai";
import { achievements } from "../data/AchievementData";

const AchievementDetail = () => {
  const { id } = useParams();
  const achievement = achievements.find((a) => a.id === id);

  if (!achievement) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Achievement Not Found
          </h1>
          <Link to="/achievements" className="text-sky-400 hover:underline">
            Go back to all achievements
          </Link>
        </div>
      </div>
    );
  }

  // Get other achievements
  const otherAchievements = achievements.filter((a) => a.id !== id);


  return (
    <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/achievements"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors mb-8"
        >
          <IoArrowBack className="size-5" />
          <span>Back to All Achievements</span>
        </Link>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Title and Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {achievement.title}
            </h1>
            <p className="text-xl text-zinc-400">{achievement.subtitle}</p>
            <p className="text-zinc-500 mt-2">Year: {achievement.date}</p>
          </div>

          {/* Image and Key Points */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left - Image */}
            <div>
              <div
                className="cursor-pointer group rounded-xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={achievement.imgSrc}
                    alt={achievement.title}
                    className="w-full rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Right - Key Points */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">
                Key Highlights
              </h2>
              <ul className="space-y-3">
                {achievement.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-zinc-300"
                  >
                    <span className="w-2 h-2 bg-sky-400 rounded-full mt-2 shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {achievement.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-sky-600/20 text-sky-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
        </div>

        {/* Other Achievements Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            Other Achievements
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {otherAchievements.map((other) => (
              <Link
                key={other.id}
                to={`/achievement/${other.id}`}
                className="min-w-[280px] md:min-w-[320px] bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors group"
              >
                <img
                  src={other.imgSrc}
                  alt={other.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">{other.subtitle}</p>
                  <p className="text-xs text-zinc-500 mt-2">{other.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementDetail;
