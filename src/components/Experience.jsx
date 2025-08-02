import ExperienceCard from "./ExperienceCard";
import ExperienceCompoundCard from "./ExperienceCompoundCard";

const ExpContent = [
  {
    instName: "Corizo Edutech",
    instLogo: "/images/corizo logo.jpg",
    period: "Oct - Dec 2024",
    compound: true,
    content: [
      {
        year: "Nov - Dec 2024",
        name: "Full Stack Developer",
        role: "Intern",
        desc: "Developing and maintaining web applications using modern frameworks and technologies.",
        skills: "JavaScript, React, Node.js, Express, MongoDB",
      },
      {
        year: "Oct - Nov 2024",
        name: "Full Stack Developer",
        role: "Trainee",
        desc: "Developing and maintaining web applications using modern frameworks and technologies.",
        skills: "JavaScript, React, Node.js, Express, MongoDB",
      },
    ],
  },
  {
    year: "Oct - Nov 2024",
    name: "HSC - Bio Math",
    role: "Intern",
    instName: "U R C Palaniammal Matriculation Higher Secondary School",
    instLogo: "/images/urc logo.jpg",
    desc: "I built a strong academic foundation while growing both personally and socially. Guided by dedicated teachers, I developed critical thinking and a disciplined approach to learning. Involvement in sports, clubs, and cultural events helped strengthen my leadership and teamwork skills.",
    skills: "Human Anatomy, Plant Biology, Quantitative Aptitude Math.",
    compound: false,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2 reveal-up">My Professional Experience</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up">
          A timeline of my internships, roles, and real-world contributions.
        </p>

        <div className="">
          <ol className="relative border-l-2 border-zinc-50/10 ml-6 border-separate">
            {ExpContent.map((edu, index) =>
              // check if the item is a compound item
              edu.compound ? (
                <div className="mb-10 ml-12 " key={index}>
                  <span className="absolute flex items-center justify-center w-10 h-10 bg-zinc-600 rounded-full -start-5 ring-8 ring-zinc-50/10 cursor-pointer">
                    <img
                      className="rounded-full shadow-lg"
                      src={edu.instLogo}
                      alt={edu.instName}
                    />
                  </span>
                  <div className="ml-4 p-6 rounded-2xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 sm:flex ring-1 ring-inset ring-zinc-50/5 transition-all hover:scale-[101%] reveal-up flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-zinc-200">
                        {edu.instName}
                      </p>
                      <p className="text-xs font-normal text-zinc-400">{edu.period}</p>
                    </div>

                    {edu.content.map((content, contentIndex) => (
                      <ExperienceCompoundCard
                        key={contentIndex}
                        year={content.year}
                        name={content.name}
                        role={content.role}
                        desc={content.desc}
                        skills={content.skills}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <ExperienceCard
                  key={index}
                  year={edu.year}
                  name={edu.name}
                  role={edu.role}
                  instName={edu.instName}
                  instLogo={edu.instLogo}
                  desc={edu.desc}
                  skills={edu.skills}
                />
              )
            )}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
