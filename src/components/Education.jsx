import EducationCard from "./EducationCard";

import { EduContent } from "../data/EducationData";

const Education = () => {
  return (
    <section id="education" className="section relative">
        <h2 className="headline-2 ">My Academic Journey</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] ">
          A summary of my academic qualifications
        </p>

        <div className="">
          <ol className="relative border-r-2 border-zinc-50/10 mr-6 border-separate flex flex-col items-start">
            {EduContent.map((edu, index) => (
              <EducationCard
                key={index}
                year={edu.year}
                name={edu.name}
                perc={edu.perc}
                instName={edu.instName}
                instLogo={edu.instLogo}
                instLink={edu.instLink}
                desc={edu.desc}
                skills={edu.skills}
              />
            ))}
          </ol>
        </div>
    </section>
  );
};

export default Education;
