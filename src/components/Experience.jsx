import ExperienceCard from "./ExperienceCard";
import ExperienceCompoundCard from "./ExperienceCompoundCard";

const ExpContent = [
  {
    instName: "Corizo Edutech Pvt Ltd",
    instLogo: "/img/experience/corizo logo.jpg",
    period: "Oct - Dec 2024",
    compound: true,
    content: [
      {
        year: "Nov - Dec 2024",
        name: "Full Stack Developer",
        role: "Intern",
        desc: "Mastering both front-end and back-end development while building real-world projects like a CRUD user management app and an eCommerce site. Gained hands-on experience in coding best practices, debugging, and problem-solving.",
        skills: "JavaScript, React, Node.js, Express, MongoDB",
      },
      {
        year: "Oct - Nov 2024",
        name: "Full Stack Developer",
        role: "Trainee",
        desc: "Gained hands-on experience with HTML, CSS, JavaScript, MongoDB, Express.js, Node.js, APIs, and more. Built multiple real-world projects including a shopping list app and a user management system, refining both technical and analytical skills.",
        skills: "HTML, CSS, JavaScript",
      },
    ],
  },
  {
    year: "Jul - Aug 2022",
    name: "Applied Microbiology and Agricultural Biotechnology",
    role: "Intern",
    instName: "Elies Biotech Pvt Ltd",
    instLogo: "/img/experience/elies logo.jpg",
    desc: "gaining practical skills in microbial characterization, biofertilizer production, mushroom tissue culture, and Black Soldier Fly Larvae rearing. Built a strong foundation in applied microbiology and agricultural biotechnology.",
    skills: "Human Anatomy, Plant Biology, Quantitative Aptitude Math.",
    compound: false,
  },
  {
    year: "Jun - Jul 2022",
    name: "Millets Processing and Production",
    role: "Intern",
    instName: "Biorith Techno Products Pvt Ltd",
    instLogo: "/img/experience/sample logo.jpg",
    desc: "operating advanced machinery and contributing to eco-friendly packaging solutions. Gained valuable experience in sustainable agriculture and food processing, bridging theoretical knowledge with real-world application.",
    skills: "Human Anatomy, Plant Biology, Quantitative Aptitude Math.",
    compound: false,
  },
];

const Experience = () => {
  return (
    <section id="experience" className=" pt-20">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2 ">My Professional Experience</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
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
                  <div className="ml-4 p-6 rounded-2xl shadow-xl bg-zinc-800 hover:bg-zinc-700/50 active:bg-zinc-700/60 sm:flex ring-1 ring-inset ring-zinc-50/5 transition-all hover:scale-[101%]  flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-zinc-200">
                        {edu.instName}
                      </p>
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
