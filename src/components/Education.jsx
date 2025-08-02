

import EducationCard from "./EducationCard";

const EduContent = [
  {
    year: "2020 - 2024",
    name: " B.Tech Biotechnology",
    perc: "88.1%",
    instName: "K S Rangasamy College of Technology",
    instLogo: "/images/ksr logo.jpg",
    desc: "Gaining a strong foundation in core principles and practical lab skills. Beyond academics, active participation in extracurricular and cultural events helped me develop leadership and interpersonal abilities. This experience nurtured my passion for continuous learning and innovation in biotechnology.",
    skills:
      "Microbiology, Genetic Engineering, Nanobiotechnology, Plant Tissue Culture, Bioinformatics.",
  },
  {
    year: "2019 - 2020",
    name: "HSC - Bio Math",
    perc: "76.33%",
    instName: "U R C Palaniammal Matriculation Higher Secondary School",
    instLogo: "/images/urc logo.jpg",
    desc: "I built a strong academic foundation while growing both personally and socially. Guided by dedicated teachers, I developed critical thinking and a disciplined approach to learning. Involvement in sports, clubs, and cultural events helped strengthen my leadership and teamwork skills.",
    skills: "Human Anatomy, Plant Biology, Quantitative Aptitude Math.",
  },
];

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="px-4 mx-auto lg:px-6 xl:max-w-6xl container relative">
        <h2 className="headline-2 ">My Academic Journey</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          A summary of my academic qualifications
        </p>

        <div className="">
          <ol className="relative border-l-2 border-zinc-50/10 ml-6 border-separate">
            {EduContent.map((edu, index) => (
              <EducationCard
                key={index}
                year={edu.year}
                name={edu.name}
                perc={edu.perc}
                instName={edu.instName}
                instLogo={edu.instLogo}
                desc={edu.desc}
                skills={edu.skills}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Education;
