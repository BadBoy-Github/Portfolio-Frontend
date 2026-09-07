import { useState, useEffect } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceCompoundCard from "./ExperienceCompoundCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/experience`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setExperience(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section id="experience" className=" pt-20 relative">
        <h2 className="headline-2 ">My Professional Experience</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          A timeline of my internships, roles, and real-world contributions.
        </p>
        <div className="flex items-center justify-center py-10">
          <div className="loader mb-4"><span></span></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className=" pt-20 relative">
        <h2 className="headline-2 ">My Professional Experience</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          A timeline of my internships, roles, and real-world contributions.
        </p>
        <p className="text-red-400">Failed to load experience data.</p>
      </section>
    );
  }

  return (
    <section id="experience" className=" pt-20 relative">
        <h2 className="headline-2 ">My Professional Experience</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          A timeline of my internships, roles, and real-world contributions.
        </p>

        <div className="">
          <ol className="relative border-l-2 border-zinc-50/10 ml-6 border-separate">
            {experience.map((edu, index) =>
              edu.compound ? (
                <li className="mb-10 relative pl-8" key={index}>
                  <a
                    href={edu.instLink}
                    target="_blank"
                    className="absolute flex items-center justify-center w-10 h-10 bg-zinc-600 rounded-full -start-5 ring-8 ring-zinc-900 cursor-pointer"
                  >
                    <img
                      className="rounded-full shadow-lg"
                      src={edu.instLogo}
                      alt={edu.instName}
                      loading="lazy"
                    />
                  </a>
                  <div className="p-6 rounded-2xl shadow-xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 sm:flex ring-1 ring-inset ring-zinc-50/5 transition-all hover:scale-[101%]  flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div
                        target="_blank"
                        className="font-semibold text-zinc-200"
                      >
                        {edu.instName}
                      </div>
                      <p className="text-xs font-normal text-zinc-400">
                        {edu.period}
                      </p>
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
                  </div>
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
