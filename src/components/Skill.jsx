import { useState, useEffect } from "react";
import SkillCard from "./SkillCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Skills = () => {
  const [skillItem, setSkillItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/tech-stacks`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSkillItem(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="section mb-20" id="skills">
        <h2 className="headline-2 ">Essential Tech Stacks I use</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          Discover the powerful tools and technologies I use
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="loader mb-4"><span></span></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section mb-20" id="skills">
        <h2 className="headline-2 ">Essential Tech Stacks I use</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          Discover the powerful tools and technologies I use
        </p>
        <p className="text-red-400">Failed to load skills data.</p>
      </section>
    );
  }

  return (
    <section className="section mb-20" id="skills">
        <h2 className="headline-2 ">Essential Tech Stacks I use</h2>

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
    </section>
  );
};

export default Skills;
