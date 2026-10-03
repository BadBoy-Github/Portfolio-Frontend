// Components
import SkillCard from "./SkillCard";
import SectionHeading from "./ui/SectionHeading";
import SectionState from "./ui/SectionState";
import useCollection from "../hooks/useCollection";

const Skills = () => {
  const { items, loading, error, reload } = useCollection("/api/tech-stacks");

  return (
    <section className="section" id="skills">
      <SectionHeading
        title="Essential Tech Stacks I use"
        lead="Discover the powerful tools and technologies I use"
      />

      <SectionState
        loading={loading}
        error={error}
        label="the tech stacks"
        onRetry={reload}
      >
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {items
            .slice()
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map(({ imgSrc, label, desc }) => (
              <SkillCard key={label} imgSrc={imgSrc} label={label} desc={desc} />
            ))}
        </div>
      </SectionState>
    </section>
  );
};

export default Skills;