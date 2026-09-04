import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoChevronBack, IoChevronForward } from "react-icons/io5";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AchievementDetail = () => {
  const { id } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [otherAchievements, setOtherAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [achRes, allRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/achievements/${id}`),
          fetch(`${BACKEND_URL}/api/achievements`),
        ]);
        if (!achRes.ok) throw new Error("Achievement not found");
        const achData = await achRes.json();
        const allData = await allRes.json();
        setAchievement(achData.data);
        setOtherAchievements(allData.data.filter((a) => a.id !== id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16 flex items-center justify-center">
        <div className="loader mb-4"><span></span></div>
      </div>
    );
  }

  if (error || !achievement) {
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

  return (
    <>
      <Helmet>
        <title>{achievement.title} | Elayabarathi M V</title>
        <meta
          name="description"
          content={`${achievement.title} - ${achievement.subtitle}`}
        />
        <meta
          name="keywords"
          content={`achievement, ${achievement.title}, ${achievement.date}`}
        />
        <meta
          property="og:title"
          content={`${achievement.title} | Achievement`}
        />
        <meta property="og:description" content={achievement.subtitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://elayabarathimv.vercel.app/achievement/${achievement.id}`}
        />
        <meta property="og:image" content={achievement.imgSrc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${achievement.title} | Achievement`}
        />
        <meta name="twitter:description" content={achievement.subtitle} />
        <link
          rel="canonical"
          href={`https://elayabarathimv.vercel.app/achievement/${achievement.id}`}
        />
      </Helmet>
      <div className="min-h-screen bg-zinc-900 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-sky-400 transition-colors mb-8"
          >
            <IoArrowBack className="size-5" />
            <span>Back to All Achievements</span>
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {achievement.title}
              </h1>
              <p className="text-xl text-zinc-400">{achievement.subtitle}</p>
              <p className="text-zinc-500 mt-2">Year: {achievement.date}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="cursor-pointer group rounded-xl overflow-hidden">
                  <div className="relative">
                    <img
                      src={achievement.imgSrc}
                      alt={achievement.title}
                      loading="lazy"
                      className="w-full rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Key Highlights
                </h2>
                <ul className="space-y-3">
                  {(achievement.keyPoints || []).map((point, index) => (
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

            <div className="flex flex-wrap gap-2">
              {(achievement.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-sky-600/20 text-sky-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16 relative">
            <h2 className="text-2xl font-bold text-white mb-6">
              Other Achievements
            </h2>
            <button
              onClick={() =>
                document
                  .getElementById("other-achievements-scroll")
                  .scrollBy({ left: -672, behavior: "smooth" })
              }
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/90 hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <IoChevronBack className="size-6" />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("other-achievements-scroll")
                  .scrollBy({ left: 672, behavior: "smooth" })
              }
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-zinc-800/90 hover:bg-zinc-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <IoChevronForward className="size-6" />
            </button>
            <div
              id="other-achievements-scroll"
              className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
            >
              {otherAchievements.map((other) => (
                <Link
                  key={other.id}
                  to={`/achievement/${other.id}`}
                  className="min-w-[280px] md:min-w-[320px] bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-700 transition-colors group"
                >
                  <img
                    src={other.imgSrc}
                    alt={other.title}
                    loading="lazy"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      {other.subtitle}
                    </p>
                    <p className="text-xs text-zinc-500 mt-2">{other.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AchievementDetail;
