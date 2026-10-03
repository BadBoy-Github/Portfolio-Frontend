import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AchievementsCard from "./AchievementsCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomepageAchievements = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/achievements`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setAchievements(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <section id="achievements" className="section">
        <div className="section-label mb-6">
          <span className="dot"></span>
          <span>ACHIEVEMENTS</span>
        </div>
        <h2 className="headline-2 text-foreground mb-4">
          My <span className="gold-text">Achievements</span>
        </h2>
        <p className="body-text mt-3 mb-8 max-w-[50ch]">
          A collection of milestones that showcase my passion and impact
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="loader mb-4"><span></span></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="achievements" className="section">
        <div className="section-label mb-6">
          <span className="dot"></span>
          <span>ACHIEVEMENTS</span>
        </div>
        <h2 className="headline-2 text-foreground mb-4">
          My <span className="gold-text">Achievements</span>
        </h2>
        <p className="body-text mt-3 mb-8 max-w-[50ch]">
          A collection of milestones that showcase my passion and impact
        </p>
        <p className="text-error">Failed to load achievements.</p>
      </section>
    );
  }

  const displayAchievements = achievements.slice(0, 5);
  const remainingCount = achievements.length - 5;

  return (
    <section id="achievements" className="section">
      <div className="section-label mb-6">
        <span className="dot"></span>
        <span>ACHIEVEMENTS</span>
      </div>
      <h2 className="headline-2 text-foreground mb-4">
        My <span className="gold-text">Achievements</span>
      </h2>
      <p className="body-text mt-3 mb-8 max-w-[50ch]">
        A collection of milestones that showcase my passion and impact
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayAchievements.map((achi) => (
          <Link key={achi.id} to={`/achievement/${achi.id}`}>
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

        {remainingCount > 0 && (
          <div
            onClick={() => navigate("/achievements")}
            className="card-featured cursor-pointer group"
          >
            <div className="p-5 rounded-xl flex flex-col items-center justify-center transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-accent-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-rounded text-4xl text-accent-secondary">
                  add_circle
                </span>
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                More Achievements
              </h3>
              <p className="body-text text-muted-foreground text-sm">
                View {remainingCount} more achievements
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomepageAchievements;
