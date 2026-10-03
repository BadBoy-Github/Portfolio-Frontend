// Node modules
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

// Components
import AchievementsCard from "./AchievementsCard";
import SectionHeading from "./ui/SectionHeading";
import SectionState from "./ui/SectionState";
import useCollection from "../hooks/useCollection";

const HOMEPAGE_ACHIEVEMENTS = 5;

const HomepageAchievements = () => {
  const { items, loading, error, reload } = useCollection("/api/achievements");

  const displayAchievements = items.slice(0, HOMEPAGE_ACHIEVEMENTS);
  const remainingCount = items.length - HOMEPAGE_ACHIEVEMENTS;

  return (
    <section id="achievements" className="section">
      <SectionHeading
        title="My Achievements"
        lead="A collection of milestones that showcase my passion and impact"
      />

      <SectionState
        loading={loading}
        error={error}
        label="achievements"
        onRetry={reload}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAchievements.map((achi) => (
            <div key={achi.id} className="flex">
              <AchievementsCard
                achiId={achi.id}
                title={achi.title}
                imgSrc={achi.imgSrc}
                desc={achi.subtitle}
                tags={achi.tags}
                date={achi.date}
              />
            </div>
          ))}

          {remainingCount > 0 && (
            <Link
              to="/achievements"
              className="group flex flex-col items-center justify-center gap-4 bg-paper-card border-2 border-dashed border-ink rounded-wobbly-md p-6 text-center transition-transform duration-100 hover:rotate-1 hover:border-solid hover:shadow-hard"
            >
              <span className="w-16 h-16 grid place-items-center rounded-wobbly-sm bg-marker text-paper border-2 border-ink shadow-hard-sm group-hover:rotate-12 transition-transform duration-100">
                <Plus size={28} strokeWidth={3} aria-hidden="true" />
              </span>

              <span className="font-display text-xl text-ink">More Achievements</span>

              <span className="text-ink-soft text-lg">
                View {remainingCount} more achievements
              </span>
            </Link>
          )}
        </div>
      </SectionState>
    </section>
  );
};

export default HomepageAchievements;