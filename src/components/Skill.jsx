// Components
import SkillCard from "./SkillCard";

import { skillItem } from "./data/SkillData";

const Skills = () => {
  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="headline-2 ">Essential Tools I use</h2>

        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          Discover the powerful tools and technologies I use
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {skillItem.map(({ imgSrc, label, desc }, key) => (
            <SkillCard
              imgSrc={imgSrc}
              label={label}
              desc={desc}
              key={key}
              classes=""
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
