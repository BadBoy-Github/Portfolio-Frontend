import { useState, useEffect } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceCompoundCard from "./ExperienceCompoundCard";
import Card from "./ui/Card";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/experience`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setExperience(data.data);
      } catch {
        // experience fetch failed
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="pt-20 relative">
        <h2 className="headline-2">My Professional Experience</h2>
        <p className="text-ink-soft mt-3 mb-8 max-w-[50ch]">
          A timeline of my internships, roles, and real-world contributions.
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="loader mb-4"><span></span></div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="pt-20 relative">
      <h2 className="headline-2">My Professional Experience</h2>
      <p className="text-ink-soft mt-3 mb-8 max-w-[50ch]">
        A timeline of my internships, roles, and real-world contributions.
      </p>

      <div className="">
        <ol className="relative border-l-2 border-ink/10 ml-6 border-separate">
          {experience.map((edu, index) =>
            edu.compound ? (
              <li className="mb-10 relative pl-8" key={index}>
                <a
                  href={edu.instLink}
                  target="_blank"
                  className="absolute flex items-center justify-center w-10 h-10 bg-marker rounded-full -start-5 ring-8 ring-paper cursor-pointer"
                >
                  <img
                    className="rounded-full shadow-hard-sm"
                    src={edu.instLogo}
                    alt={edu.instName}
                    loading="lazy"
                  />
                </a>
                <Card tone="paper" className="p-6 sm:p-5 shadow-hard hover:shadow-hard transition-all hover:rotate-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-ink">{edu.instName}</div>
                    <p className="text-xs font-normal text-ink-soft">{edu.period}</p>
                  </div>

                  {edu.content.map((content, contentIndex) => (
                    <ExperienceCompoundCard
                      key={contentIndex}
                      year={content.year}
                      name={content.name}
                      role={content.role}
                      desc={content.desc}
                      imgSrc={content.imgSrc}
                      certifi={content.certifi}
                      skills={content.skills}
                    />
                  ))}
                </Card>
              </li>
            ) : (
              <ExperienceCard
                key={index}
                year={edu.year}
                name={edu.name}
                role={edu.role}
                instName={edu.instName}
                instLink={edu.instLink}
                instLogo={edu.instLogo}
                desc={edu.desc}
                imgSrc={edu.imgSrc}
                certifi={edu.certifi}
                skills={edu.skills}
              />
            ),
          )}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
